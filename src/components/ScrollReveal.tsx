"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionOffset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
  };
  const offset = directionOffset[direction];
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const value = offset[axis as keyof typeof offset];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, [axis]: value }}
      animate={
        isInView
          ? { opacity: 1, [axis]: 0 }
          : { opacity: 0, [axis]: value }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
