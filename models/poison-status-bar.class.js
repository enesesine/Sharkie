/**
 * Represents the status bar for poisoned bubbles.
 */
class PoisonStatusBar extends DrawableObject {
  IMAGES = [
    "Imgs/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    "Imgs/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "Imgs/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "Imgs/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "Imgs/4. Marcadores/green/poisoned bubbles/80percent.png",
    "Imgs/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
  ];
  percentage = 0;

  /**
   * Creates a new PoisonStatusBar instance.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage and updates the displayed image.
   * @param {number} percentage - The new percentage (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the appropriate image index based on the current percentage.
   * @returns {number} The index of the image.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}
