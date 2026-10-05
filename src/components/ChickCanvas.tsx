"use client";

import { useEffect, useRef } from "react";

// Detected exact background color from the chick source video: #EEDFCF (RGB: 239, 224, 207)
const BG_COLOR = "#EEDFCF";
const TOTAL_FRAMES = 64;
const LERP_FACTOR = 0.26; // Smooth & responsive tracking
const DEADZONE_ENTER_RATIO = 0.12; // 12% of container radius triggers direct eye-contact
const DEADZONE_EXIT_RATIO = 0.16; // Hysteresis threshold to prevent jitter

// Shortest-path angular difference between two angles in radians [-PI, PI]
function diffAngle(target: number, current: number): number {
  let diff = (target - current) % (2 * Math.PI);
  if (diff < -Math.PI) diff += 2 * Math.PI;
  if (diff > Math.PI) diff -= 2 * Math.PI;
  return diff;
}

type ChickCanvasProps = {
  /** Horizontal placement of the chick inside the frame on >=1024px (0 = left, 1 = right). */
  alignX?: number;
  /** Horizontal placement below 1024px. */
  alignXMobile?: number;
  /**
   * Chick height as a fraction of the container height. 1 fills the frame
   * (the original cover behaviour); smaller values stand the chick lower and
   * leave headline room beside it. Any area the frame doesn't cover is filled
   * with the footage's own backdrop colour, so the seam is invisible.
   */
  heightRatio?: number;
  /** Height fraction below 1024px. */
  heightRatioMobile?: number;
};

export function ChickCanvas({
  alignX = 0.5,
  alignXMobile = 0.5,
  heightRatio = 1,
  heightRatioMobile = 1,
}: ChickCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Center eye-contact image
    const centerImg = new Image();
    centerImg.src = "/frames/center.webp";

    // 64 directional frames
    const frames: HTMLImageElement[] = [];
    let loadedCount = 0;
    let allFramesLoaded = false;

    // Load center frame first for instant paint
    centerImg.onload = () => {
      renderInitial();
    };

    // Preload directional frames on desktop/fine pointer devices
    if (isFinePointer && !prefersReducedMotion) {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/frames/frame_${i}.webp`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount >= TOTAL_FRAMES) {
            allFramesLoaded = true;
          }
        };
        frames.push(img);
      }
    }

    // Motion state (kept in variables, zero React re-renders)
    let currentAngle = 0; // Starts facing right (0 rad)
    let targetAngle = 0;
    let isCenterPose = true; // Default: neutral center eye contact
    let rafId = 0;

    // Face / eye position inside native 1920x1080 frame
    const NATIVE_W = 1920;
    const NATIVE_H = 1080;
    const FACE_X = 960; // 50%
    const FACE_Y = 410; // 38%

    // Calculate canvas size and chick scale
    let cw = 0;
    let ch = 0;
    let scale = 1;
    let drawW = NATIVE_W;
    let drawH = NATIVE_H;
    let offsetX = 0;
    let offsetY = 0;
    let faceScreenX = 0;
    let faceScreenY = 0;
    let deadzoneEnter = 50;
    let deadzoneExit = 65;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      cw = rect.width;
      ch = rect.height;

      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);

      // Uniform scaling (never distorts, stretches, or alters proportions).
      const lg = cw >= 1024;
      const hr = lg ? heightRatio : heightRatioMobile;
      scale =
        hr >= 1
          ? Math.max(cw / NATIVE_W, ch / NATIVE_H) // cover
          : (ch * hr) / NATIVE_H; // stand the chick at a set height
      drawW = NATIVE_W * scale;
      drawH = NATIVE_H * scale;
      offsetX = (cw - drawW) * (lg ? alignX : alignXMobile);
      // Below full height the chick stands on the bottom edge of the frame.
      offsetY = hr >= 1 ? (ch - drawH) / 2 : ch - drawH;

      // Calculate chick face screen coordinates
      faceScreenX = rect.left + offsetX + FACE_X * scale;
      faceScreenY = rect.top + offsetY + FACE_Y * scale;

      const visualRadius = Math.min(cw, ch) / 2;
      deadzoneEnter = visualRadius * DEADZONE_ENTER_RATIO;
      deadzoneExit = visualRadius * DEADZONE_EXIT_RATIO;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawSingleFrame(isCenterPose ? centerImg : frames[getFrameIndex(currentAngle)] || centerImg);
    };

    const getFrameIndex = (angle: number): number => {
      const positiveAngle = (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      return Math.round((positiveAngle / (2 * Math.PI)) * TOTAL_FRAMES) % TOTAL_FRAMES;
    };

    const drawSingleFrame = (img: HTMLImageElement) => {
      if (!img.complete || img.naturalWidth === 0) return;

      // Draw exactly ONE crisp frame at 100% opacity onto canvas. No ghosting, no blending.
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    const renderInitial = () => {
      if (centerImg.complete) {
        drawSingleFrame(centerImg);
      }
    };

    // Tracking animation loop
    const tick = () => {
      // Angular interpolation
      if (!isCenterPose) {
        const diff = diffAngle(targetAngle, currentAngle);
        currentAngle += diff * LERP_FACTOR;
      }

      // Frame selection: either neutral center pose or mapped directional frame
      let frameToDraw: HTMLImageElement | null = null;

      if (isCenterPose || !allFramesLoaded) {
        frameToDraw = centerImg;
      } else {
        const idx = getFrameIndex(currentAngle);
        frameToDraw = frames[idx] || centerImg;
      }

      if (frameToDraw) {
        drawSingleFrame(frameToDraw);
      }

      // Loop continues smoothly while pointer is active or settling
      rafId = requestAnimationFrame(tick);
    };

    // Pointer events on window / hero
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && !isFinePointer) return;

      const dx = e.clientX - faceScreenX;
      const dy = e.clientY - faceScreenY;
      const dist = Math.hypot(dx, dy);

      // Center eye-contact deadzone with hysteresis
      if (isCenterPose) {
        if (dist > deadzoneExit) {
          isCenterPose = false;
          targetAngle = Math.atan2(dy, dx);
          // Set currentAngle so it transitions from the departure direction smoothly
          currentAngle = targetAngle;
        }
      } else {
        if (dist < deadzoneEnter) {
          isCenterPose = true;
        } else {
          targetAngle = Math.atan2(dy, dx);
        }
      }
    };

    const handlePointerLeave = () => {
      // When cursor leaves, gently ease gaze back toward center
      isCenterPose = true;
    };

    // Subtle idle animation for mobile or when idle
    let idleTimer: NodeJS.Timeout | null = null;

    if (!isFinePointer) {
      // Gentle idle behavior for mobile: stays on center with rare subtle eye glancing
      idleTimer = setInterval(() => {
        if (document.hidden) return;
        // Occasionally make a tiny glance and settle back
        if (allFramesLoaded && Math.random() < 0.3) {
          const randomDir = [16, 32, 48, 0][Math.floor(Math.random() * 4)];
          drawSingleFrame(frames[randomDir] || centerImg);
          setTimeout(() => {
            drawSingleFrame(centerImg);
          }, 800);
        }
      }, 4000);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    updateDimensions();

    // Start RAF loop only on interactive pointer devices
    if (isFinePointer && !prefersReducedMotion) {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (idleTimer) clearInterval(idleTimer);
    };
  }, [alignX, alignXMobile, heightRatio, heightRatioMobile]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ backgroundColor: BG_COLOR }}
      aria-label="Interactive cursor-tracking chick"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{
          backgroundColor: BG_COLOR,
          display: "block",
          imageRendering: "auto",
        }}
      />
    </div>
  );
}
