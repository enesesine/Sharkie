// Animations-Methoden

Character.prototype.animate = function () {
  if (this.isDead) return;
  this.animateHorizontalMovement();
  this.animateVerticalMovement();
  this.animateSwimming();
  this.animateIdle();
  // Die Angriffsmethoden (Attack-Slap, Bubble etc.) werden im nächsten Teil definiert
  this.animateAttackSlap();
  this.animateAttackBubble();
  this.animateAttackPoisonedBubble();
  this.animateHurt();
};

Character.prototype.animateHorizontalMovement = function () {
  setGameInterval(() => {
    if (this.isDead) return;
    const kb = this.world.keyboard;
    let moved = false;
    if (kb.RIGHT && this.x < this.world.level.level_end_x) {
      (this.x += this.speed), (this.otherDirection = false), (moved = true);
    }
    if (kb.LEFT && this.x > this.spawnX) {
      (this.x -= this.speed), (this.otherDirection = true), (moved = true);
    }
    moved &&
      ((this.lastMovementTime = performance.now()), this.resetLongIdle());
    this.world.camera_x = -this.x + 5;
  }, 1000 / 60);
};

Character.prototype.animateVerticalMovement = function () {
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
};

Character.prototype.animateSwimming = function () {
  setGameInterval(() => {
    if (this.isDead) return;
    const kb = this.world.keyboard;
    if (kb.LEFT || kb.RIGHT || kb.UP || kb.DOWN)
      this.playAnimation(this.IMAGES_SWIMMING, "swimImageIndex");
  }, 150);
};

Character.prototype.animateIdle = function () {
  setGameInterval(() => {
    const kb = this.world.keyboard,
      t = performance.now() - this.lastMovementTime;
    if (this.isDead || this.isHurt || kb.LEFT || kb.RIGHT || kb.UP || kb.DOWN)
      return;
    if (
      this.isAttacking ||
      this.isBubbleAttacking ||
      this.isPoisonBubbleAttacking
    ) {
      this.lastMovementTime = performance.now();
      return;
    }
    t < 5000
      ? this.playAnimation(this.IMAGES_STANDING, "idleImageIndex")
      : !this.longIdleIntroDone
      ? this.playLongIdleIntro()
      : this.playLongIdleLoop();
  }, 150);
};

Character.prototype.playLongIdleIntro = function () {
  const index = this.idleLongIntroIndex % this.IMAGES_STANDING_LONG.length;
  const path = this.IMAGES_STANDING_LONG[index];
  if (!this.imageCache[path]) return;
  this.img = this.imageCache[path];
  this.idleLongIntroIndex++;
  if (this.idleLongIntroIndex >= this.IMAGES_STANDING_LONG.length) {
    this.longIdleIntroDone = true;
    this.idleLongLoopIndex = 0;
  }
};

Character.prototype.playLongIdleLoop = function () {
  const index = this.idleLongLoopIndex % this.IMAGES_STANDING_LONG_LOOP.length;
  const path = this.IMAGES_STANDING_LONG_LOOP[index];
  if (!this.imageCache[path]) return;
  this.img = this.imageCache[path];
  this.idleLongLoopIndex++;
};

Character.prototype.animateHurt = function () {
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
};
