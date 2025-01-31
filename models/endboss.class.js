class Endboss extends MoveableObject {
  height = 500;
  width = 300;
  y = -80;
  speed = 6; // Geschwindigkeit des Endbosses
  damage = 40; // Erhöhter Schaden
  detectionRange = 800; // Entfernung, ab der der Endboss aktiv wird

  IMAGES_STANDING = [
    "Imgs/2.Enemy/3 Final Enemy/2.floating/1.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/2.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/3.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/4.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/5.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/6.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/7.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/8.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/9.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/10.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/11.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/12.png",
    "Imgs/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_STANDING[0]);
    this.loadImages(this.IMAGES_STANDING);
    this.x = 2500; // Startpunkt weit rechts (Ende der Map)
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_STANDING);
    }, 200);

    setInterval(() => {
      this.checkForSharkie(); // Sicherstellen, dass er Sharkie immer überprüft
    }, 100);
  }

  /**
   * Überprüft, ob sich Sharkie in der Nähe befindet und startet die Bewegung.
   */
  checkForSharkie() {
    if (this.world && this.world.character) {
      let sharkie = this.world.character;
      let distance = Math.abs(this.x - sharkie.x);

      if (distance < this.detectionRange) {
        this.moveTowardsSharkie();
      }
    }
  }

  /**
   * Bewegt den Endboss langsam auf Sharkie zu, wenn er in der Nähe ist.
   */
  moveTowardsSharkie() {
    if (this.world && this.world.character) {
      let sharkie = this.world.character;
      let distance = Math.abs(this.x - sharkie.x);

      // Nur wenn Sharkie wirklich in der Nähe ist
      if (distance < this.detectionRange) {
        if (this.x > sharkie.x) {
          this.x -= this.speed; // Bewege dich nach links
        } else if (this.x < sharkie.x) {
          this.x += this.speed; // Bewege dich nach rechts
        }
      }
    }
  }
}
