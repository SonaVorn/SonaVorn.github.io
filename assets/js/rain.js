/* Rain background — plain <canvas>, no libraries.
   Same look as the original p5.js version, but it loads instantly, works offline,
   respects "reduce motion" settings and keeps a steady speed on any screen refresh rate. */
(() => {
  "use strict";

  const DROP_COUNT = 120;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const canvas = document.createElement("canvas");
  canvas.className = "rain-canvas";
  canvas.setAttribute("aria-hidden", "true");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let drops = [];
  let frameId = null;
  let lastTime = 0;

  const rand = (min, max) => min + Math.random() * (max - min);

  class RainDrop {
    constructor() {
      this.reset();
      this.y = rand(-height, height); // spread drops out on first load
    }

    reset() {
      this.x = rand(0, width);
      this.y = rand(-200, -20);
      this.length = rand(8, 20);
      this.speed = rand(4, 10);
      this.opacity = rand(35, 105) / 255;
    }

    fall(step) {
      this.y += this.speed * step;
      if (this.y > height) this.reset();
    }

    show() {
      ctx.strokeStyle = `rgba(78, 177, 160, ${this.opacity.toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - 2, this.y + this.length);
      ctx.stroke();
    }
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const newWidth = window.innerWidth;
    const ratio = width ? newWidth / width : 1;

    width = newWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 1;

    drops.forEach(drop => { drop.x *= ratio; });
  }

  function frame(time) {
    // Normalise to 60fps so the rain isn't faster on 120Hz screens.
    const step = lastTime ? Math.min((time - lastTime) / 16.667, 3) : 1;
    lastTime = time;

    ctx.clearRect(0, 0, width, height);
    for (const drop of drops) {
      drop.fall(step);
      drop.show();
    }
    frameId = requestAnimationFrame(frame);
  }

  function start() {
    if (frameId !== null) return;
    if (!canvas.isConnected) document.body.prepend(canvas);
    lastTime = 0;
    frameId = requestAnimationFrame(frame);
  }

  function stop() {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    ctx.clearRect(0, 0, width, height);
  }

  function applyMotionPreference() {
    if (motionQuery.matches) stop();
    else start();
  }

  resize();
  drops = Array.from({ length: DROP_COUNT }, () => new RainDrop());

  window.addEventListener("resize", resize);
  motionQuery.addEventListener("change", applyMotionPreference);
  applyMotionPreference();
})();
