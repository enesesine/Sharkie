/**
 * Represents the Endboss enemy.
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {
  height = 500;
  width = 300;
  baseY = -80;
  y = -80;
  speed = 10;
  damage = 40;
  detectionRange = 800;
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
  IMAGES_ATTACK = [
    "Imgs/2.Enemy/3 Final Enemy/Attack/1.png",
    "Imgs/2.Enemy/3 Final Enemy/Attack/2.png",
    "Imgs/2.Enemy/3 Final Enemy/Attack/3.png",
    "Imgs/2.Enemy/3 Final Enemy/Attack/4.png",
    "Imgs/2.Enemy/3 Final Enemy/Attack/5.png",
    "Imgs/2.Enemy/3 Final Enemy/Attack/6.png",
  ];
  IMAGES_HURT = [
    "Imgs/2.Enemy/3 Final Enemy/Hurt/1.png",
    "Imgs/2.Enemy/3 Final Enemy/Hurt/2.png",
    "Imgs/2.Enemy/3 Final Enemy/Hurt/3.png",
    "Imgs/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];
  IMAGES_DEAD = [
    "Imgs/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "Imgs/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "Imgs/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "Imgs/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "Imgs/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];
  hp = 10;
  isDead = false;
  isBeingHit = false;
  introDone = false;
  introInProgress = false;
  isAttacking = false;
  attackInterval = 3000;
  oscillationAmplitude = 10;
  oscillationSpeed = 0.005;

  /**
   * Creates a new Endboss instance.
   */
  constructor() {
    super().loadImage(this.IMAGES_STANDING[0]);
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_INTRO);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.y = this.baseY;
    this.introDone = false;
    this.introInProgress = false;
    this.isAttacking = false;
    this.isBeingHit = false;
    this.animate();
  }

  /**
   * Starts all animation cycles of the Endboss.
   */
  animate() {
    this.startIntroCheck();
    this.startMovement();
    this.startVerticalOscillation();
    this.startAttackCycle();
    this.startFloatingAnimation();
  }

  /**
   * Checks if the intro animation should be played.
   */
  startIntroCheck() {
    setInterval(() => {
      if (
        !this.introDone &&
        !this.introInProgress &&
        this.world &&
        this.world.character &&
        !this.isDead &&
        !this.isBeingHit &&
        Math.abs(this.x - this.world.character.x) < this.detectionRange
      ) {
        this.playIntroAnimation();
      }
    }, 100);
  }

  /**
   * Moves the Endboss horizontally toward the character.
   */
  startMovement() {
    setInterval(() => {
      if (
        this.introDone &&
        !this.isAttacking &&
        !this.isBeingHit &&
        this.world &&
        this.world.character &&
        !this.isDead
      ) {
        this.moveTowardsCharacter();
      }
    }, 1000 / 60);
  }

  /**
   * Applies vertical oscillation when conditions allow.
   */
  startVerticalOscillation() {
    setInterval(() => {
      if (
        this.introDone &&
        !this.isAttacking &&
        !this.isDead &&
        !this.isBeingHit
      ) {
        const t = Date.now();
        this.y =
          this.baseY +
          this.oscillationAmplitude * Math.sin(t * this.oscillationSpeed);
      }
    }, 50);
  }

  /**
   * Initiates the attack cycle when the character is in range.
   */
  startAttackCycle() {
    setInterval(() => {
      if (
        this.introDone &&
        this.world &&
        this.world.character &&
        !this.isDead &&
        !this.isBeingHit &&
        Math.abs(this.x - this.world.character.x) < this.detectionRange
      ) {
        this.playAttackAnimation();
        this.moveTowardsCharacter();
      }
    }, this.attackInterval);
  }

  /**
   * Continuously plays the standing (floating) animation.
   */
  startFloatingAnimation() {
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

  /**
   * Plays the intro animation.
   */
  playIntroAnimation() {
    if (this.introInProgress || this.introDone) return;
    this.introInProgress = true;
    let index = 0;
    const introInterval = setInterval(() => {
      if (index < this.IMAGES_INTRO.length) {
        this.img = this.imageCache[this.IMAGES_INTRO[index]];
        index++;
      } else {
        clearInterval(introInterval);
        this.introDone = true;
        this.introInProgress = false;
        setTimeout(() => {
          this.baseY = this.y;
        }, 500);
      }
    }, 200);
  }

  /**
   * Plays the attack animation.
   */
  playAttackAnimation() {
    if (this.isAttacking || this.isBeingHit) return;
    this.isAttacking = true;
    let index = 0;
    const attackInterval = setInterval(() => {
      if (index < this.IMAGES_ATTACK.length) {
        this.img = this.imageCache[this.IMAGES_ATTACK[index]];
        index++;
      } else {
        clearInterval(attackInterval);
        this.isAttacking = false;
      }
    }, 150);
  }

  /**
   * Moves the Endboss toward the character horizontally.
   */
  moveTowardsCharacter() {
    if (this.world && this.world.character) {
      const sharkie = this.world.character;
      const distance = Math.abs(this.x - sharkie.x);
      if (distance < this.detectionRange) {
        this.x += this.x < sharkie.x ? this.speed / 2 : -this.speed / 2;
      }
    }
  }

  /**
   * Plays an animation sequence.
   * @param {string[]} images - Array of image paths.
   * @param {string} [indexName="currentImage"] - The property used for tracking the current frame.
   */
  playAnimation(images, indexName = "currentImage") {
    if (!this[indexName]) this[indexName] = 0;
    const index = this[indexName] % images.length;
    const path = images[index];
    if (this.imageCache[path]) {
      this.img = this.imageCache[path];
      this[indexName]++;
    }
  }

  /**
   * Processes damage received by the Endboss.
   */
  receiveDamage() {
    if (this.isDead) return;
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

  /**
   * Plays the hurt animation.
   */
  playHurtAnimation() {
    let i = 0;
    const hurtInterval = setInterval(() => {
      if (i < this.IMAGES_HURT.length) {
        this.img = this.imageCache[this.IMAGES_HURT[i]];
        i++;
      } else {
        clearInterval(hurtInterval);
        this.isBeingHit = false;
      }
    }, 150);
  }

  /**
   * Plays the death animation.
   */
  playDeathAnimation() {
    let i = 0;
    const deathInterval = setInterval(() => {
      if (i < this.IMAGES_DEAD.length) {
        this.img = this.imageCache[this.IMAGES_DEAD[i]];
        i++;
      } else {
        clearInterval(deathInterval);
      }
    }, 200);
  }
}
