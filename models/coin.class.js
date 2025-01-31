class Coin extends MoveableObject {
  width = 50;
  height = 50;

  IMAGES_COIN = [
    "Imgs/4. Marcadores/1. Coins/1.png",
    "Imgs/4. Marcadores/1. Coins/2.png",
    "Imgs/4. Marcadores/1. Coins/3.png",
    "Imgs/4. Marcadores/1. Coins/4.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);

    // Positioniere Coins mit Abstand von Sharkie (x >= 100) und vor dem Endboss (x <= 2400)
    const minX = 100; // Minimaler Abstand von Sharkie
    const maxX = 2400; // Maximaler Abstand vor Endboss (Endboss bei 2500)

    this.x = minX + Math.random() * (maxX - minX);
    this.y = 50 + Math.random() * 300; // Zufällige Y-Position
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 150);
  }
}
