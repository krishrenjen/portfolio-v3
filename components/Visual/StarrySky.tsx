'use client';

import { useEffect, useRef } from 'react';

export default function StarrySky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const baseDensity = prefersReducedMotion ? 0.0025 : 0.005; // stars per 10,000px²

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: {
      x: number;
      y: number;
      radius: number;
      speed: number;
    }[] = [];

    const computeStarCount = (w: number, h: number) => {
      const area = w * h;
      return Math.floor((area / 10000) * baseDensity * 100);
    };

    const generateStars = (count: number) => {
      return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        speed: prefersReducedMotion ? 0 : 0.05 + Math.random() * 0.1,
      }));
    };

    const setCanvasSize = () => {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'white';
      for (const star of stars) {
        if (!prefersReducedMotion) {
          star.y += star.speed;
          if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
          }
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        frameId = requestAnimationFrame(draw);
      }
    };

    const init = () => {
      setCanvasSize();
      stars = generateStars(computeStarCount(width, height));
    };

    let frameId: number;
    init();
    if (!prefersReducedMotion) {
      frameId = requestAnimationFrame(draw);
    } else {
      draw();
    }

    const handleResize = () => {
      const oldWidth = width;
      const oldHeight = height;

      width = window.innerWidth;
      height = window.innerHeight;

      const scaleX = width / oldWidth;
      const scaleY = height / oldHeight;

      // Scale existing stars
      for (const star of stars) {
        star.x *= scaleX;
        star.y *= scaleY;
      }

      const desiredCount = computeStarCount(width, height);
      const currentCount = stars.length;

      if (desiredCount > currentCount) {
        const toAdd = generateStars(desiredCount - currentCount);
        stars.push(...toAdd);
      } else if (desiredCount < currentCount) {
        stars.splice(desiredCount);
      }

      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        background: '#0a0a0a',
      }}
    />
  );
}
