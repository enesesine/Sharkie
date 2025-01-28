class Character extends MoveableObject {
  height = 220;
  width = 170;
  y = 100;
  x = 5;
  speed = 10;

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

  IMAGES_DEAD_POISON = [
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/3.png",
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

  world;
  swimImageIndex = 0;
  idleImageIndex = 0;
  idleLongIntroIndex = 0;
  idleLongLoopIndex = 0;
  longIdleIntroDone = false;
  attackSlapIndex = 0;
  isAttacking = false;
  lastMovementTime = 0;

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
    this.loadImages(this.IMAGES_DEAD_POISON);
    this.loadImages(this.DEAD_BY_POISON);
    this.loadImages(this.DEAD_BY_SHOCK);
    this.lastMovementTime = performance.now();
    this.animate();
  }

  animate() {
    this.animateHorizontalMovement();
    this.animateVerticalMovement();
    this.animateSwimming();
    this.animateIdle();
    this.animateAttackSlap();
  }

  animateHorizontalMovement() {
    setInterval(() => {
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
      const keyboard = this.world.keyboard;
      if (keyboard.LEFT || keyboard.RIGHT || keyboard.UP || keyboard.DOWN) {
        this.playAnimation(this.IMAGES_SWIMMING, "swimImageIndex");
      }
    }, 150);
  }

  animateIdle() {
    setInterval(() => {
      const keyboard = this.world.keyboard;
      if (keyboard.LEFT || keyboard.RIGHT || keyboard.UP || keyboard.DOWN) {
        return;
      }
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
      if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACK_SLAP, "attackSlapIndex");
        if (this.attackSlapIndex >= this.IMAGES_ATTACK_SLAP.length) {
          this.isAttacking = false;
          this.attackSlapIndex = 0;
        }
      } else {
        if (this.world.keyboard.SPACE) {
          this.isAttacking = true;
          this.attackSlapIndex = 0;
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
  }

  playAnimation(images, indexName = "currentImage") {
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
}
