/**
 * Represents a poisoned bubble with a single image.
 * Movement is managed by the game world.
 */
class PoisonedBubble extends MoveableObject {
  IMAGES = [
    "Imgs/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png",
  ];

  /**
   * Creates a poisoned bubble.
   * @param {number} x - The initial x-position.
   * @param {number} y - The initial y-position.
   * @param {boolean} goingLeft - Direction of travel (true if left).
   * @param {World} world - Reference to the game world.
   */
  constructor(x, y, goingLeft, world) {
    super().loadImage(this.IMAGES[0]);
    this.world = world;
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.width = 65;
    this.height = 65;
    this.goingLeft = goingLeft;
    this.speed = 10;
  }

  /**
   * No frame animation is needed.
   */
  animate() {}

  /**
   * Removes this bubble from the world's bubbles array.
   */
  removeBubble() {
    const index = this.world.bubbles.indexOf(this);
    if (index >= 0) {
      this.world.bubbles.splice(index, 1);
    }
  }
}
