class Bubble extends MoveableObject {
  constructor(x, y, goingLeft, world) {
    super().loadImage("Imgs/1.Sharkie/4.Attack/Bubble trap/Bubble.png");

    this.world = world;
    // Speichere den Punkt, an dem die Bubble gespawnt wird
    this.initialX = x;
    this.initialY = y;

    // Setze die Startposition
    this.x = x;
    this.y = y;

    // Größe anpassen, wenn du sie größer willst (z. B. 50x50):
    this.width = 40;
    this.height = 40;

    // Richtung & Grundgeschwindigkeit
    this.goingLeft = goingLeft;
    this.speed = 5; // Kannst du beliebig anpassen
  }

  update() {
    if (this.goingLeft) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }

    // Entferne diesen Code, falls er existiert:
    // this.x -= this.world.camera_x;

    let distance = this.x - this.initialX;
    this.y = this.initialY + Math.sin(distance / 35) * 5;

    if (this.x < -this.width || this.x > this.world.canvas.width + this.width) {
      this.removeBubble();
    }
  }

  removeBubble() {
    const index = this.world.bubbles.indexOf(this);
    if (index >= 0) {
      this.world.bubbles.splice(index, 1);
    }
  }
}
