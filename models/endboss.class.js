class Endboss extends MoveableObject {
  height = 500;
  width = 300;
  y = -80;

  IMAGES_STANDING = [
    "Imgs/2.Enemy/3 Final Enemy/2.floating/1.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/2.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/3.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/4.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/5.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/6.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/7.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/8.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/9.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/10.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/11.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/12.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_STANDING[0]);
    this.loadImages(this.IMAGES_STANDING);
    this.x = 2500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_STANDING);
    }, 200);
  }
}
