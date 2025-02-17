/**
 * Represents a bubble projectile.
 * Bubbles remain in world coordinates.
 * @extends MoveableObject
 */
class Bubble extends MoveableObject {
  offset = { top: 5, right: 5, bottom: 5, left: 5 };

  /**
   * Creates a new Bubble.
   * @param {number} x - The initial x-position.
   * @param {number} y - The initial y-position.
   * @param {boolean} goingLeft - Direction of travel (true for left).
   * @param {World} world - The game world reference.
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
  }

  /**
   * Updates the bubble's position.
   */
  update() {
    this.x += this.goingLeft ? -this.speed : this.speed;
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
   * Removes this bubble from the world's bubbles array.
   */
  removeBubble() {
    const index = this.world.bubbles.indexOf(this);
    if (index >= 0) this.world.bubbles.splice(index, 1);
  }

  /**
   * Destroys this bubble.
   */
  destroyBubble() {
    if (this.world) {
      const index = this.world.bubbles.indexOf(this);
      if (index >= 0) this.world.bubbles.splice(index, 1);
    }
  }
}
