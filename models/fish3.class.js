class Fish3 extends Fish {
  constructor() {
    super(); // Ruft den Fish-Konstruktor auf (inkl. isDead, die(), usw.)

    // Eigene Jellyfish-Swimming-Bilder:
    this.IMAGES_SWIMMING = [
      "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
      "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
      "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
      "Imgs/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
    ];
    this.loadImages(this.IMAGES_SWIMMING);

    // Eigene Position / Geschwindigkeit:
    this.x = 900 + Math.random() * 2000;
    this.y = 150 + Math.random() * 200; // Kleine, schnelle Fische schwimmen mittig
    this.speed = 0.7 + Math.random() * 1.3;

    // Starte eigene Animation, falls du andere Bewegungen möchtest
    this.animateFish3();
  }

  /**
   * Eigene Animation (z. B. Speed, Positionsverhalten) – vererbt den Rest von Fish
   */
  animateFish3() {
    // Gleiche Bewegungslogik wie dein alter Code, nur wenn noch nicht tot
    setInterval(() => {
      if (!this.isDead) {
        this.x -= this.speed;
        if (this.x < -100) {
          this.x = 2800 + Math.random() * 500;
        }
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 150);
  }
}
