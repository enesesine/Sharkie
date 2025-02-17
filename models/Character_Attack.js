// Angriffs- und Schadens-Methoden

Character.prototype.animateAttackSlap = function () {
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
};

Character.prototype.animateAttackBubble = function () {
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
};

Character.prototype.animateAttackPoisonedBubble = function () {
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
};

Character.prototype.takeDamage = function (amount) {
  if (this.isDead) return;
  this.hp -= amount;
  if (this.hp < 0) this.hp = 0;
  this.world.statusBar.setPercentage(this.hp);
  if (this.hp === 0 && !this.isDead) this.die();
};

Character.prototype.hit = function (damage) {
  const now = Date.now();
  if (this.hp <= 0) return;
  if (now - this.lastDamageTime >= this.damageCooldown) {
    this.lastDamageTime = now;
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;
    this.world.statusBar.setPercentage(this.hp);
    this.electricitySound.play().catch(() => {});
    if (this.hp === 0) {
      this.die();
      return;
    }
  }
  if (!this.isHurt && this.hp > 0) {
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
};

Character.prototype.die = function () {
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
      if (this.world) this.world.gameOver = true;
    }
  }, 150);
};

Character.prototype.shootBubbleAttack = function () {
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
};

Character.prototype.fireBubble = function () {
  const currentTime = Date.now();
  if (currentTime - this.lastBubbleTime >= this.bubbleCooldown) {
    this.world.spawnBubble(this);
    this.lastBubbleTime = currentTime;
  }
};

Character.prototype.firePoisonedBubble = function () {
  const currentTime = Date.now();
  if (currentTime - this.lastBubbleTime >= this.bubbleCooldown) {
    this.world.spawnPoisonedBubble(this);
    this.lastBubbleTime = currentTime;
    this.world.collectedPoisonBottles--;
    this.world.poisonStatusBar.setPercentage(
      this.world.collectedPoisonBottles * 20
    );
  }
};

Character.prototype.isSlapColliding = function (enemy) {
  const attackWidth = 30,
    attackHeight = this.height - 40;
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
};
