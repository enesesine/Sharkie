// poisoned-bubble.class.js
class PoisonedBubble extends MoveableObject {
  constructor(x, y, goingLeft, world) {
    super().loadImage(
      "Imgs/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"
    );
    this.x = x;
    this.y = y;
    this.initialY = y; // Speichert die Ausgangs-y-Position
    this.width = 20; // Anpassen, falls nötig
    this.height = 20; // Anpassen, falls nötig
    this.goingLeft = goingLeft;
    this.speed = 6; // Anpassen, falls nötig
    this.world = world;
    this.spawnTime = Date.now();
    this.otherDirection = false;
  }

  update() {
    // Horizontale Bewegung:
    if (this.goingLeft) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }

    // Vertikale Oszillation (optional; anpassen, falls gewünscht)
    const elapsed = (Date.now() - this.spawnTime) / 1000;
    const amplitude = 3; // kleinere Amplitude als normale Bubble
    const period = 2;
    const yOffset = amplitude * Math.sin((2 * Math.PI * elapsed) / period);
    // Für eine gleichmäßigere Oszillation kannst du den initialen y-Wert speichern:
    this.y = this.initialY + yOffset;

    // Entferne die Projectile, wenn sie außerhalb des Canvas sind oder nach 3 Sekunden
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
