class Fish3 extends MoveableObject {
  width = 60;
  height = 50;
  isDead = false;

  offset = {
    top: 15,
    right: 10,
    bottom: 15,
    left: 10,
  };

  IMAGES_SWIMMING = [
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];

  // ➡️ Eigenes Death-Animation-Array (keine Fade-Mechanik)
  IMAGES_DEAD = [
    // Trage hier alle Death-Frames für deinen gelben Jelly ein
    "Imgs/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 900 + Math.random() * 2000;
    this.y = 150 + Math.random() * 200; // Kleine, schnelle Fische schwimmen mittig
    this.speed = 0.7 + Math.random() * 1.3;

    this.animateFish3();
  }

  /**
   * Bewegung & Swim-Animation
   */
  animateFish3() {
    // Bewegung nach links
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.x -= this.speed;
        if (this.x < -100) {
          this.x = 2800 + Math.random() * 500;
        }
      }
    }, 1000 / 60);

    // Swim-Sprites
    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 150);
  }

  /**
   * Death-Animation & Entfernen aus World
   */
  die() {
    if (this.isDead) return;
    this.isDead = true;

    // Stoppe Swim-Intervals
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);

    console.log("☠️ Fish3 stirbt → Death-Animation startet");

    let i = 0;
    let deathInterval = setInterval(() => {
      if (i < this.IMAGES_DEAD.length) {
        this.img = this.imageCache[this.IMAGES_DEAD[i]];
        i++;
      } else {
        clearInterval(deathInterval);
        this.remove(); // Entfernt diesen Fisch aus der enemies-Liste
      }
    }, 150);
  }

  /**
   * Entfernt Fish3 aus der enemies-Liste in world
   */
  remove() {
    if (this.world) {
      const index = this.world.enemies.indexOf(this);
      if (index >= 0) {
        console.log("🚮 Fish3 wird aus dem Array entfernt!");
        this.world.enemies.splice(index, 1);
      }
    } else {
      console.warn("⚠️ Kein this.world – Fish3 kann nicht entfernt werden!");
    }
  }
}
