"use client";

import { useEffect, useRef } from "react";

/**
 * WebGL "morning at the farm" backdrop for the hero, ported from the Stitch
 * design (ANIMATION_8): slowly rotating golden sunrise rays + drifting pasture
 * mist in the brand palette, with the light origin easing toward the pointer.
 *
 * Differences from the raw Stitch snippet (behaviour-preserving hardening):
 * - Proper React lifecycle cleanup (RAF, listeners, observer, GL context).
 * - Pauses when the hero is off-screen or the tab is hidden (Doc 06 §6).
 * - prefers-reduced-motion: draws a single static frame and stops.
 * - Silently no-ops if WebGL or shader compilation isn't available.
 */

const VERTEX = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = v_texCoord;
  float time = u_time * 0.45;

  // Light origin: top-right sunrise over the egg-tray visual, easing toward pointer
  vec2 sunPos = vec2(0.72, 0.28);
  vec2 mouseNorm = u_mouse.xy / u_resolution.xy;
  if (length(mouseNorm) > 0.01) {
    sunPos = mix(sunPos, mouseNorm, 0.15);
  }

  vec2 delta = uv - sunPos;
  float dist = length(delta);
  float angle = atan(delta.y, delta.x);

  float rays1 = sin(angle * 7.0 + time * 0.8 + snoise(uv * 1.5 + time * 0.2) * 1.5);
  float rays2 = cos(angle * 12.0 - time * 0.5 + snoise(uv * 2.0 - time * 0.15) * 1.2);
  float lightRays = smoothstep(-0.2, 0.9, (rays1 * 0.6 + rays2 * 0.4));

  float mist = snoise(vec2(uv.x * 2.0 + time * 0.2, uv.y * 1.5 - time * 0.1));
  mist += 0.5 * snoise(vec2(uv.x * 4.0 - time * 0.25, uv.y * 3.0 + time * 0.15));
  mist = smoothstep(-0.3, 0.8, mist);

  float radialGlow = exp(-dist * 2.4);
  float outerGlow = exp(-dist * 1.2);

  vec3 colCream = vec3(1.0, 0.97, 0.95);
  vec3 colGold = vec3(0.99, 0.85, 0.00);
  vec3 colWarmAmber = vec3(0.85, 0.55, 0.25);
  vec3 colOliveGlow = vec3(0.65, 0.72, 0.42);

  vec3 color = mix(colCream, colGold, radialGlow * 0.85);
  color = mix(color, colWarmAmber, lightRays * radialGlow * 0.6);
  color = mix(color, colOliveGlow, mist * 0.15 * outerGlow);

  float alpha = (radialGlow * 0.45) + (lightRays * radialGlow * 0.35) + (mist * outerGlow * 0.15);
  alpha = clamp(alpha * 0.75, 0.0, 0.65);

  gl_FragColor = vec4(color, alpha);
}`;

export function HeroShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    syncSize();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(syncSize) : null;
    ro?.observe(canvas);

    // Pointer in pixel coords matching u_resolution (ShaderToy convention).
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
      mouse.y = (1 - (e.clientY - rect.top) / rect.height) * canvas.height;
    };

    const draw = (ms: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, ms * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // A calm, static sunrise — no ongoing motion.
      draw(0);
      return () => {
        ro?.disconnect();
      };
    }

    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    let inView = true;
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && inView && document.visibilityState === "visible") {
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver((entries) => {
            inView = entries[0]?.isIntersecting ?? true;
            if (inView) start();
            else stop();
          })
        : null;
    io?.observe(canvas);

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      io?.disconnect();
      ro?.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div aria-hidden="true" className={className}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
