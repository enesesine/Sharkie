// character.class.js
class Character extends MoveableObject {
  // Grundlegende Eigenschaften
  height = 220;
  width = 170;
  y = 100;
  x = 5;
  speed = 10;

  // HP und Tot-Status
  hp = 100;
  isDead = false;

  // Hurt-Variablen
  isHurt = false;
  lastDamageTime = 0;
  hurtStartTime = 0;
  hurtDuration = 1000;
  damageCooldown = 1000; // 1 Sekunde Cooldown zwischen Treffern
  hurtImageIndex = 0;
  currentHurtImages = null;

  // Image-Arrays
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

  // Neue Attack-Animation für den "Poisoned Bubble" Schuss (For Whale)
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

  // Neue Zustände für Angriff-Aktionen
  isBubbleAttacking = false;
  bubbleAttackIndex = 0;
  isPoisonBubbleAttacking = false;
  poisonBubbleAttackIndex = 0;

  // Animations- und Statusvariablen
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

  // Death-Animation-Index
  deathImageIndex = 0;

  // Bubble-Spawn Offsets (fester Mund-Anker)
  bubbleSpawnOffsetX = 140;
  bubbleSpawnOffsetY = 130;

  // Soundeffekte
  fishSwimmingSound = new Audio("Audio/fishSwimming.ogg");
  bubblePopSound = new Audio("Audio/Bubble_Pop_Attack.mp3");
  coinPickUpSound = new Audio("Audio/Coin_PickUp.ogg");
  poisonBottleSound = new Audio("Audio/Poisoned_Bottle_Sound.ogg");

  // Konstruktor
  constructor() {
    super().loadImage("Imgs/1.Sharkie/1.IDLE/1.png");

    // Lade alle Image-Arrays
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

    this.lastMovementTime = performance.now();

    // Check ob eine Bewegungstaste aktiv ist, um Fish-Sound an/auszuschalten
    setInterval(() => {
      const kb = this.world ? this.world.keyboard : null;
      if (kb && (kb.LEFT || kb.RIGHT || kb.UP || kb.DOWN)) {
        this.playFishSwimmingSound();
      } else {
        this.stopFishSwimmingSound();
      }
    }, 100);
  }

  /**
   * Hauptanimation
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

  animateHorizontalMovement() {
    setInterval(() => {
      if (this.isDead) return;
      const keyboard = this.world.keyboard;
      let moved = false;
      if (keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        moved = true;
      }
      if (keyboard.LEFT && this.x > -300) {
        this.x -= this.speed;
        this.otherDirection = true;
        moved = true;
      }
      if (moved) {
        this.lastMovementTime = performance.now();
        this.resetLongIdle();
      }
      // Kamera
      this.world.camera_x = -this.x + 5;
    }, 1000 / 60);
  }

  animateVerticalMovement() {
    setInterval(() => {
      if (this.isDead) return;
      const keyboard = this.world.keyboard;
      let moved = false;
      if (keyboard.DOWN && this.y < 270) {
        this.y += this.speed;
        moved = true;
      }
      if (keyboard.UP && this.y > -50) {
        this.y -= this.speed;
        moved = true;
      }
      if (moved) {
        this.lastMovementTime = performance.now();
        this.resetLongIdle();
      }
    }, 1000 / 60);
  }

  animateSwimming() {
    setInterval(() => {
      if (this.isDead) return;
      const keyboard = this.world.keyboard;
      if (keyboard.LEFT || keyboard.RIGHT || keyboard.UP || keyboard.DOWN) {
        this.playAnimation(this.IMAGES_SWIMMING, "swimImageIndex");
      }
    }, 150);
  }

  animateIdle() {
    setInterval(() => {
      if (this.isDead) return;
      if (this.isHurt) return; //  <== NEU!  Keine Idle, wenn er „hurt“ ist

      const keyboard = this.world.keyboard;
      if (keyboard.LEFT || keyboard.RIGHT || keyboard.UP || keyboard.DOWN)
        return;

      let now = performance.now();
      let idleTime = now - this.lastMovementTime;
      if (idleTime < 5000) {
        this.playAnimation(this.IMAGES_STANDING, "idleImageIndex");
        return;
      }
      if (!this.longIdleIntroDone) {
        this.playLongIdleIntro();
      } else {
        this.playLongIdleLoop();
      }
    }, 150);
  }

  animateAttackSlap() {
    setInterval(() => {
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
    }, 150);
  }

  animateAttackBubble() {
    setInterval(() => {
      if (this.isDead) return;
      const currentTime = Date.now();
      if (
        this.world.keyboard.D &&
        currentTime - this.lastBubbleTime >= this.bubbleCooldown &&
        !this.isBubbleAttacking
      ) {
        this.isBubbleAttacking = true;
        this.bubbleAttackIndex = 0;
        this.resetAFKTimer();
        this.shootBubbleAttack();
        this.lastBubbleTime = currentTime;
      }
    }, 150);
  }

  animateAttackPoisonedBubble() {
    setInterval(() => {
      if (this.isDead) return;
      if (this.world.keyboard.C) {
        if (
          this.world.collectedPoisonBottles > 0 &&
          !this.isPoisonBubbleAttacking
        ) {
          this.isPoisonBubbleAttacking = true;
          this.poisonBubbleAttackIndex = 0;
          this.resetAFKTimer();
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
              this.bubblePopSound.play().catch((err) => console.error(err));
              this.world.spawnPoisonedBubble(this);
              this.lastBubbleTime = Date.now();
              this.world.collectedPoisonBottles--;
              this.world.poisonStatusBar.setPercentage(
                this.world.collectedPoisonBottles * 20
              );
            }
          }
        }
      }
    }, 150);
  }

  animateHurt() {
    setInterval(() => {
      if (this.isDead) return;
      if (this.isHurt) {
        this.playHurtAnimation();
        const currentTime = Date.now();
        if (currentTime - this.hurtStartTime >= this.hurtDuration) {
          this.isHurt = false;
          this.hurtImageIndex = 0;
          this.currentHurtImages = null;
        }
      }
    }, 150);
  }

  playLongIdleIntro() {
    let index = this.idleLongIntroIndex % this.IMAGES_STANDING_LONG.length;
    let path = this.IMAGES_STANDING_LONG[index];
    if (!this.imageCache[path]) {
      console.warn("Bildpfad nicht im Cache (Intro):", path);
      return;
    }
    this.img = this.imageCache[path];
    this.idleLongIntroIndex++;
    if (this.idleLongIntroIndex >= this.IMAGES_STANDING_LONG.length) {
      this.longIdleIntroDone = true;
      this.idleLongLoopIndex = 0;
    }
  }

  playLongIdleLoop() {
    let index = this.idleLongLoopIndex % this.IMAGES_STANDING_LONG_LOOP.length;
    let path = this.IMAGES_STANDING_LONG_LOOP[index];
    if (!this.imageCache[path]) {
      console.warn("Bildpfad nicht im Cache (Loop):", path);
      return;
    }
    this.img = this.imageCache[path];
    this.idleLongLoopIndex++;
  }

  resetLongIdle() {
    this.longIdleIntroDone = false;
    this.idleLongIntroIndex = 0;
    this.idleLongLoopIndex = 0;
    this.lastMovementTime = performance.now();
  }

  resetAFKTimer() {
    this.resetLongIdle();
  }

  playAnimation(images, indexName = "currentImage") {
    // Verhindert Animation, wenn Sharkie gerade "hurt" oder "dead" ist
    if (this.isHurt || this.isDead) return;

    if (!this[indexName]) {
      this[indexName] = 0;
    }
    let index = this[indexName] % images.length;
    let path = images[index];
    if (!this.imageCache[path]) {
      console.warn("Bildpfad nicht im Cache:", path);
      return;
    }
    this.img = this.imageCache[path];
    this[indexName]++;
  }

  playHurtAnimation() {
    const images = this.currentHurtImages || this.IMAGES_HURT_SHOCK;
    if (this.hurtImageIndex < images.length) {
      let path = images[this.hurtImageIndex];
      if (!this.imageCache[path]) {
        console.warn("Bildpfad nicht im Cache (Hurt):", path);
        return;
      }
      this.img = this.imageCache[path];
      this.hurtImageIndex++;
    } else {
      this.isHurt = false;
      this.hurtImageIndex = 0;
      this.currentHurtImages = null;
    }
  }

  takeDamage(amount) {
    if (this.isDead) return;
    this.hp -= amount;
    if (this.hp < 0) this.hp = 0;
    this.world.statusBar.setPercentage(this.hp);
    if (this.hp === 0 && !this.isDead) {
      this.die();
    }
  }

  /**
   * Sharkie nimmt Schaden
   */
  hit(damage) {
    let now = Date.now();
    if (
      this.hp <= 0 ||
      this.isHurt ||
      now - this.lastDamageTime < this.damageCooldown
    ) {
      return;
    }

    // Sobald Schaden kommt: Idle-Logik zurücksetzen
    this.lastMovementTime = performance.now();
    if (this.resetLongIdle) {
      this.resetLongIdle();
    }

    this.lastDamageTime = now; // cooldown
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;

    this.isHurt = true;
    this.hurtStartTime = now;
    this.world.statusBar.setPercentage(this.hp);

    console.log(`⚠️ Sharkie getroffen! Schaden: ${damage} | HP: ${this.hp}`);

    this.playAnimation(this.IMAGES_HURT);
    console.log("🎬 Damage-Animation gestartet!");

    setTimeout(() => {
      this.isHurt = false;
      console.log("✅ Sharkie ist wieder normal.");
    }, this.hurtDuration);

    if (this.hp <= 0) {
      this.die();
    }
  }

  fireBubble() {
    const currentTime = Date.now();
    if (currentTime - this.lastBubbleTime >= this.bubbleCooldown) {
      this.world.spawnBubble(this);
      this.lastBubbleTime = currentTime;
    }
  }

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

  /******************************************
   * START / STOP FISHSWIMMINGSOUND
   ******************************************/

  /**
   * Spielt den Schwimm-Sound, falls nicht schon aktiv.
   */
  playFishSwimmingSound() {
    if (this.fishSwimmingSound.paused) {
      this.fishSwimmingSound.play().catch((err) => console.error(err));
    }
  }

  /**
   * Stoppt den Schwimm-Sound und setzt den Zeitstempel zurück.
   */
  stopFishSwimmingSound() {
    if (!this.fishSwimmingSound.paused) {
      this.fishSwimmingSound.pause();
      this.fishSwimmingSound.currentTime = 0;
    }
  }

  die() {
    this.isDead = true;
    this.deathImageIndex = 0;
    const deathInterval = setInterval(() => {
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

  shootBubbleAttack() {
    let i = 0;
    const totalFrames = this.IMAGES_ATTACK_BUBBLE.length;
    const intervalId = setInterval(() => {
      if (i < totalFrames) {
        this.playAnimation(this.IMAGES_ATTACK_BUBBLE, "bubbleAttackIndex");
        i++;
      } else {
        clearInterval(intervalId);
        // Animation abgeschlossen
        this.loadImage(this.IMAGES_SWIMMING[0]);
        // Spawne die Bubble
        this.world.spawnBubble(this);
        // Spiele Sound
        this.bubblePopSound.play().catch((err) => console.error(err));
        this.isBubbleAttacking = false;
      }
    }, 50);
  }
}
