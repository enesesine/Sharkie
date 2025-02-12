class Bubble extends MoveableObject {
  // Füge ein Offset hinzu, damit isColliding() keine undefined-Werte bekommt
  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };

  constructor(x, y, goingLeft, world) {
    super().loadImage("Imgs/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.world = world;

    // Startposition
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;

    // Größe
    this.width = 40;
    this.height = 40;

    // Richtung & Grundgeschwindigkeit
    this.goingLeft = goingLeft;
    this.speed = 2.5;
  }

  update() {
    if (this.goingLeft) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }

    let distance = this.x - this.initialX;
    this.y = this.initialY + Math.sin(distance / 35) * 5;

    // Falls Bubble den Canvas verlässt:
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

  destroyBubble() {
    if (this.world) {
      const index = this.world.bubbles.indexOf(this);
      if (index >= 0) {
        console.log(`🎈💥 Bubble zerstört!`);
        this.world.bubbles.splice(index, 1);
      }
    }
  }
}
