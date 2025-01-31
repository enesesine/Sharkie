class Fish3 extends MoveableObject {
  width = 70;
  height = 60;

  IMAGES_SWIMMING = [
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);

    this.x = 900 + Math.random() * 2000;
    this.y = 150 + Math.random() * 200; // Kleine, schnelle Fische schwimmen mittig
    this.speed = 0.7 + Math.random() * 1.3;
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
