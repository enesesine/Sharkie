class Bubble extends MoveableObject {
  constructor(x, y, goingLeft, world) {
    super().loadImage("Imgs/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.initialY = y; // Wichtig: Speichere die Ausgangsposition
    this.width = 20;
    this.height = 20;
    this.goingLeft = goingLeft;
    this.speed = 6;
    this.world = world;
    this.spawnTime = Date.now();
    this.otherDirection = false;
  }

  update() {
    const elapsed = (Date.now() - this.spawnTime) / 1000;
    const amplitude = 5; // Amplitude der vertikalen Oszillation
    const period = 2; // Periodendauer (2 Sekunden pro Zyklus)
    const yOffset = amplitude * Math.sin((2 * Math.PI * elapsed) / period);
    // Nutze initialY, um die Bubble von ihrem Startpunkt oszillieren zu lassen:
    this.y = this.initialY + yOffset;

    if (this.goingLeft) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }

    // Entferne die Bubble, wenn sie den Canvas verlässt oder älter als 3 Sekunden ist:
    if (this.x < -this.width || this.x > this.world.canvas.width + this.width) {
      this.removeBubble();
      return;
    }
    if (Date.now() - this.spawnTime >= 3000) {
      this.removeBubble();
      return;
    }
  }

  removeBubble() {
    const index = this.world.bubbles.indexOf(this);
    if (index >= 0) {
      this.world.bubbles.splice(index, 1);
    }
  }
}
