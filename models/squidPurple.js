/**
 * Represents a Fish2 enemy.
 * @extends MoveableObject
 */
class Fish2 extends MoveableObject {
  width = 80;
  height = 70;
  isDead = false;
  offset = { top: 25, right: 20, bottom: 25, left: 20 };
  IMAGES_SWIMMING = [
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];
  IMAGES_DEAD = [
    "Imgs/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];

  /**
   * Creates a new Fish2 enemy.
   */
  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 800 + Math.random() * 2000;
    this.y = 50 + Math.random() * 250;
    this.speed = 0.3 + Math.random() * 1;
    this.animateFish2();
  }

  /**
   * Starts the swim movement and animation loop.
   */
  animateFish2() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.x -= this.speed;
        if (this.x < -100) {
          this.x = 2800 + Math.random() * 500;
        }
      }
    }, 1000 / 60);
    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 150);
  }

  /**
   * Triggers the death animation and removes the enemy from the world.
   */
  die() {
    if (this.isDead) return;
    this.isDead = true;
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
    let i = 0;
    const deathInterval = setInterval(() => {
      if (i < this.IMAGES_DEAD.length) {
        this.img = this.imageCache[this.IMAGES_DEAD[i]];
        i++;
      } else {
        clearInterval(deathInterval);
        this.remove();
      }
    }, 150);
  }

  /**
   * Removes this enemy from the world's enemies array.
   */
  remove() {
    if (this.world) {
      const index = this.world.enemies.indexOf(this);
      if (index >= 0) {
        this.world.enemies.splice(index, 1);
      }
    }
  }
}
