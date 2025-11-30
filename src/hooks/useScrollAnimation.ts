"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type AnimationVariant = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "scale-up" 
  | "scale-down"
  | "rotate-in"
  | "blur-in";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

interface ScrollAnimationResult {
  ref: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  hasAnimated: boolean;
}

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): ScrollAnimationResult {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { ref, isVisible, hasAnimated };
}

// Hook for staggered children animations
interface UseStaggerAnimationOptions extends UseScrollAnimationOptions {
  staggerDelay?: number;
  childCount: number;
}

export function useStaggerAnimation(
  options: UseStaggerAnimationOptions
): { ref: React.RefObject<HTMLElement | null>; isVisible: boolean; getChildDelay: (index: number) => number } {
  const { staggerDelay = 100, childCount, ...scrollOptions } = options;
  const { ref, isVisible } = useScrollAnimation(scrollOptions);

  const getChildDelay = useCallback(
    (index: number) => (isVisible ? index * staggerDelay : 0),
    [isVisible, staggerDelay]
  );

  return { ref, isVisible, getChildDelay };
}

// Utility function to get animation classes
export function getAnimationClasses(
  variant: AnimationVariant,
  isVisible: boolean,
  duration: number = 600
): string {
  const baseClasses = `transition-all ease-out`;
  const durationClass = `duration-[${duration}ms]`;
  
  const variants: Record<AnimationVariant, { hidden: string; visible: string }> = {
    "fade-up": {
      hidden: "opacity-0 translate-y-8",
      visible: "opacity-100 translate-y-0",
    },
    "fade-down": {
      hidden: "opacity-0 -translate-y-8",
      visible: "opacity-100 translate-y-0",
    },
    "fade-left": {
      hidden: "opacity-0 translate-x-8",
      visible: "opacity-100 translate-x-0",
    },
    "fade-right": {
      hidden: "opacity-0 -translate-x-8",
      visible: "opacity-100 translate-x-0",
    },
    "scale-up": {
      hidden: "opacity-0 scale-95",
      visible: "opacity-100 scale-100",
    },
    "scale-down": {
      hidden: "opacity-0 scale-105",
      visible: "opacity-100 scale-100",
    },
    "rotate-in": {
      hidden: "opacity-0 rotate-12 scale-95",
      visible: "opacity-100 rotate-0 scale-100",
    },
    "blur-in": {
      hidden: "opacity-0 blur-sm",
      visible: "opacity-100 blur-0",
    },
  };

  const { hidden, visible } = variants[variant];
  
  return `${baseClasses} ${durationClass} ${isVisible ? visible : hidden}`;
}


