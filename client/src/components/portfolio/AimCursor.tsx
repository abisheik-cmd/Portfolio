import { useEffect } from "react";

export default function AimCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const root = document.documentElement;
    const deactivate = () => root.classList.remove("aim-cursor-active");
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const target = event.target;
      if (target instanceof Element && target.closest("video, input, textarea, select, [contenteditable='true']")) {
        deactivate();
        return;
      }

      root.style.setProperty("--aim-cursor-x", `${event.clientX}px`);
      root.style.setProperty("--aim-cursor-y", `${event.clientY}px`);
      root.classList.add("aim-cursor-active");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", deactivate);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", deactivate);
      deactivate();
      root.style.removeProperty("--aim-cursor-x");
      root.style.removeProperty("--aim-cursor-y");
    };
  }, []);

  return (
    <svg className="aim-cursor" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <g className="aim-cursor-rotating-square">
        <path d="M14 3H6a3 3 0 0 0-3 3v8M26 3h8a3 3 0 0 1 3 3v8M3 26v8a3 3 0 0 0 3 3h8M37 26v8a3 3 0 0 1-3 3h-8" />
      </g>
      <circle cx="20" cy="20" r="5" />
      <path d="M20 11v5m0 8v5m-9-9h5m8 0h5" />
      <circle className="aim-cursor-dot" cx="20" cy="20" r="1.2" />
    </svg>
  );
}
