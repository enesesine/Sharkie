/**
 * Represents a normal bubble.
 * @extends MoveableObject
 */
class Bubble extends MoveableObject {
  offset = { top: 5, right: 5, bottom: 5, left: 5 };

  /**
   * Creates a new Bubble instance.
   * @param {number} x - The x-position.
   * @param {number} y - The y-position.
   * @param {boolean} goingLeft - Direction flag.
   * @param {World} world - Reference to the game world.
   */
  constructor(x, y, goingLeft, world) {
    super().loadImage("Imgs/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.world = world;
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.width = 40;
    this.height = 40;
    this.goingLeft = goingLeft;
    this.speed = 1;
    setTimeout(() => this.removeBubble(), 1500);
  }

  /**
   * Updates the bubble's position and removes it if it goes out of bounds.
   */
  update() {
    if (this.goingLeft) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }
    const distance = this.x - this.initialX;
    this.y = this.initialY + Math.sin(distance / 30) * 15;
    if (
      this.x < -this.width ||
      this.x > this.world.level.level_end_x + this.width
    ) {
      this.removeBubble();
    }
  }

  /**
   * Removes the bubble from the game world's bubbles array.
   */
  removeBubble() {
    const index = this.world.bubbles.indexOf(this);
    if (index >= 0) {
      this.world.bubbles.splice(index, 1);
    }
  }

  /**
   * Destroys the bubble by removing it from the game world's bubbles array.
   */
  destroyBubble() {
    const index = this.world.bubbles.indexOf(this);
    if (index >= 0) {
      this.world.bubbles.splice(index, 1);
    }
  }
}
