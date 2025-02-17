/**
 * Represents a coin collectible.
 * @extends MoveableObject
 */
class Coin extends MoveableObject {
  width = 50;
  height = 50;
  IMAGES_COIN = [
    "Imgs/4. Marcadores/1. Coins/1.png",
    "Imgs/4. Marcadores/1. Coins/2.png",
    "Imgs/4. Marcadores/1. Coins/3.png",
    "Imgs/4. Marcadores/1. Coins/4.png",
  ];

  /**
   * Creates a new Coin instance.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);
    const minX = 100;
    const maxX = 2000;
    this.x = minX + Math.random() * (maxX - minX);
    this.y = 50 + Math.random() * 300;
    this.animate();
  }

  /**
   * Animates the coin by cycling through its images.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 150);
  }
}
