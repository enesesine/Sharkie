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
  bubbleAttackIndex = 0;
  isBubbleAttacking = false;
  lastBubbleTime = 0;
  bubbleCooldown = 500;

  // Hurt-Variablen
  isHurt = false;
  hurtImageIndex = 0;
  hurtDuration = 1000;
  hurtStartTime = 0;
  currentHurtImages = null;

  // Death-Animation-Index
  deathImageIndex = 0;

  // Bubble-Spawn Offsets (fest definierter Ankerpunkt für den Mund)
  bubbleSpawnOffsetX = 140;
  bubbleSpawnOffsetY = 130;

  constructor() {
    super().loadImage("Imgs/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_STANDING);
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
  }

  animate() {
    if (this.isDead) return;
    this.animateHorizontalMovement();
    this.animateVerticalMovement();
    this.animateSwimming();
    this.animateIdle();
    this.animateAttackSlap();
    this.animateAttackBubble();
    this.animateAttackPoisonedBubble(); // Neue Methode für den "C" Key
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
      if (this.world.keyboard.D) {
        this.playAnimation(this.IMAGES_ATTACK_BUBBLE, "bubbleAttackIndex");
        this.fireBubble();
      }
    }, 150);
  }

  animateAttackPoisonedBubble() {
    setInterval(() => {
      if (this.isDead) return;
      if (this.world.keyboard.C) {
        // Nur feuern, wenn mindestens eine Poison Bottle vorhanden ist
        if (this.world.collectedPoisonBottles > 0) {
          this.playAnimation(
            this.IMAGES_ATTACK_POISONED_BUBBLE,
            "poisonBubbleAttackIndex"
          );
          this.firePoisonedBubble();
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

  playAnimation(images, indexName = "currentImage") {
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

  hit() {
    if (this.isDead) return;
    this.isHurt = true;
    this.hurtStartTime = Date.now();
    this.world.statusBar.setPercentage(this.energy);
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
      // Verbrauch eine Poison Bottle
      this.world.collectedPoisonBottles--;
      this.world.poisonStatusBar.setPercentage(
        this.world.collectedPoisonBottles * 20
      );
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
        // Sobald die Death-Animation fertig ist, stoppen wir das Spiel komplett:
        if (this.world) {
          this.world.gameOver = true;
        }
      }
    }, 150);
  }
}
