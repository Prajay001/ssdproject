"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: "primary" | "emerald" | "amber" | "rose" | "none";
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = "none",
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  const glowClasses = {
    primary: "glow-primary",
    emerald: "glow-emerald",
    amber: "glow-amber",
    rose: "glow-rose",
    none: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hoverEffect ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "glass-panel rounded-2xl p-6 transition-all duration-200 relative overflow-hidden",
        glowClasses[glow],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
