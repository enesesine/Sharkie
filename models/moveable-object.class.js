/**
 * Represents a moveable object that can be animated.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 100;

  /**
   * Checks if this object is colliding with another.
   * @param {DrawableObject} mo - The other object.
   * @returns {boolean} True if colliding.
   */
  isColliding(mo) {
    if (!this.offset) this.offset = { top: 0, right: 0, bottom: 0, left: 0 };
    if (!mo.offset) mo.offset = { top: 0, right: 0, bottom: 0, left: 0 };
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the object's energy by 5.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) this.energy = 0;
  }

  /**
   * Determines if the object is dead.
   * @returns {boolean} True if energy is 0.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    // Implement movement logic if needed.
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Plays an animation from an array of images.
   * @param {string[]} images - Array of image paths.
   */
  playAnimation(images) {
    const i = this.currentImage % images.length;
    const path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
