// endboss.class.js
class Endboss extends MoveableObject {
  height = 500;
  width = 300;
  baseY = -80; // Ausgangsposition für y
  y = -80;
  speed = 6; // Bewegungsgeschwindigkeit
  damage = 40; // Schaden
  detectionRange = 800; // Reichweite, ab der der Endboss aktiv wird

  // Floating-Animation (Standard "Standing")
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

  // Intro-Animation (Einmaliges Auftauchen)
  IMAGES_INTRO = [
    "Imgs/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "Imgs/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "Imgs/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "Imgs/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "Imgs/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "Imgs/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "Imgs/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "Imgs/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "Imgs/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "Imgs/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  // Angriff-Animation
  IMAGES_ATTACK = [
    "Imgs/2.Enemy/3 Final Enemy/Attack/1.png",
    "Imgs/2.Enemy/3 Final Enemy/Attack/2.png",
    "Imgs/2.Enemy/3 Final Enemy/Attack/3.png",
    "Imgs/2.Enemy/3 Final Enemy/Attack/4.png",
    "Imgs/2.Enemy/3 Final Enemy/Attack/5.png",
    "Imgs/2.Enemy/3 Final Enemy/Attack/6.png",
  ];

  // Flags und Parameter
  introDone = false; // Intro-Animation vollständig
  introInProgress = false; // Intro läuft gerade
  isAttacking = false; // Angriff läuft gerade
  attackInterval = 3000; // Angriff alle 3 Sekunden

  // Für Oszillation (floating) – hier wird zusätzlich horizontal in Richtung Sharkie bewegt
  oscillationAmplitude = 10; // Pixel
  oscillationSpeed = 0.005; // Faktor für die Sinusfunktion

  constructor() {
    super().loadImage(this.IMAGES_STANDING[0]);
    // Lade alle Bilder:
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_INTRO);
    this.loadImages(this.IMAGES_ATTACK);
    // Setze Startposition (zum Beispiel weit rechts)
    this.x = 2500;
    this.y = this.baseY;
    // Setze Flags zurück – wichtig für Neustarts
    this.introDone = false;
    this.introInProgress = false;
    this.isAttacking = false;
    this.animate();
  }

  animate() {
    // Intro-Animation starten (nur einmal), wenn Sharkie in Reichweite ist
    setInterval(() => {
      if (
        !this.introDone &&
        !this.introInProgress &&
        this.world &&
        this.world.character
      ) {
        let sharkie = this.world.character;
        let distance = Math.abs(this.x - sharkie.x);
        if (distance < this.detectionRange) {
          this.playIntroAnimation();
        }
      }
    }, 100);

    // Kontinuierliche Bewegung in Richtung Sharkie (floats langsam horizontal)
    setInterval(() => {
      if (
        this.introDone &&
        !this.isAttacking &&
        this.world &&
        this.world.character
      ) {
        this.moveTowardsSharkie();
      }
    }, 1000 / 60);

    // Vertikale Oszillation (Floating) – nur, wenn Intro abgeschlossen und nicht im Angriff
    setInterval(() => {
      if (this.introDone && !this.isAttacking) {
        let t = Date.now();
        this.y =
          this.baseY +
          this.oscillationAmplitude * Math.sin(t * this.oscillationSpeed);
      }
    }, 50);

    // Angriffsphase alle 3 Sekunden, wenn Sharkie in Reichweite ist und Intro abgeschlossen
    setInterval(() => {
      if (this.introDone && this.world && this.world.character) {
        let sharkie = this.world.character;
        let distance = Math.abs(this.x - sharkie.x);
        if (distance < this.detectionRange) {
          this.playAttackAnimation();
          // Während der Angriff-Animation bewegt sich der Boss zusätzlich in Richtung Sharkie
          this.moveTowardsSharkie();
        }
      }
    }, this.attackInterval);

    // Fortlaufende "Floating"-Animation (Standard Standing), wenn nicht im Intro oder Angriff
    setInterval(() => {
      if (this.introDone && !this.isAttacking) {
        this.playAnimation(this.IMAGES_STANDING);
      }
    }, 200);
  }

  playIntroAnimation() {
    if (this.introInProgress || this.introDone) return;
    this.introInProgress = true;
    let index = 0;
    let introInterval = setInterval(() => {
      if (index < this.IMAGES_INTRO.length) {
        this.img = this.imageCache[this.IMAGES_INTRO[index]];
        index++;
      } else {
        clearInterval(introInterval);
        this.introDone = true;
        this.introInProgress = false;
        // Optional: Kurze Pause nach dem Intro, bevor der Boss angreift
        setTimeout(() => {
          this.baseY = this.y; // Nutze die aktuelle Position als Basis für die Oszillation
        }, 500);
      }
    }, 200);
  }

  playAttackAnimation() {
    if (this.isAttacking) return;
    this.isAttacking = true;
    let index = 0;
    let attackInterval = setInterval(() => {
      if (index < this.IMAGES_ATTACK.length) {
        this.img = this.imageCache[this.IMAGES_ATTACK[index]];
        index++;
      } else {
        clearInterval(attackInterval);
        this.isAttacking = false;
      }
    }, 150);
  }

  moveTowardsSharkie() {
    if (this.world && this.world.character) {
      let sharkie = this.world.character;
      let distance = Math.abs(this.x - sharkie.x);
      // Nur wenn Sharkie in Reichweite
      if (distance < this.detectionRange) {
        if (this.x > sharkie.x) {
          this.x -= this.speed / 2; // Langsamer in Richtung Sharkie
        } else if (this.x < sharkie.x) {
          this.x += this.speed / 2;
        }
      }
    }
  }

  playAnimation(images, indexName = "currentImage") {
    if (!this[indexName]) {
      this[indexName] = 0;
    }
    let index = this[indexName] % images.length;
    let path = images[index];
    if (this.imageCache[path]) {
      this.img = this.imageCache[path];
      this[indexName]++;
    }
  }
}

test;
