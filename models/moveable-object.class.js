class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 100;

  isColliding(mo) {
    // Falls offset fehlt, setze default
    if (!this.offset) this.offset = { top: 0, right: 0, bottom: 0, left: 0 };
    if (!mo.offset) mo.offset = { top: 0, right: 0, bottom: 0, left: 0 };

    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;

    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
