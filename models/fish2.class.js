class Fish2 extends MoveableObject {
  width = 100;
  height = 90;

  IMAGES_SWIMMING = [
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);

    this.x = 800 + Math.random() * 2000;
    this.y = 50 + Math.random() * 250; // Fische weiter oben
    this.speed = 0.3 + Math.random() * 1;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= this.speed;
      if (this.x < -100) {
        this.x = 2800 + Math.random() * 500;
      }
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING); // 🎬 Hier läuft die Animation!
    }, 150);
  }
}
