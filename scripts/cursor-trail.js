// Glowing cursor trail effect
const cursorTrail = {
  particles: [],
  mouseX: 0,
  mouseY: 0,
  lastX: 0,
  lastY: 0,
  
  // Theme-specific particle colors
  themeColors: {
    night: ['#00ffff', '#ff00ff', '#8400ff'],
    dawn: ['#ffc700', '#ffaa00', '#ff9500'],
    day: ['#4c85f0', '#00bfff', '#87ceeb'],
    sunset: ['#ff6b35', '#ff8a3d', '#ffc700']
  },
  
  init() {
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mouseleave', () => this.onMouseLeave());
    this.animate();
  },
  
  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'night';
  },
  
  getThemeColors() {
    const theme = this.getTheme();
    return this.themeColors[theme] || this.themeColors.night;
  },
  
  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    
    // Create particle every few pixels for smoother trail
    const dx = this.mouseX - this.lastX;
    const dy = this.mouseY - this.lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 3) {
      this.createParticle(this.mouseX, this.mouseY);
      this.lastX = this.mouseX;
      this.lastY = this.mouseY;
    }
  },
  
  onMouseLeave() {
    // Clear particles when mouse leaves
    this.particles = [];
  },
  
  createParticle(x, y) {
    const colors = this.getThemeColors();
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const particle = {
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2 - 0.5,
      life: 1,
      size: Math.random() * 2 + 1,
      color: color,
      element: this.createParticleElement(color)
    };
    
    this.particles.push(particle);
  },
  
  createParticleElement(color) {
    const el = document.createElement('div');
    el.className = 'cursor-particle';
    el.style.boxShadow = `0 0 6px ${color}`;
    document.body.appendChild(el);
    return el;
  },
  
  animate() {
    this.particles = this.particles.filter(p => p.life > 0);
    
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // gravity
      p.life -= 0.015;
      
      const size = p.size * p.life;
      p.element.style.width = size + 'px';
      p.element.style.height = size + 'px';
      p.element.style.left = (p.x - size / 2) + 'px';
      p.element.style.top = (p.y - size / 2) + 'px';
      p.element.style.background = p.color;
      p.element.style.opacity = p.life * 0.8;
      
      if (p.life <= 0) {
        p.element.remove();
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
};

// Start the cursor trail when DOM is ready
document.addEventListener('DOMContentLoaded', () => cursorTrail.init());
