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

/**
 * Handles the initial key press for the poisoned bubble attack.
 * @this {Character}
 */
Character.prototype.handlePoisonKey = function () {
  const keyboardC = this.world.keyboard.C;
  if (keyboardC && !this.wasPoisonKeyPressed) {
    this.wasPoisonKeyPressed = true;
    if (
      this.world.collectedPoisonBottles > 0 &&
      !this.isPoisonBubbleAttacking
    ) {
      this.isPoisonBubbleAttacking = true;
      this.poisonBubbleAttackIndex = 0;
      this.resetAFKTimer();
    }
  } else if (!keyboardC) {
    this.wasPoisonKeyPressed = false;
  }
};

/**
 * Processes the poisoned bubble attack animation and spawning.
 * @this {Character}
 */
Character.prototype.processPoisonAttack = function () {
  if (this.isPoisonBubbleAttacking) {
    this.playAnimation(
      this.IMAGES_ATTACK_POISONED_BUBBLE,
      "poisonBubbleAttackIndex"
    );
    if (
      this.poisonBubbleAttackIndex >= this.IMAGES_ATTACK_POISONED_BUBBLE.length
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
};

/**
 * Main function to animate the poisoned bubble attack.
 * @this {Character}
 */
Character.prototype.animateAttackPoisonedBubble = function () {
  setGameInterval(() => {
    if (this.isDead) return;
    this.handlePoisonKey();
    this.processPoisonAttack();
  }, 150);
};

Character.prototype.takeDamage = function (amount) {
  if (this.isDead) return;
  this.hp -= amount;
  if (this.hp < 0) this.hp = 0;
  this.world.statusBar.setPercentage(this.hp);
  if (this.hp === 0 && !this.isDead) this.die();
};

/**
 * Applies damage to the character if the damage cooldown has passed.
 * Updates HP, plays the electricity sound, and triggers death if needed.
 * @param {number} damage - The amount of damage.
 * @param {number} now - The current timestamp.
 * @returns {boolean} True if the character died due to this damage.
 */
Character.prototype.applyDamage = function (damage, now) {
  if (now - this.lastDamageTime >= this.damageCooldown) {
    this.lastDamageTime = now;
    this.hp = Math.max(0, this.hp - damage);
    this.world.statusBar.setPercentage(this.hp);
    this.electricitySound.play().catch(() => {});
    if (this.hp === 0) {
      this.die();
      return true;
    }
  }
  return false;
};

/**
 * Triggers the hurt animation for the character.
 * @param {number} now - The current timestamp.
 */
Character.prototype.triggerHurtAnimation = function (now) {
  if (!this.isHurt && this.hp > 0) {
    this.isHurt = true;
    this.hurtStartTime = now;
    this.hurtImageIndex = 0;
    const hurtInterval = setGameInterval(
      () => this.playAnimation(this.IMAGES_HURT_SHOCK, "hurtImageIndex"),
      150
    );
    setTimeout(() => {
      clearInterval(hurtInterval);
      this.isHurt = false;
    }, this.hurtDuration);
  }
};

/**
 * Processes a hit on the character.
 * Reduces HP, plays the electricity sound, and triggers the hurt animation.
 * @param {number} damage - The amount of damage.
 */
Character.prototype.hit = function (damage) {
  const now = Date.now();
  if (this.hp <= 0) return;
  if (this.applyDamage(damage, now)) return;
  this.triggerHurtAnimation(now);
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

/**
 * Returns the attack hitbox for the slap attack.
 * @returns {{x: number, y: number, width: number, height: number}} The attack box.
 */
Character.prototype.getAttackBox = function () {
  const attackWidth = 30;
  const attackHeight = this.height - 40;
  const attackX = this.otherDirection
    ? this.x - attackWidth
    : this.x + this.width;
  const attackY = this.y + 20;
  return { x: attackX, y: attackY, width: attackWidth, height: attackHeight };
};

/**
 * Returns the hitbox of the given enemy.
 * @param {Object} enemy - The enemy object.
 * @returns {{x: number, y: number, width: number, height: number}} The enemy box.
 */
Character.prototype.getEnemyBox = function (enemy) {
  return { x: enemy.x, y: enemy.y, width: enemy.width, height: enemy.height };
};

/**
 * Checks if two boxes collide.
 * @param {{x: number, y: number, width: number, height: number}} box1
 * @param {{x: number, y: number, width: number, height: number}} box2
 * @returns {boolean} True if the boxes intersect.
 */
function boxesCollide(box1, box2) {
  return (
    box1.x < box2.x + box2.width &&
    box1.x + box1.width > box2.x &&
    box1.y < box2.y + box2.height &&
    box1.y + box1.height > box2.y
  );
}

/**
 * Determines whether the slap attack hitbox collides with an enemy.
 * @param {Object} enemy - The enemy object.
 * @returns {boolean} True if colliding.
 */
Character.prototype.isSlapColliding = function (enemy) {
  const attackBox = this.getAttackBox();
  const enemyBox = this.getEnemyBox(enemy);
  return boxesCollide(attackBox, enemyBox);
};
