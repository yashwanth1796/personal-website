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
  // Server-rendered content remains readable before hydration or without JavaScript.
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let hasEntered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || reducedMotion.matches) {
          hasEntered = true;
          if (timer) clearTimeout(timer);
          if (delay > 0) {
            timer = setTimeout(() => {
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
        } else if (!hasEntered || !triggerOnce) {
          if (timer) clearTimeout(timer);
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    const showForReducedMotion = () => {
      if (reducedMotion.matches) {
        if (timer) clearTimeout(timer);
        setIsVisible(true);
        observer.disconnect();
      }
    };
    reducedMotion.addEventListener("change", showForReducedMotion);
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
      reducedMotion.removeEventListener("change", showForReducedMotion);
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
    (index: number) => (isVisible ? Math.min(index, Math.max(0, childCount - 1)) * staggerDelay : 0),
    [isVisible, staggerDelay, childCount]
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


