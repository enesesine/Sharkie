/**
 * Represents a surface object in the game.
 * @extends MoveableObject
 */
class Surface extends MoveableObject {
  /**
   * Creates a new Surface instance.
   */
  constructor() {
    super();
    this.x = Math.random() * 500;
    this.y = 0;
    this.width = 2000;
  }

  /**
   * Initiates the surface animation.
   */
  animate() {
    this.moveLeft();
  }

  /**
   * Moves the surface to the left continuously.
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
