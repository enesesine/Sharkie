/**
 * Represents a small enemy fish (Fish3) that swims and dies.
 * @extends MoveableObject
 */
class Fish3 extends MoveableObject {
  width = 60;
  height = 50;
  isDead = false;
  offset = { top: 15, right: 10, bottom: 15, left: 10 };
  IMAGES_SWIMMING = [
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];
  IMAGES_DEAD = [
    "Imgs/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png",
  ];

  /**
   * Creates a new Fish3 instance.
   */
  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 900 + Math.random() * 2000;
    this.y = 150 + Math.random() * 200;
    this.speed = 0.7 + Math.random() * 1.3;
    this.animateFish3();
  }

  /**
   * Animates the fish: moves it leftwards and cycles the swim animation.
   */
  animateFish3() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.x -= this.speed;
        if (this.x < -100) this.x = 2800 + Math.random() * 500;
      }
    }, 1000 / 60);
    this.animationInterval = setInterval(() => {
      if (!this.isDead) this.playAnimation(this.IMAGES_SWIMMING);
    }, 150);
  }

  /**
   * Triggers the death animation and removes the fish from the world.
   */
  die() {
    if (this.isDead) return;
    this.isDead = true;
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
    let i = 0;
    const deathInterval = setInterval(
      () =>
        i < this.IMAGES_DEAD.length
          ? (this.img = this.imageCache[this.IMAGES_DEAD[i++]])
          : (clearInterval(deathInterval), this.remove()),
      150
    );
  }

  /**
   * Removes this fish from the world's enemies array.
   */
  remove() {
    if (this.world) {
      const index = this.world.enemies.indexOf(this);
      if (index >= 0) this.world.enemies.splice(index, 1);
    }
  }
}
