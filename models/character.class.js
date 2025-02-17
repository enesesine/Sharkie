/**
 * Represents the main character (Sharkie).
 * @extends MoveableObject
 */
class Character extends MoveableObject {
  // Basic properties
  height = 220;
  width = 170;
  x = 5;
  y = 100;
  speed = 6;
  hp = 100;
  isDead = false;

  // Hurt state
  isHurt = false;
  lastDamageTime = 0;
  hurtStartTime = 0;
  hurtDuration = 1000;
  damageCooldown = 1000;
  hurtImageIndex = 0;
  currentHurtImages = null;

  // Animation image arrays
  IMAGES_STANDING = [
    "Imgs/1.Sharkie/1.IDLE/1.png",
    "Imgs/1.Sharkie/1.IDLE/2.png",
    "Imgs/1.Sharkie/1.IDLE/3.png",
    "Imgs/1.Sharkie/1.IDLE/4.png",
    "Imgs/1.Sharkie/1.IDLE/5.png",
    "Imgs/1.Sharkie/1.IDLE/6.png",
    "Imgs/1.Sharkie/1.IDLE/7.png",
    "Imgs/1.Sharkie/1.IDLE/8.png",
    "Imgs/1.Sharkie/1.IDLE/9.png",
    "Imgs/1.Sharkie/1.IDLE/10.png",
    "Imgs/1.Sharkie/1.IDLE/11.png",
    "Imgs/1.Sharkie/1.IDLE/12.png",
    "Imgs/1.Sharkie/1.IDLE/13.png",
    "Imgs/1.Sharkie/1.IDLE/14.png",
    "Imgs/1.Sharkie/1.IDLE/15.png",
    "Imgs/1.Sharkie/1.IDLE/16.png",
    "Imgs/1.Sharkie/1.IDLE/17.png",
    "Imgs/1.Sharkie/1.IDLE/18.png",
  ];
  IMAGES_STANDING_LONG = [
    "Imgs/1.Sharkie/2.Long_IDLE/i1.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i2.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i3.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i4.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i5.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i6.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i7.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i8.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i9.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i10.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i11.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i12.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i13.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i14.png",
  ];
  IMAGES_STANDING_LONG_LOOP = [
    "Imgs/1.Sharkie/2.Long_IDLE/i11.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i12.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i13.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i14.png",
  ];
  IMAGES_SWIMMING = [
    "Imgs/1.Sharkie/3.Swim/1.png",
    "Imgs/1.Sharkie/3.Swim/2.png",
    "Imgs/1.Sharkie/3.Swim/3.png",
    "Imgs/1.Sharkie/3.Swim/4.png",
    "Imgs/1.Sharkie/3.Swim/5.png",
    "Imgs/1.Sharkie/3.Swim/6.png",
  ];
  IMAGES_ATTACK_BUBBLE = [
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];
  IMAGES_ATTACK_SLAP = [
    "Imgs/1.Sharkie/4.Attack/Fin slap/1.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/2.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/3.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/4.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/5.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/6.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/7.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/8.png",
  ];
  IMAGES_HURT_POISON = [
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/4.png",
  ];
  IMAGES_HURT_SHOCK = [
    "Imgs/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "Imgs/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "Imgs/1.Sharkie/5.Hurt/2.Electric shock/3.png",
  ];
  DEAD_BY_POISON = [
    "Imgs/1.Sharkie/6.dead/1.Poisoned/1.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/2.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/3.png",
  ];
  DEAD_BY_SHOCK = [
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/1.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/2.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/3.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/4.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/5.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/6.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/7.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/8.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/9.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/10.png",
  ];
  DEATH_IMAGES = [
    "Imgs/1.Sharkie/6.dead/1.Poisoned/1.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/2.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/3.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/4.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/5.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/6.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/7.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/8.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/9.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/10.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/11.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];
  IMAGES_ATTACK_POISONED_BUBBLE = [
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png",
  ];

  // Attack states
  isBubbleAttacking = false;
  bubbleAttackIndex = 0;
  isPoisonBubbleAttacking = false;
  poisonBubbleAttackIndex = 0;

  // Animation states
  world;
  swimImageIndex = 0;
  idleImageIndex = 0;
  idleLongIntroIndex = 0;
  idleLongLoopIndex = 0;
  longIdleIntroDone = false;
  attackSlapIndex = 0;
  isAttacking = false;
  lastMovementTime = 0;
  lastBubbleTime = 0;
  bubbleCooldown = 500;
  deathImageIndex = 0;

  // Offsets
  bubbleSpawnOffsetX = 140;
  bubbleSpawnOffsetY = 140;

  // Sounds
  fishSwimmingSound = new Audio("Audio/fishSwimming.ogg");
  bubblePopSound = new Audio("Audio/Bubble_Pop_Attack.mp3");
  coinPickUpSound = new Audio("Audio/Coin_PickUp.ogg");
  poisonBottleSound = new Audio("Audio/Poisoned_Bottle_Sound.ogg");

  swimSoundInterval = null;
  wasPoisonKeyPressed = false;

  /**
   * Creates a new Character instance.
   */
  constructor() {
    super().loadImage("Imgs/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_STANDING_LONG);
    this.loadImages(this.IMAGES_STANDING_LONG_LOOP);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_ATTACK_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_SLAP);
    this.loadImages(this.IMAGES_HURT_POISON);
    this.loadImages(this.IMAGES_HURT_SHOCK);
    this.loadImages(this.DEAD_BY_POISON);
    this.loadImages(this.DEAD_BY_SHOCK);
    this.loadImages(this.DEATH_IMAGES);
    this.loadImages(this.IMAGES_ATTACK_POISONED_BUBBLE);
    this.x = 5;
    this.spawnX = this.x;
    this.lastMovementTime = performance.now();
    // Neuer Sound: jedes Mal wenn Sharkie Schaden bekommt, soll dieser Sound abgespielt werden.
    this.electricitySound = new Audio("Audio/electricity-sound.mp3");
    this.swimSoundInterval = setGameInterval(() => {
      const kb = this.world ? this.world.keyboard : null;
      if (kb && (kb.LEFT || kb.RIGHT || kb.UP || kb.DOWN))
        this.playFishSwimmingSound();
      else this.stopFishSwimmingSound();
    }, 100);
  }

  /**
   * Starts the main animation loop.
   */
  animate() {
    if (this.isDead) return;
    this.animateHorizontalMovement();
    this.animateVerticalMovement();
    this.animateSwimming();
    this.animateIdle();
    this.animateAttackSlap();
    this.animateAttackBubble();
    this.animateAttackPoisonedBubble();
    this.animateHurt();
  }

  /**
   * Animates horizontal movement.
   */
  animateHorizontalMovement() {
    setGameInterval(() => {
      if (this.isDead) return;
      const kb = this.world.keyboard;
      let moved = false;
      if (kb.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        moved = true;
      }
      if (kb.LEFT && this.x > this.spawnX) {
        this.x -= this.speed;
        this.otherDirection = true;
        moved = true;
      }
      if (moved) {
        this.lastMovementTime = performance.now();
        this.resetLongIdle();
      }
      this.world.camera_x = -this.x + 5;
    }, 1000 / 60);
  }

  /**
   * Animates vertical movement.
   */
  animateVerticalMovement() {
    setGameInterval(() => {
      if (this.isDead) return;
      const kb = this.world.keyboard;
      let moved = false;
      if (kb.DOWN && this.y < 270) {
        this.y += this.speed;
        moved = true;
      }
      if (kb.UP && this.y > -50) {
        this.y -= this.speed;
        moved = true;
      }
      if (moved) {
        this.lastMovementTime = performance.now();
        this.resetLongIdle();
      }
    }, 1000 / 60);
  }

  /**
   * Plays the swimming animation.
   */
  animateSwimming() {
    setGameInterval(() => {
      if (this.isDead) return;
      const kb = this.world.keyboard;
      if (kb.LEFT || kb.RIGHT || kb.UP || kb.DOWN)
        this.playAnimation(this.IMAGES_SWIMMING, "swimImageIndex");
    }, 150);
  }

  /**
   * Plays idle animations.
   */
  animateIdle() {
    setGameInterval(() => {
      if (this.isDead || this.isHurt) return;
      if (
        this.isAttacking ||
        this.isBubbleAttacking ||
        this.isPoisonBubbleAttacking
      ) {
        this.lastMovementTime = performance.now();
        return;
      }
      const kb = this.world.keyboard;
      if (kb.LEFT || kb.RIGHT || kb.UP || kb.DOWN) return;
      const idleTime = performance.now() - this.lastMovementTime;
      if (idleTime < 5000) {
        this.playAnimation(this.IMAGES_STANDING, "idleImageIndex");
      } else if (!this.longIdleIntroDone) {
        this.playLongIdleIntro();
      } else {
        this.playLongIdleLoop();
      }
    }, 150);
  }

  /**
   * Handles the slap attack animation.
   */
  animateAttackSlap() {
    setGameInterval(() => {
      if (this.isDead) return;
      if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACK_SLAP, "attackSlapIndex");
        if (this.attackSlapIndex >= this.IMAGES_ATTACK_SLAP.length) {
          this.isAttacking = false;
          this.attackSlapIndex = 0;
        }
      } else if (this.world.keyboard.SPACE) {
        this.isAttacking = true;
        this.attackSlapIndex = 0;
        this.resetAFKTimer();
      }
    }, 60);
  }

  /**
   * Handles the bubble attack triggered by the D key.
   */
  animateAttackBubble() {
    setGameInterval(() => {
      if (this.isDead) return;
      const now = Date.now();
      if (
        this.world.keyboard.D &&
        now - this.lastBubbleTime >= this.bubbleCooldown &&
        !this.isBubbleAttacking
      ) {
        this.isBubbleAttacking = true;
        this.bubbleAttackIndex = 0;
        this.resetAFKTimer();
        this.shootBubbleAttack();
        this.lastBubbleTime = now;
      }
    }, 150);
  }

  /**
   * Handles the poisoned bubble attack triggered by the C key.
   */
  animateAttackPoisonedBubble() {
    setGameInterval(() => {
      if (this.isDead) return;
      if (this.world.keyboard.C && !this.wasPoisonKeyPressed) {
        this.wasPoisonKeyPressed = true;
        if (
          this.world.collectedPoisonBottles > 0 &&
          !this.isPoisonBubbleAttacking
        ) {
          this.isPoisonBubbleAttacking = true;
          this.poisonBubbleAttackIndex = 0;
          this.resetAFKTimer();
        }
      } else if (!this.world.keyboard.C) {
        this.wasPoisonKeyPressed = false;
      }
      if (this.isPoisonBubbleAttacking) {
        this.playAnimation(
          this.IMAGES_ATTACK_POISONED_BUBBLE,
          "poisonBubbleAttackIndex"
        );
        if (
          this.poisonBubbleAttackIndex >=
          this.IMAGES_ATTACK_POISONED_BUBBLE.length
        ) {
          this.isPoisonBubbleAttacking = false;
          if (Date.now() - this.lastBubbleTime >= this.bubbleCooldown) {
            this.bubblePopSound.play().catch(() => {});
            this.world.spawnPoisonedBubble(this);
            this.lastBubbleTime = Date.now();
            this.world.collectedPoisonBottles--;
            this.world.poisonStatusBar.setPercentage(
              this.world.collectedPoisonBottles * 20
            );
          }
        }
      }
    }, 150);
  }

  /**
   * Plays the hurt animation if the character is hurt.
   */
  animateHurt() {
    setGameInterval(() => {
      if (this.isDead) return;
      if (this.isHurt) {
        this.playHurtAnimation();
        if (Date.now() - this.hurtStartTime >= this.hurtDuration) {
          this.isHurt = false;
          this.hurtImageIndex = 0;
          this.currentHurtImages = null;
        }
      }
    }, 150);
  }

  /**
   * Plays the long idle intro animation.
   */
  playLongIdleIntro() {
    const index = this.idleLongIntroIndex % this.IMAGES_STANDING_LONG.length;
    const path = this.IMAGES_STANDING_LONG[index];
    if (!this.imageCache[path]) return;
    this.img = this.imageCache[path];
    this.idleLongIntroIndex++;
    if (this.idleLongIntroIndex >= this.IMAGES_STANDING_LONG.length) {
      this.longIdleIntroDone = true;
      this.idleLongLoopIndex = 0;
    }
  }

  /**
   * Plays the long idle loop animation.
   */
  playLongIdleLoop() {
    const index =
      this.idleLongLoopIndex % this.IMAGES_STANDING_LONG_LOOP.length;
    const path = this.IMAGES_STANDING_LONG_LOOP[index];
    if (!this.imageCache[path]) return;
    this.img = this.imageCache[path];
    this.idleLongLoopIndex++;
  }

  /**
   * Resets the idle animation timers.
   */
  resetLongIdle() {
    this.longIdleIntroDone = false;
    this.idleLongIntroIndex = 0;
    this.idleLongLoopIndex = 0;
    this.lastMovementTime = performance.now();
  }

  /**
   * Resets the AFK timer.
   */
  resetAFKTimer() {
    this.resetLongIdle();
  }

  /**
   * Plays an animation sequence.
   * @param {string[]} images - Array of image paths.
   * @param {string} [indexName="currentImage"] - Property name for frame tracking.
   */
  playAnimation(images, indexName = "currentImage") {
    if (this.isHurt || this.isDead) return;
    if (!this[indexName]) this[indexName] = 0;
    const index = this[indexName] % images.length;
    const path = images[index];
    if (!this.imageCache[path]) return;
    this.img = this.imageCache[path];
    this[indexName]++;
  }

  /**
   * Plays the hurt animation sequence.
   */
  playHurtAnimation() {
    const images = this.currentHurtImages || this.IMAGES_HURT_SHOCK;
    if (this.hurtImageIndex < images.length) {
      const path = images[this.hurtImageIndex];
      if (!this.imageCache[path]) return;
      this.img = this.imageCache[path];
      this.hurtImageIndex++;
    } else {
      this.isHurt = false;
      this.hurtImageIndex = 0;
      this.currentHurtImages = null;
    }
  }

  /**
   * Reduces HP by a given amount and triggers death if HP reaches 0.
   * @param {number} amount - Damage amount.
   */
  takeDamage(amount) {
    if (this.isDead) return;
    this.hp -= amount;
    if (this.hp < 0) this.hp = 0;
    this.world.statusBar.setPercentage(this.hp);
    if (this.hp === 0 && !this.isDead) this.die();
  }

  /**
   * Processes collision damage and plays the electricity sound.
   * @param {number} damage - Damage amount.
   */
  hit(damage) {
    const now = Date.now();
    if (this.hp <= 0) return;
    if (now - this.lastDamageTime >= this.damageCooldown) {
      this.lastDamageTime = now;
      this.hp -= damage;
      if (this.hp < 0) this.hp = 0;
      this.world.statusBar.setPercentage(this.hp);
      // Spiele den Elektrizitätssound bei Schaden
      this.electricitySound.play().catch(() => {});
    }
    if (!this.isHurt) {
      this.isHurt = true;
      this.hurtStartTime = now;
      this.hurtImageIndex = 0;
      const hurtInterval = setGameInterval(() => {
        this.playAnimation(this.IMAGES_HURT_SHOCK, "hurtImageIndex");
      }, 150);
      setTimeout(() => {
        clearInterval(hurtInterval);
        this.isHurt = false;
      }, this.hurtDuration);
    }
    if (this.hp <= 0) this.die();
  }

  /**
   * Fires a bubble attack.
   */
  fireBubble() {
    const currentTime = Date.now();
    if (currentTime - this.lastBubbleTime >= this.bubbleCooldown) {
      this.world.spawnBubble(this);
      this.lastBubbleTime = currentTime;
    }
  }

  /**
   * Fires a poisoned bubble attack.
   */
  firePoisonedBubble() {
    const currentTime = Date.now();
    if (currentTime - this.lastBubbleTime >= this.bubbleCooldown) {
      this.world.spawnPoisonedBubble(this);
      this.lastBubbleTime = currentTime;
      this.world.collectedPoisonBottles--;
      this.world.poisonStatusBar.setPercentage(
        this.world.collectedPoisonBottles * 20
      );
    }
  }

  /**
   * Checks if the slap hitbox collides with an enemy.
   * @param {Object} enemy - The enemy object.
   * @returns {boolean} True if colliding.
   */
  isSlapColliding(enemy) {
    const attackWidth = 30;
    const attackHeight = this.height - 40;
    const attackX = this.otherDirection
      ? this.x - attackWidth
      : this.x + this.width;
    const attackY = this.y + 20;
    const attackBox = {
      x: attackX,
      y: attackY,
      width: attackWidth,
      height: attackHeight,
    };
    const enemyBox = {
      x: enemy.x,
      y: enemy.y,
      width: enemy.width,
      height: enemy.height,
    };
    return (
      attackBox.x < enemyBox.x + enemyBox.width &&
      attackBox.x + attackBox.width > enemyBox.x &&
      attackBox.y < enemyBox.y + enemyBox.height &&
      attackBox.y + attackBox.height > enemyBox.y
    );
  }

  /**
   * Plays the fish swimming sound.
   */
  playFishSwimmingSound() {
    if (this.fishSwimmingSound.paused) {
      this.fishSwimmingSound.play().catch(() => {});
    }
  }

  /**
   * Stops the fish swimming sound.
   */
  stopFishSwimmingSound() {
    if (!this.fishSwimmingSound.paused) {
      this.fishSwimmingSound.pause();
      this.fishSwimmingSound.currentTime = 0;
    }
  }

  /**
   * Triggers the death sequence.
   */
  die() {
    this.isDead = true;
    this.deathImageIndex = 0;
    const deathInterval = setGameInterval(() => {
      if (this.deathImageIndex < this.DEATH_IMAGES.length) {
        this.img = this.imageCache[this.DEATH_IMAGES[this.deathImageIndex]];
        this.deathImageIndex++;
      } else {
        clearInterval(deathInterval);
        this.img =
          this.imageCache[this.DEATH_IMAGES[this.DEATH_IMAGES.length - 1]];
        if (this.world) {
          this.world.gameOver = true;
        }
      }
    }, 150);
  }

  /**
   * Executes the bubble attack animation and spawns a bubble.
   */
  shootBubbleAttack() {
    let i = 0;
    const totalFrames = this.IMAGES_ATTACK_BUBBLE.length;
    const intervalId = setGameInterval(() => {
      if (i < totalFrames) {
        this.playAnimation(this.IMAGES_ATTACK_BUBBLE, "bubbleAttackIndex");
        i++;
      } else {
        clearInterval(intervalId);
        this.loadImage(this.IMAGES_SWIMMING[0]);
        this.world.spawnBubble(this);
        this.bubblePopSound.play().catch(() => {});
        this.isBubbleAttacking = false;
      }
    }, 50);
  }
}
