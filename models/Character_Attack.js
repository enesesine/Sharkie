/**
 * Animates the slap attack.
 * @this {Character}
 */
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

/**
 * Animates the bubble attack triggered by the D key.
 * @this {Character}
 */
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
 * Checks the bubble cooldown and triggers the poison bubble attack if possible.
 * @this {Character}
 */
Character.prototype.triggerPoisonBubble = function () {
  if (Date.now() - this.lastBubbleTime < this.bubbleCooldown) return false;
  this.bubblePopSound.play().catch(() => {});
  this.world.spawnPoisonedBubble(this);
  this.lastBubbleTime = Date.now();
  this.world.collectedPoisonBottles--;
  this.world.poisonStatusBar.setPercentage(
    this.world.collectedPoisonBottles * 20
  );
  return true;
};

/**
 * Processes the poisoned bubble attack animation and spawning.
 * @this {Character}
 */
Character.prototype.processPoisonAttack = function () {
  if (!this.isPoisonBubbleAttacking) return;
  this.playAnimation(
    this.IMAGES_ATTACK_POISONED_BUBBLE,
    "poisonBubbleAttackIndex"
  );
  if (this.poisonBubbleAttackIndex < this.IMAGES_ATTACK_POISONED_BUBBLE.length)
    return;
  this.isPoisonBubbleAttacking = false;
  this.triggerPoisonBubble();
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

/**
 * Reduces HP by the specified amount and triggers death if HP reaches 0.
 * @this {Character}
 * @param {number} amount - The damage amount.
 */
Character.prototype.takeDamage = function (amount) {
  if (this.isDead) return;
  this.hp -= amount;
  if (this.hp < 0) this.hp = 0;
  this.world.statusBar.setPercentage(this.hp);
  if (this.hp === 0 && !this.isDead) this.die();
};

/**
 * Applies damage to the character if the damage cooldown has passed.
 * Plays the electricity sound and updates HP.
 * @this {Character}
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
 * @this {Character}
 * @param {number} now - The current timestamp.
 */
Character.prototype.triggerHurtAnimation = function (now) {
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
};

/**
 * Processes a hit on the character.
 * Reduces HP, plays the electricity sound, and triggers the hurt animation.
 * @this {Character}
 * @param {number} damage - The amount of damage.
 */
Character.prototype.hit = function (damage) {
  const now = Date.now();
  if (this.hp <= 0) return;
  if (this.applyDamage(damage, now)) return;
  this.triggerHurtAnimation(now);
  if (this.hp <= 0) this.die();
};

/**
 * Triggers the death sequence.
 * @this {Character}
 */
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

/**
 * Executes the bubble attack animation and spawns a bubble.
 * @this {Character}
 */
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

/**
 * Fires a bubble attack.
 * @this {Character}
 */
Character.prototype.fireBubble = function () {
  const currentTime = Date.now();
  if (currentTime - this.lastBubbleTime >= this.bubbleCooldown) {
    this.world.spawnBubble(this);
    this.lastBubbleTime = currentTime;
  }
};

/**
 * Fires a poisoned bubble attack.
 * @this {Character}
 */
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
 * @this {Character}
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
 * @this {Character}
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
 * @this {Character}
 * @param {Object} enemy - The enemy object.
 * @returns {boolean} True if colliding.
 */
Character.prototype.isSlapColliding = function (enemy) {
  const attackBox = this.getAttackBox();
  const enemyBox = this.getEnemyBox(enemy);
  return boxesCollide(attackBox, enemyBox);
};
