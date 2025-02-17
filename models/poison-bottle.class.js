/**
 * Represents a poison bottle collectible that animates.
 */
class PoisonBottle extends MoveableObject {
  width = 40;
  height = 50;
  IMAGES = [
    "Imgs/4. Marcadores/Posión/Animada/1.png",
    "Imgs/4. Marcadores/Posión/Animada/2.png",
    "Imgs/4. Marcadores/Posión/Animada/3.png",
    "Imgs/4. Marcadores/Posión/Animada/4.png",
    "Imgs/4. Marcadores/Posión/Animada/5.png",
    "Imgs/4. Marcadores/Posión/Animada/6.png",
    "Imgs/4. Marcadores/Posión/Animada/7.png",
    "Imgs/4. Marcadores/Posión/Animada/8.png",
  ];

  /**
   * Creates a new PoisonBottle collectible.
   * @param {number} x - The initial x-position.
   * @param {number} y - The initial y-position.
   */
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Animates the poison bottle by cycling through its images.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 150);
  }
}
