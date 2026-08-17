'use client';

import { cn } from '@/lib/utils/utils';
import { useMotionValue, animate, m } from "motion/react";
import { useCallback, useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  stopOnHover?: boolean;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 40,
  durationOnHover,
  stopOnHover = false,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const currentDurationRef = useRef(duration);
  const isPausedRef = useRef(false);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const restartAnimationRef = useRef<() => void>(() => {});

  const stopAnimation = useCallback(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;
  }, []);

  const restartAnimation = useCallback(() => {
    stopAnimation();

    if (isPausedRef.current) {
      return;
    }

    const size = direction === 'horizontal' ? width : height;
    const contentSize = size / 2 + gap / 2;
    if (contentSize <= 0) {
      return;
    }

    const from = reverse ? -contentSize : 0;
    const to = reverse ? 0 : -contentSize;

    const currentPos = translation.get();
    const remainingDistance = Math.abs(currentPos - to);
    const calculatedDuration =
      currentDurationRef.current * (remainingDistance / contentSize);

    controlsRef.current = animate(translation, [currentPos, to], {
      ease: 'linear',
      duration: calculatedDuration,
      onComplete: () => {
        translation.set(from);
        restartAnimationRef.current();
      },
    });
  }, [direction, gap, height, reverse, stopAnimation, translation, width]);

  useEffect(() => {
    restartAnimationRef.current = restartAnimation;
  }, [restartAnimation]);

  useEffect(() => {
    currentDurationRef.current = duration;
    restartAnimation();

    return stopAnimation;
  }, [duration, restartAnimation, stopAnimation]);

  const hoverProps = {
    onHoverStart: () => {
      if (stopOnHover) {
        isPausedRef.current = true;
        stopAnimation();
      } else if (durationOnHover) {
        currentDurationRef.current = durationOnHover;
        restartAnimation();
      }
    },
    onHoverEnd: () => {
      if (stopOnHover) {
        isPausedRef.current = false;
        restartAnimation();
      } else if (durationOnHover) {
        currentDurationRef.current = duration;
        restartAnimation();
      }
    },
  };


  return (
    <div className={cn('overflow-hidden', className)}>
      <m.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </m.div>
    </div>
  );
}

