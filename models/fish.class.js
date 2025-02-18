/**
 * Represents a fish enemy that swims and dies.
 * @extends MoveableObject
 */
class Fish extends MoveableObject {
  width = 90;
  height = 100;
  y = Math.random() * 300;
  speed = 0.5 + Math.random() * 1.5;
  isDead = false;
  offset = { top: 0, bottom: 0, left: 0, right: 0 };
  IMAGES_SWIMMING = [
    "Imgs/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "Imgs/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "Imgs/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "Imgs/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "Imgs/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];
  IMAGES_DEATH = [
    "Imgs/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
  ];

  /**
   * Creates a new Fish instance.
   */
  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEATH);
    this.x = 800 + Math.random() * 2000;
    this.world = null;
    this.opacity = 1;
    this.animate();
  }

  /**
   * Starts the fish movement and swimming animation.
   */
  animate() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.x -= this.speed;
        if (this.x < -100) {
          this.x = 2800 + Math.random() * 500;
          this.y = Math.random() * 300;
        }
      }
    }, 1000 / 60);
    this.animationInterval = setInterval(() => {
      if (!this.isDead) this.playAnimation(this.IMAGES_SWIMMING);
    }, 150);
  }

  /**
   * Triggers the death animation and removes the fish.
   */
  die() {
    if (this.isDead) return;
    this.isDead = true;
    clearInterval(this.moveInterval), clearInterval(this.animationInterval);
    this.playAnimation(this.IMAGES_DEATH);
    const speed = 8,
      interval = setInterval(() => {
        (this.y -= speed), (this.opacity -= 0.03);
        if (this.opacity <= 0) {
          clearInterval(interval);
          this.remove();
        }
      }, 60);
  }

  /**
   * Removes the fish from the world's enemies array.
   */
  remove() {
    if (this.world) {
      const index = this.world.enemies.indexOf(this);
      if (index >= 0) this.world.enemies.splice(index, 1);
    }
  }
}
