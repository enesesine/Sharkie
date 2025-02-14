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

  // Hurt-Animation (bei Treffer)
  IMAGES_HURT = [
    "Imgs/2.Enemy/3 Final Enemy/Hurt/1.png",
    "Imgs/2.Enemy/3 Final Enemy/Hurt/2.png",
    "Imgs/2.Enemy/3 Final Enemy/Hurt/3.png",
    "Imgs/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];

  // Death-Animation (bei Tod)
  IMAGES_DEAD = [
    "Imgs/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "Imgs/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "Imgs/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "Imgs/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "Imgs/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  // Eigenschaften für den Lebensstatus:
  hp = 10;
  isDead = false;
  isBeingHit = false; // Flag, das anzeigt, dass gerade die Hurt-Animation läuft

  // Flags und Parameter für andere Animationen:
  introDone = false; // Intro-Animation vollständig
  introInProgress = false; // Intro läuft gerade
  isAttacking = false; // Angriff läuft gerade
  attackInterval = 3000; // Angriff alle 3 Sekunden

  // Für Oszillation (Floating) – hier zusätzlich horizontal in Richtung Sharkie bewegt
  oscillationAmplitude = 10; // Pixel
  oscillationSpeed = 0.005; // Faktor für die Sinusfunktion

  constructor() {
    super().loadImage(this.IMAGES_STANDING[0]);
    // Lade alle Bilder:
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_INTRO);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    // Setze Startposition (zum Beispiel weit rechts)
    this.x = 2500;
    this.y = this.baseY;
    // Setze Flags zurück – wichtig für Neustarts
    this.introDone = false;
    this.introInProgress = false;
    this.isAttacking = false;
    this.isBeingHit = false;
    this.animate();
  }

  animate() {
    // Intro-Animation starten (nur einmal), wenn Sharkie in Reichweite ist
    setInterval(() => {
      if (
        !this.introDone &&
        !this.introInProgress &&
        this.world &&
        this.world.character &&
        !this.isDead &&
        !this.isBeingHit
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
        !this.isBeingHit &&
        this.world &&
        this.world.character &&
        !this.isDead
      ) {
        this.moveTowardsSharkie();
      }
    }, 1000 / 60);

    // Vertikale Oszillation (Floating) – nur, wenn Intro abgeschlossen und nicht im Angriff
    setInterval(() => {
      if (
        this.introDone &&
        !this.isAttacking &&
        !this.isDead &&
        !this.isBeingHit
      ) {
        let t = Date.now();
        this.y =
          this.baseY +
          this.oscillationAmplitude * Math.sin(t * this.oscillationSpeed);
      }
    }, 50);

    // Angriffsphase alle 3 Sekunden, wenn Sharkie in Reichweite ist und Intro abgeschlossen
    setInterval(() => {
      if (
        this.introDone &&
        this.world &&
        this.world.character &&
        !this.isDead &&
        !this.isBeingHit
      ) {
        let sharkie = this.world.character;
        let distance = Math.abs(this.x - sharkie.x);
        if (distance < this.detectionRange) {
          this.playAttackAnimation();
          this.moveTowardsSharkie();
        }
      }
    }, this.attackInterval);

    // Fortlaufende "Floating"-Animation (Standard Standing), wenn nicht im Intro oder Angriff
    setInterval(() => {
      if (
        this.introDone &&
        !this.isAttacking &&
        !this.isDead &&
        !this.isBeingHit
      ) {
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
          this.baseY = this.y; // Aktuelle Position als Basis für die Oszillation
        }, 500);
      }
    }, 200);
  }

  playAttackAnimation() {
    if (this.isAttacking || this.isBeingHit) return;
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
      if (distance < this.detectionRange) {
        if (this.x > sharkie.x) {
          this.x -= this.speed / 2;
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

  // Wird aufgerufen, wenn der Endboss getroffen wird.
  receiveDamage() {
    if (this.isDead) return;
    // Setze den Zustand, damit nur die Hurt-Animation abgespielt wird.
    this.isBeingHit = true;
    this.hp--;
    if (this.hp > 0) {
      this.playHurtAnimation();
    } else {
      this.playDeathAnimation();
      this.isDead = true;
      if (this.world && typeof this.world.displayWinScreen === "function") {
        setTimeout(() => {
          this.world.displayWinScreen();
        }, this.IMAGES_DEAD.length * 200);
      }
    }
  }

  playHurtAnimation() {
    let i = 0;
    let hurtInterval = setInterval(() => {
      if (i < this.IMAGES_HURT.length) {
        this.img = this.imageCache[this.IMAGES_HURT[i]];
        i++;
      } else {
        clearInterval(hurtInterval);
        // Nach der Hurt-Animation wird der Zustand zurückgesetzt,
        // sodass normale Animationen (Floating etc.) wieder übernommen werden.
        this.isBeingHit = false;
      }
    }, 150);
  }

  playDeathAnimation() {
    let i = 0;
    let deathInterval = setInterval(() => {
      if (i < this.IMAGES_DEAD.length) {
        this.img = this.imageCache[this.IMAGES_DEAD[i]];
        i++;
      } else {
        clearInterval(deathInterval);
      }
    }, 200);
  }
}
