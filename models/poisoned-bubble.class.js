/**
 * Represents a poisoned bubble.
 * @extends MoveableObject
 */
class PoisonedBubble extends MoveableObject {
  IMAGES = [
    "Imgs/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png",
  ];

  /**
   * Creates a new PoisonedBubble instance.
   * @param {number} x - The x-position.
   * @param {number} y - The y-position.
   * @param {boolean} goingLeft - Direction flag.
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
    // Entferne die PoisonedBubble nach 3 Sekunden
    setTimeout(() => this.removeBubble(), 1500);
  }

  animate() {
    // Keine Animation, da nur ein Bild verwendet wird.
  }

  removeBubble() {
    const index = this.world.bubbles.indexOf(this);
    if (index >= 0) {
      this.world.bubbles.splice(index, 1);
    }
  }
}
