/**
 * Represents a background object in the game world.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;

  /**
   * Creates a new BackgroundObject.
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.y = 480 - this.height;
    this.x = x;
  }
}
