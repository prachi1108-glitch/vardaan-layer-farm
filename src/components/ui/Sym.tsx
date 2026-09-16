/**
 * Material Symbols (Outlined) icon — the icon language of the design.
 * `name` is the ligature name, e.g. "egg", "arrow_forward", "verified".
 * Decorative by default; pass a label when the icon carries meaning alone.
 */
export function Sym({
  name,
  className = "",
  filled = false,
  label,
}: {
  name: string;
  className?: string;
  filled?: boolean;
  label?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined${filled ? " filled" : ""}${
        className ? ` ${className}` : ""
      }`}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {name}
    </span>
  );
}
