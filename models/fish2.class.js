class Fish2 extends MoveableObject {
  width = 80;
  height = 70;
  isDead = false; // Eigener Dead-Status

  offset = {
    top: 25,
    right: 20,
    bottom: 25,
    left: 20,
  };

  IMAGES_SWIMMING = [
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "Imgs/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  // Eigenes Death-Animation-Array (ohne Fade/Hochschwimmen)
  IMAGES_DEAD = [
    "Imgs/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "Imgs/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
    // Falls du mehr Frames hast, füge sie hier hinzu
  ];

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
   * Hauptbewegung & Animations-Loop für Swim
   */
  animateFish2() {
    // Bewegung nach links
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.x -= this.speed;
        if (this.x < -100) {
          this.x = 2800 + Math.random() * 500;
        }
      }
    }, 1000 / 60);

    // Schwimm-Animation
    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 150);
  }

  /**
   * Fish2 stirbt → Spielt Death-Bilder ab & verschwindet.
   */
  die() {
    if (this.isDead) return;
    this.isDead = true;

    // Stoppe Swim-Intervals
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);

    console.log("☠️ Fish2 stirbt → Death-Animation startet");

    let i = 0;
    let deathInterval = setInterval(() => {
      if (i < this.IMAGES_DEAD.length) {
        this.img = this.imageCache[this.IMAGES_DEAD[i]];
        i++;
      } else {
        clearInterval(deathInterval);
        this.remove(); // Entfernt diesen Fisch2 aus dem Spiel
      }
    }, 150);
  }

  /**
   * Entfernt Fish2 aus der enemies-Liste in world
   */
  remove() {
    if (this.world) {
      const index = this.world.enemies.indexOf(this);
      if (index >= 0) {
        console.log("🚮 Fish2 wird aus dem Array entfernt!");
        this.world.enemies.splice(index, 1);
      }
    } else {
      console.warn("⚠️ Kein this.world – Fish2 kann nicht entfernt werden!");
    }
  }
}
