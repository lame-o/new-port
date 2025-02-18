"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  MotionProps,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { PropsWithChildren, useRef } from "react";

import { cn } from "../lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_SIZE = 48;
const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva("dock-container");

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            size: iconSize,
            magnification: iconMagnification,
            distance: iconDistance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }))}
      >
        <div className="dock-icons">
          {renderChildren()}
        </div>
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const scale = useSpring(1, {
    stiffness: 200,
    damping: 15,
  });

  useTransform(mouseX, (value) => {
    if (!ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    const mouseXPos = value;
    const elementXCenter = bounds.x + bounds.width / 2;
    const distanceFromCenter = Math.abs(mouseXPos - elementXCenter);

    if (distanceFromCenter < distance) {
      const scaleFactor =
        1 + ((magnification - size) / size) * (1 - distanceFromCenter / distance);
      scale.set(scaleFactor);
    } else {
      scale.set(1);
    }
  });

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
      }}
      className={cn("dock-icon", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
