import { useState, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Props {
  text: string;
  href?: string;
  type?: "primary" | "ghost";
  download?: boolean;
  children?: ReactNode;
}

// Continuous border-radius keyframes — surface tension wobble
const breathe = {
  borderRadius: [
    "24px 26px 26px 24px",
    "26px 22px 28px 24px",
    "22px 28px 24px 26px",
    "28px 24px 22px 28px",
    "24px 26px 26px 24px",
  ],
};

const breatheTransition = {
  duration: 6,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export default function LiquidButtonInner({
  text,
  href,
  type = "primary",
  download = false,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const isPrimary = type === "primary";

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spring = { stiffness: 300, damping: 20, mass: 0.6 };
  const sx = useSpring(mouseX, spring);
  const sy = useSpring(mouseY, spring);

  // Gentle deformation following cursor
  const skewX = useTransform(sx, [0, 0.5, 1], [1.2, 0, -1.2]);
  const skewY = useTransform(sy, [0, 0.5, 1], [-0.8, 0, 0.8]);

  // Specular highlight shifts with cursor
  const highlightX = useTransform(sx, [0, 1], ["20%", "80%"]);
  const highlightY = useTransform(sy, [0, 1], ["10%", "60%"]);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  };

  const onEnter = () => setHovered(true);
  const onLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const Tag = href ? motion.a : motion.button;
  const linkProps = href
    ? {
        href,
        ...(download ? { download: true } : {}),
        ...(href.startsWith("http")
          ? { target: "_blank" as const, rel: "noopener noreferrer" }
          : {}),
      }
    : {};

  return (
    <div
      ref={ref}
      className="liquid-btn-wrapper inline-block"
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <motion.div style={{ skewX, skewY }}>
        <Tag
          {...linkProps}
          className={`liquid-btn ${
            isPrimary ? "liquid-btn-primary" : "liquid-btn-ghost"
          } relative inline-flex items-center gap-2 overflow-hidden px-7 py-3.5 text-sm font-medium no-underline cursor-pointer`}
          // Continuous breathing morph + hover scale
          animate={{
            ...breathe,
            scale: hovered ? 1.05 : 1,
          }}
          transition={{
            borderRadius: breatheTransition,
            scale: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          {/* Specular highlight — tracks cursor, brightens on hover */}
          <motion.span
            className="pointer-events-none absolute h-32 w-32 rounded-full"
            style={{
              left: highlightX,
              top: highlightY,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              opacity: hovered ? 0.6 : 0.25,
              scale: hovered ? 1.4 : 1,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
          >
            <span className="liquid-specular block h-full w-full rounded-full" />
          </motion.span>

          {/* Content */}
          <span className="relative z-10 flex items-center gap-2">
            {children}
            {text}
          </span>
        </Tag>
      </motion.div>
    </div>
  );
}
