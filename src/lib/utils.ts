import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind + conditional classNames safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sleep utility (useful for loaders, demos, animations)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely get error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Something went wrong";
}

/**
 * Debounce function (search, resize, scroll)
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 300
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle function (scroll, mouse move)
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  limit = 300
) {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Format numbers (stats, counters)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Clamp a number between min & max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
