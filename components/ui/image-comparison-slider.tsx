'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RiDragMove2Fill } from '@remixicon/react';

import { cn } from '@/lib/utils';

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
  className?: string;
}

export function ImageComparison({
  beforeImage,
  afterImage,
  altBefore = 'Before',
  altAfter = 'After',
  className,
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let newPosition = ((clientX - rect.left) / rect.width) * 100;
      newPosition = Math.max(0, Math.min(100, newPosition));

      setSliderPosition(newPosition);
    },
    [isDragging],
  );

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative mx-auto w-full select-none overflow-hidden rounded-xl',
        className,
      )}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={(event) => handleMove(event.clientX)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={(event) => handleMove(event.touches[0].clientX)}
    >
      <div
        className="absolute left-0 top-0 z-10 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          fill
          src={afterImage}
          alt={altAfter}
          className="h-full w-full object-cover object-left"
          draggable="false"
          sizes="(max-width: 1024px) 100vw, 28vw"
        />
      </div>

      <Image
        fill
        src={beforeImage}
        alt={altBefore}
        className="z-0 block h-full w-full object-cover object-left"
        draggable="false"
        sizes="(max-width: 1024px) 100vw, 28vw"
      />

      <div
        className="absolute bottom-0 top-0 z-20 flex w-1.5 cursor-ew-resize items-center justify-center bg-background/80"
        style={{ left: `calc(${sliderPosition}% - 0.375rem)` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full bg-background text-foreground shadow-md transition-all duration-200 ease-in-out',
            isDragging ? 'scale-110 shadow-xl' : '',
          )}
        >
          <RiDragMove2Fill aria-hidden="true" className="size-5" />
        </div>
      </div>
    </div>
  );
}
