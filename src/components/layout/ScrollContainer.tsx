/* =========================================================
   SCROLL CONTAINER — Smooth Scroll Layout Wrapper
   Provides structural grouping for the single-page layout.
========================================================= */

import type { ReactNode } from 'react';

interface ScrollContainerProps {
  children: ReactNode;
}

export default function ScrollContainer({ children }: ScrollContainerProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[hsl(225,15%,3%)] overflow-hidden">
      {/* Structural layout wrapper */}
      <main className="flex-1 w-full relative z-10 flex flex-col">
        {children}
      </main>
    </div>
  );
}
