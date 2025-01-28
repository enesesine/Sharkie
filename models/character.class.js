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

  IMAGES_SWIMMING = [
    "Imgs/1.Sharkie/3.Swim/1.png",
    "Imgs/1.Sharkie/3.Swim/2.png",
    "Imgs/1.Sharkie/3.Swim/3.png",
    "Imgs/1.Sharkie/3.Swim/4.png",
    "Imgs/1.Sharkie/3.Swim/5.png",
    "Imgs/1.Sharkie/3.Swim/6.png",
    "Imgs/1.Sharkie/3.Swim/7.png",
  ];
  world;

  currentImage = 0;

  constructor() {
    super().loadImage("Imgs/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_SWIMMING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > -300) {
        this.x -= this.speed;
        this.otherDirection = true;
      }

      this.world.camera_x = -this.x + 5;
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
      if (this.world.keyboard.DOWN && this.y < 270) {
        this.y += this.speed;
      }

      if (this.world.keyboard.UP && this.y > -50) {
        this.y -= this.speed;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.UP || this.world.keyboard.DOWN) {
      }

      this.playAnimation(this.IMAGES_STANDING);
    }, 150);
  }

  jump() {}
}
