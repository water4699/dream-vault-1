"use client";

import { useEffect } from "react";

export function ErrorSuppress() {
  useEffect(() => {
    // Suppress all "Failed to fetch" errors globally
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Override console.error to filter out "Failed to fetch"
    console.error = (...args: any[]) => {
      const message = args.join(" ");
      if (
        message.includes("Failed to fetch") ||
        message.includes("fetch") ||
        (typeof args[0] === "string" && args[0].includes("Failed to fetch"))
      ) {
        // Completely suppress - don't log anything
        return;
      }
      originalError.apply(console, args);
    };

    // Override console.warn to filter out "Failed to fetch"
    console.warn = (...args: any[]) => {
      const message = args.join(" ");
      if (
        message.includes("Failed to fetch") ||
        message.includes("fetch") ||
        (typeof args[0] === "string" && args[0].includes("Failed to fetch"))
      ) {
        // Completely suppress - don't log anything
        return;
      }
      originalWarn.apply(console, args);
    };

    // Global error handler to catch unhandled errors
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || String(event.error);
      if (
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("fetch")
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    // Global unhandled rejection handler
    const handleRejection = (event: PromiseRejectionEvent) => {
      const errorMessage =
        event.reason?.message ||
        String(event.reason) ||
        String(event);
      if (
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("fetch")
      ) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleRejection, true);

    // Cleanup
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleRejection, true);
    };
  }, []);

  return null;
}

