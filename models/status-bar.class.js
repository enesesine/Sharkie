/**
 * Represents a status bar for the character's life.
 */
class StatusBar extends DrawableObject {
  IMAGES = [
    "Imgs/4. Marcadores/green/Life/0_  copia 3.png",
    "Imgs/4. Marcadores/green/Life/20_ copia 4.png",
    "Imgs/4. Marcadores/green/Life/40_  copia 3.png",
    "Imgs/4. Marcadores/green/Life/60_  copia 3.png",
    "Imgs/4. Marcadores/green/Life/80_  copia 3.png",
    "Imgs/4. Marcadores/green/Life/100_  copia 2.png",
  ];
  percentage = 100;

  /**
   * Creates a new StatusBar instance.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage and updates the displayed image accordingly.
   * @param {number} percentage - The new percentage (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index for the status image based on the current percentage.
   * @returns {number} The index corresponding to the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    if (this.percentage > 80) return 4;
    if (this.percentage > 60) return 3;
    if (this.percentage > 40) return 2;
    if (this.percentage > 20) return 1;
    return 0;
  }
}
