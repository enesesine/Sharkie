// character.class.js
class Character extends MoveableObject {
  height = 220;
  width = 170;
  y = 100;
  x = 5;
  speed = 10;
  IMAGES_STANDING = [
    "Imgs/1.Sharkie/1.IDLE/1.png",
    "Imgs/1.Sharkie/1.IDLE/2.png",
    "Imgs/1.Sharkie/1.IDLE/3.png",
    "Imgs/1.Sharkie/1.IDLE/4.png",
    "Imgs/1.Sharkie/1.IDLE/5.png",
    "Imgs/1.Sharkie/1.IDLE/6.png",
    "Imgs/1.Sharkie/1.IDLE/7.png",
    "Imgs/1.Sharkie/1.IDLE/8.png",
    "Imgs/1.Sharkie/1.IDLE/9.png",
    "Imgs/1.Sharkie/1.IDLE/10.png",
    "Imgs/1.Sharkie/1.IDLE/11.png",
    "Imgs/1.Sharkie/1.IDLE/12.png",
    "Imgs/1.Sharkie/1.IDLE/13.png",
    "Imgs/1.Sharkie/1.IDLE/14.png",
    "Imgs/1.Sharkie/1.IDLE/15.png",
    "Imgs/1.Sharkie/1.IDLE/16.png",
    "Imgs/1.Sharkie/1.IDLE/17.png",
    "Imgs/1.Sharkie/1.IDLE/18.png",
  ];
  world;

  currentImage = 0;

  constructor() {
    super().loadImage("Imgs/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_STANDING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
      }

      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      }

      let i = this.currentImage % this.IMAGES_STANDING.length;
      let path = this.IMAGES_STANDING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 150);

    setInterval(() => {
      if (this.world.keyboard.DOWN) {
        this.y += this.speed;
      }

      if (this.world.keyboard.UP) {
        this.y -= this.speed;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.UP || this.world.keyboard.DOWN) {
      }

      let i = this.currentImage % this.IMAGES_STANDING.length;
      let path = this.IMAGES_STANDING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 150);
  }

  jump() {}
}
