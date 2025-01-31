// poisoned-bubble.class.js
class PoisonedBubble extends MoveableObject {
  constructor(x, y, goingLeft, world) {
    super().loadImage(
      "Imgs/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"
    );

    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    this.goingLeft = goingLeft;
    this.speed = 6;
    this.world = world;
    this.spawnTime = Date.now();
    this.otherDirection = false;
  }

  update() {
    if (this.goingLeft) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }

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
