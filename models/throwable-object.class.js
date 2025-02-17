/**
 * Represents a throwable bubble.
 */
class ThrowableBubble extends MoveableObject {
  speedX = 20;
  hz = 144;
  offset = { top: 0, right: 0, left: 0, bottom: 0 };

  /**
   * Creates a new ThrowableBubble object.
   * @param {number} x - The base x-position (e.g., character's x plus offset).
   * @param {number} y - The base y-position (e.g., character's y plus offset).
   * @param {World} world - The game world reference.
   */
  constructor(x, y, world) {
    super().loadImage("Imgs/1.Sharkie/4.Attack/Bubble trap/Bubble.webp");
    this.world = world;
    this.width = 40;
    this.height = 40;
    this.x = this.setX(x);
    this.y = y;
    this.throw();
  }

  /**
   * Adjusts the x-position based on the character's direction.
   * @param {number} x - The original x-position.
   * @returns {number} - The adjusted x-position.
   */
  setX(x) {
    if (this.world.character.otherDirection === true) {
      return x - this.world.character.width;
    }
    return (
      x - (this.world.character.offset ? this.world.character.offset.right : 0)
    );
  }

  /**
   * Starts the bubble's throw animation.
   */
  throw() {
    this.speedY = 1;
    const currentX = this.x;
    const direction = this.world.character.otherDirection ? -1 : 1;
    setStoppableInterval(
      this.calculateShot.bind(this, currentX, direction),
      1000 / this.hz
    );
  }

  /**
   * Calculates the bubble's movement.
   * @param {number} currentX - The x-position at the time of throwing.
   * @param {number} direction - The direction (1 for right, -1 for left).
   */
  calculateShot(currentX, direction) {
    this.x += direction;
    const distance = this.x - currentX;
    if (distance * direction <= 500) {
      this.y += Math.sin(distance / 35) * 0.3;
    } else {
      this.y -= 1.25;
    }
    if (this.x < -this.width || this.x > this.world.canvas.width + this.width) {
      this.removeBubble();
    }
  }

  /**
   * Removes the bubble from the world's throwableObjects array.
   */
  removeBubble() {
    const index = this.world.throwableObjects.indexOf(this);
    if (index >= 0) {
      this.world.throwableObjects.splice(index, 1);
    }
  }
}
