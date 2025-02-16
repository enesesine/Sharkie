class Fish extends MoveableObject {
  // Mache den Fisch größer, z. B. 120×150
  width = 90;
  height = 100;

  y = Math.random() * 300;
  speed = 0.5 + Math.random() * 1.5;
  isDead = false;

  // Offset auf 0 lassen, damit die Hitbox so groß ist wie das Sprite
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

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

  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEATH);

    // Startposition:
    this.x = 800 + Math.random() * 2000;
    this.world = null;

    // Damit das Fade-Out in die() funktioniert:
    this.opacity = 1;

    this.animate();
  }

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
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 150);
  }

  /**
   * Lässt den Fisch sofort sterben und treibt nach oben.
   */
  die() {
    if (this.isDead) return; // 🔥 Verhindert mehrfachen Tod

    this.isDead = true;
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);

    console.log("☠️ Fisch stirbt → Animation & Hochschwimmen beginnt!");

    // Spiele das erste Death-Bild
    this.playAnimation(this.IMAGES_DEATH);

    let moveUpSpeed = 8;
    let moveUpInterval = setInterval(() => {
      this.y -= moveUpSpeed; // Fisch schwebt nach oben
      this.opacity -= 0.03; // Fisch wird langsam unsichtbar
      if (this.opacity <= 0) {
        clearInterval(moveUpInterval);
        this.remove();
      }
    }, 60);
  }

  remove() {
    if (this.world) {
      const index = this.world.enemies.indexOf(this);
      if (index >= 0) {
        console.log(`🚮 Fisch wird aus dem Array entfernt!`);
        this.world.enemies.splice(index, 1);
      }
    } else {
      console.warn(
        "⚠️ Kein Zugriff auf this.world – Fisch kann nicht entfernt werden!"
      );
    }
  }
}
