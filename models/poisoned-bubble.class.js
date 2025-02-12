class PoisonedBubble extends MoveableObject {
  IMAGES = [
    "Imgs/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (frame2).png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (frame3).png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (frame4).png",
  ]; // Füge hier die richtigen Frames für die Animation ein

  constructor(x, y, goingLeft, world) {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);

    this.world = world;
    this.initialX = x;
    this.initialY = y;

    this.x = x;
    this.y = y;

    this.width = 40;
    this.height = 40;

    this.goingLeft = goingLeft;
    this.speed = 2.5;

    this.animate();
  }

  update() {
    if (this.goingLeft) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }

    let distance = this.x - this.initialX;
    this.y = this.initialY + Math.sin(distance / 35) * 5;

    if (this.x < -this.width || this.x > this.world.canvas.width + this.width) {
      this.removeBubble();
    }
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES); // Spiele die Animation kontinuierlich
    }, 150);
  }

  removeBubble() {
    const index = this.world.bubbles.indexOf(this);
    if (index >= 0) {
      this.world.bubbles.splice(index, 1);
    }
  }
}
