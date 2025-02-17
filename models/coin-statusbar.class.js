/**
 * Represents the coin status bar.
 * @extends DrawableObject
 */
class CoinStatusBar extends DrawableObject {
  IMAGES = [
    "Imgs/4. Marcadores/green/Coin/0_  copia 4.png",
    "Imgs/4. Marcadores/green/Coin/20_  copia 2.png",
    "Imgs/4. Marcadores/green/Coin/40_  copia 4.png",
    "Imgs/4. Marcadores/green/Coin/60_  copia 4.png",
    "Imgs/4. Marcadores/green/Coin/80_ copia 4.png",
    "Imgs/4. Marcadores/green/Coin/100_ copia 4.png",
  ];
  percentage = 0;

  /**
   * Creates a new CoinStatusBar instance.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 100;
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
   * Determines the image index based on the current percentage.
   * @returns {number} The index for the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) return 5;
    if (this.percentage > 80) return 4;
    if (this.percentage > 60) return 3;
    if (this.percentage > 40) return 2;
    if (this.percentage > 20) return 1;
    return 0;
  }
}
