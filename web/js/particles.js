// SafetyLens AR - Fire Particle Ember Engine (Low-End Mobile Canvas Optimization)

const ParticleEngine = {
  canvas: null,
  ctx: null,
  particles: [],
  animId: null,

  init: function(canvasElem) {
    this.canvas = canvasElem;
    this.ctx = canvasElem.getContext('2d');
    this.resizeCanvas();
    this.createParticles(25); // Micro count for high performance on budget CPUs
    this.animate();
  },

  resizeCanvas: function() {
    if (this.canvas) {
      this.canvas.width = this.canvas.clientWidth || 390;
      this.canvas.height = this.canvas.clientHeight || 420;
    }
  },

  createParticles: function(count) {
    this.particles = [];
    const w = this.canvas ? this.canvas.width : 390;
    const h = this.canvas ? this.canvas.height : 420;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 3 + 2,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 2 - 1,
        alpha: Math.random() * 0.7 + 0.3,
        color: Math.random() < 0.6 ? "rgba(255, 140, 50, " : "rgba(255, 82, 51, "
      });
    }
  },

  stop: function() {
    cancelAnimationFrame(this.animId);
  },

  animate: function() {
    const self = this;
    if (!self.ctx || !self.canvas) return;
    const w = self.canvas.width;
    const h = self.canvas.height;

    function loop() {
      self.ctx.clearRect(0, 0, w, h);
      
      // Radial glow gradient background
      const grad = self.ctx.createRadialGradient(w / 2, h * 0.5, 10, w / 2, h * 0.5, 180);
      grad.addColorStop(0, "rgba(196, 65, 20, 0.4)");
      grad.addColorStop(1, "rgba(8, 9, 10, 0.95)");
      self.ctx.fillStyle = grad;
      self.ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < self.particles.length; i++) {
        const p = self.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.005;

        if (p.y < 0 || p.alpha <= 0) {
          p.x = Math.random() * w;
          p.y = h + 10;
          p.alpha = Math.random() * 0.7 + 0.3;
        }

        self.ctx.beginPath();
        self.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        self.ctx.fillStyle = p.color + p.alpha + ")";
        self.ctx.fill();
      }

      self.animId = requestAnimationFrame(loop);
    }

    loop();
  }
};
