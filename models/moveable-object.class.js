class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 100;

  isColliding(mo) {
    return (
      this.x + this.width > mo.x && // Prüft, ob sich die Objekte überlappen (rechts)
      this.x < mo.x + mo.width && // Prüft, ob sich die Objekte überlappen (links)
      this.y + this.height > mo.y && // Prüft, ob sich die Objekte überlappen (unten)
      this.y < mo.y + mo.height // Prüft, ob sich die Objekte überlappen (oben)
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
