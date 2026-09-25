import React, { useEffect, useRef } from 'react';

export default function Confetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    let width;
    let height;
    let frame;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * scale;
      canvas.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);
    const colors = ['#ffffff', '#2563eb', '#60a5fa', '#ffffff', '#1d4ed8'];
    const particles = Array.from({ length: width < 600 ? 100 : 160 }, (_, index) => {
      const left = index % 2 === 0;
      return {
        x: left ? width * 0.06 : width * 0.94,
        y: height * 0.7,
        vx: (left ? 1 : -1) * (100 + Math.random() * Math.min(width * 0.65, 650)),
        vy: -(350 + Math.random() * 470),
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 16,
        size: 5 + Math.random() * 6,
        color: colors[index % colors.length],
      };
    });
    let previous = performance.now();
    let elapsed = 0;
    function draw(now) {
      const delta = Math.min((now - previous) / 1000, 0.04);
      previous = now;
      elapsed += delta;
      context.clearRect(0, 0, width, height);
      if (elapsed >= 3.8) return;
      context.globalAlpha = Math.min(1, (3.8 - elapsed) / 0.9);
      for (const particle of particles) {
        particle.vx *= Math.exp(-0.55 * delta);
        particle.vy += 460 * delta;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.rotation += particle.spin * delta;
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.scale(1, 0.35 + Math.abs(Math.cos(elapsed * 7 + particle.spin)) * 0.65);
        context.fillStyle = particle.color;
        context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.65);
        // A subtle blue edge keeps white pieces visible on the white page.
        if (particle.color === '#ffffff') {
          context.strokeStyle = '#b6d2ff';
          context.lineWidth = 0.7;
          context.strokeRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.65);
        }
        context.restore();
      }
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      context.clearRect(0, 0, width, height);
    };
  }, []);

  return <canvas ref={canvasRef} className="answer-confetti" aria-hidden="true" />;
}
