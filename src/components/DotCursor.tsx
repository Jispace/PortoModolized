import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useHslTheme } from "../context/HslThemeContext";

type CursorMode = "default" | "interactive" | "text";

export const DotCursor: React.FC = () => {
  const { hue, saturation, lightness } = useHslTheme();
  const prefersReducedMotion = useReducedMotion();

  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Fast, crisp spring for inner precision dot
  const dotX = useSpring(rawX, { stiffness: 900, damping: 42, mass: 0.2 });
  const dotY = useSpring(rawY, { stiffness: 900, damping: 42, mass: 0.2 });

  // Smooth editorial trailing spring for outer ring
  const ringX = useSpring(rawX, { stiffness: 320, damping: 28, mass: 0.45 });
  const ringY = useSpring(rawY, { stiffness: 320, damping: 28, mass: 0.45 });

  // Chained silk trail nodes with slight progressive latency
  const trail1X = useSpring(rawX, { stiffness: 240, damping: 26, mass: 0.55 });
  const trail1Y = useSpring(rawY, { stiffness: 240, damping: 26, mass: 0.55 });

  const trail2X = useSpring(trail1X, { stiffness: 210, damping: 26, mass: 0.65 });
  const trail2Y = useSpring(trail1Y, { stiffness: 210, damping: 26, mass: 0.65 });

  const trail3X = useSpring(trail2X, { stiffness: 185, damping: 25, mass: 0.75 });
  const trail3Y = useSpring(trail2Y, { stiffness: 185, damping: 25, mass: 0.75 });

  const trail4X = useSpring(trail3X, { stiffness: 160, damping: 24, mass: 0.85 });
  const trail4Y = useSpring(trail3Y, { stiffness: 160, damping: 24, mass: 0.85 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    const updatePointerSupport = () => setIsFinePointer(mediaQuery.matches);
    updatePointerSupport();

    mediaQuery.addEventListener("change", updatePointerSupport);
    return () => mediaQuery.removeEventListener("change", updatePointerSupport);
  }, []);

  useEffect(() => {
    if (!isFinePointer || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorMode("default");
        return;
      }

      if (
        target.closest(
          'input:not([type="button"]):not([type="submit"]):not([type="range"]), textarea, select, [contenteditable="true"]'
        )
      ) {
        setCursorMode("text");
      } else if (
        target.closest(
          'a, button, [role="button"], input[type="submit"], input[type="button"], input[type="range"], label[for], [data-cursor="interactive"]'
        )
      ) {
        setCursorMode("interactive");
      } else {
        setCursorMode("default");
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleWindowBlur = () => {
      setIsVisible(false);
      setIsPressed(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [isFinePointer, prefersReducedMotion, rawX, rawY]);

  if (!isFinePointer || prefersReducedMotion) {
    return null;
  }

  const dotColor = `hsl(${hue}, ${Math.min(saturation + 12, 75)}%, ${Math.min(lightness, 42)}%)`;
  const trailColor = `hsl(${hue}, ${Math.min(saturation + 8, 70)}%, ${Math.min(lightness, 52)}%)`;
  const ringBorderColor = `hsla(${hue}, ${Math.min(saturation + 10, 75)}%, ${Math.min(lightness, 46)}%, ${
    cursorMode === "interactive" ? 0.65 : 0.35
  })`;
  const ringFillColor =
    cursorMode === "interactive"
      ? `hsla(${hue}, ${saturation}%, ${lightness}%, 0.14)`
      : "transparent";

  const ringScale =
    cursorMode === "text"
      ? 0.4
      : isPressed
        ? 0.85
        : cursorMode === "interactive"
          ? 1.55
          : 1;

  const dotScale =
    cursorMode === "text"
      ? 0
      : isPressed
        ? 0.75
        : cursorMode === "interactive"
          ? 0.6
          : 1;

  const trailNodes = [
    { x: trail4X, y: trail4Y, sizeClass: "-ml-[1.5px] -mt-[1.5px] w-[3px] h-[3px]", baseOpacity: 0.14 },
    { x: trail3X, y: trail3Y, sizeClass: "-ml-[2px] -mt-[2px] w-1 h-1", baseOpacity: 0.22 },
    { x: trail2X, y: trail2Y, sizeClass: "-ml-[2.5px] -mt-[2.5px] w-[5px] h-[5px]", baseOpacity: 0.32 },
    { x: trail1X, y: trail1Y, sizeClass: "-ml-[3px] -mt-[3px] w-1.5 h-1.5", baseOpacity: 0.44 },
  ];

  const showTrail = isVisible && cursorMode !== "text";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* Tapered progressive silk trail */}
      {trailNodes.map((node, index) => (
        <motion.div
          key={index}
          style={{
            x: node.x,
            y: node.y,
            backgroundColor: trailColor,
          }}
          animate={{
            opacity: showTrail
              ? cursorMode === "interactive"
                ? node.baseOpacity * 0.55
                : node.baseOpacity
              : 0,
            scale: isPressed ? 0.7 : 1,
          }}
          transition={{
            opacity: { duration: 0.18 },
            scale: { duration: 0.15 },
          }}
          className={`fixed top-0 left-0 rounded-full will-change-transform ${node.sizeClass}`}
        />
      ))}

      {/* Outer tactile halo ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          borderColor: ringBorderColor,
          backgroundColor: ringFillColor,
        }}
        animate={{
          opacity: isVisible ? (cursorMode === "text" ? 0.25 : 1) : 0,
          scale: ringScale,
        }}
        transition={{
          opacity: { duration: 0.16 },
          scale: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
        }}
        className="fixed top-0 left-0 -ml-3.5 -mt-3.5 w-7 h-7 rounded-full border transition-colors duration-200 will-change-transform"
      />

      {/* Inner precision dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          backgroundColor: dotColor,
        }}
        animate={{
          opacity: isVisible && cursorMode !== "text" ? 1 : 0,
          scale: dotScale,
        }}
        transition={{
          opacity: { duration: 0.12 },
          scale: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
        }}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full shadow-2xs will-change-transform"
      />
    </div>
  );
};
