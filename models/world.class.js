/**
 * Represents the game world.
 */
class World {
  character = new Character();
  enemies = level1.enemies;
  backgroundObjects = level1.backgroundObjects;
  surfaces = [new Surface()];
  level = level1;
  bubbles = [];
  collectibles = level1.collectibles;
  collectedCoins = 0;
  collectedPoisonBottles = 0;
  coinStatusBar = new CoinStatusBar();
  poisonStatusBar = new PoisonStatusBar();
  statusBar = new StatusBar();

  // Sound properties for win and lose
  winSound = new Audio("Audio/win-sound.mp3");
  loseSound = new Audio("Audio/lose-sound.mp3");

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  gameOver = false;
  gameWon = false;

  /**
   * Creates an instance of World.
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {Keyboard} keyboard - The keyboard handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.setWorld();
    this.character.animate();
    this.draw();
    this.checkCollisions();
    this.initializeEnemies();
  }

  /**
   * Sets the world reference for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Initializes each enemy with a world reference and resets its slap flag.
   */
  initializeEnemies() {
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
      enemy.slapHit = false;
    });
  }

  /**
   * Resets the slap flag for all enemies.
   */
  resetEnemySlapFlags() {
    this.enemies.forEach((enemy) => {
      if (enemy) enemy.slapHit = false;
    });
  }

  /**
   * Processes collisions between bubbles and enemies.
   */
  processBubbleCollisions() {
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const bubble = this.bubbles[i];
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const enemy = this.enemies[j];
        if (bubble.isColliding(enemy)) {
          if (enemy instanceof Endboss) enemy.receiveDamage();
          else enemy.die();
          this.bubbles.splice(i, 1);
          break;
        }
      }
    }
  }

  /**
   * Processes normal collisions between the character and enemies.
   */
  processNormalCollisions() {
    for (const enemy of this.enemies) {
      if (!enemy || enemy.isDead) continue;
      if (!this.character.isAttacking && this.character.isColliding(enemy)) {
        const sharkieCenterY = this.character.y + this.character.height / 2;
        const enemyCenterY = enemy.y + enemy.height / 2;
        if (Math.abs(sharkieCenterY - enemyCenterY) < 50) {
          const damageAmount = enemy instanceof Endboss ? 40 : 20;
          this.character.hit(damageAmount, enemy);
        }
      }
    }
  }

  /**
   * Processes slap attack collisions.
   */
  processSlapCollisions() {
    for (const enemy of this.enemies) {
      if (!enemy || enemy.isDead) continue;
      if (this.character.isAttacking && this.character.isSlapColliding(enemy)) {
        if (!enemy.slapHit) {
          enemy.slapHit = true;
          if (!(enemy instanceof Endboss)) {
            enemy.die();
          } else {
            enemy.hit(20);
          }
        }
      }
    }
  }

  /**
   * Processes collisions between the character and collectibles.
   */
  processCollectibleCollisions() {
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const item = this.collectibles[i];
      if (this.character.isColliding(item)) {
        if (item instanceof Coin) {
          this.collectedCoins++;
          this.coinStatusBar.setPercentage(this.collectedCoins * 20);
          this.character.coinPickUpSound.play().catch(() => {});
        } else if (item instanceof PoisonBottle) {
          this.collectedPoisonBottles++;
          this.poisonStatusBar.setPercentage(this.collectedPoisonBottles * 20);
          this.character.poisonBottleSound.play().catch(() => {});
        }
        this.collectibles.splice(i, 1);
      }
    }
  }

  /**
   * Checks all collisions.
   */
  checkCollisions() {
    requestAnimationFrame(() => this.checkCollisions());
    this.resetEnemySlapFlags();
    this.processBubbleCollisions();
    this.processNormalCollisions();
    this.processSlapCollisions();
    this.processCollectibleCollisions();
  }

  /**
   * Draws the game world and UI.
   */
  draw() {
    if (this.gameWon) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      document.getElementById("win-screen").style.display = "flex";
      // Stop background music and play win sound
      backgroundMusic.pause();
      this.winSound.play().catch(() => {});
      return;
    }
    if (this.gameOver) {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      document.getElementById("game-over-screen").style.display = "flex";
      // Stop background music and play lose sound
      backgroundMusic.pause();
      this.loseSound.play().catch(() => {});
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateCameraPosition();
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.surfaces);
    this.addObjectsToMap(this.collectibles);
    this.addObjectsToMap(this.bubbles);
    this.addToMap(this.character);
    this.ctx.restore();
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.poisonStatusBar);
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Updates the camera position so that the character is always at x = 50.
   */
  updateCameraPosition() {
    const fixedScreenX = 50;
    this.camera_x = fixedScreenX - this.character.x;
  }

  /**
   * Draws an array of objects.
   * @param {Array} objects - The objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Draws a single drawable object.
   * @param {DrawableObject} mo - A drawable object.
   */
  addToMap(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x, mo.y);
    if (mo.otherDirection) {
      this.ctx.scale(-1, 1);
      this.ctx.translate(-mo.width, 0);
    }
    if (mo.img && mo.img.complete && mo.img.naturalWidth > 0) {
      this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
    }
    this.ctx.restore();
  }

  /**
   * Spawns a normal bubble from the character.
   * @param {Character} sharkie - The character.
   */
  spawnBubble(sharkie) {
    const offsetX = 140,
      offsetY = 130;
    const spawnX = sharkie.otherDirection
      ? sharkie.x - offsetX
      : sharkie.x + offsetX;
    const spawnY = sharkie.y + offsetY;
    const bubble = new Bubble(spawnX, spawnY, sharkie.otherDirection, this);
    this.bubbles.push(bubble);
    this.animateBubble(bubble);
  }

  /**
   * Spawns a poisoned bubble.
   * @param {Character} sharkie - The character.
   */
  spawnPoisonedBubble(sharkie) {
    const offsetX = 140,
      offsetY = 130;
    const spawnX = sharkie.otherDirection
      ? sharkie.x - offsetX
      : sharkie.x + offsetX;
    const spawnY = sharkie.y + offsetY;
    const poisonedBubble = new PoisonedBubble(
      spawnX,
      spawnY,
      sharkie.otherDirection,
      this
    );
    this.bubbles.push(poisonedBubble);
    this.animateBubble(poisonedBubble);
  }

  /**
   * Animates a bubble in world coordinates.
   * @param {Bubble} bubble - The bubble to animate.
   */
  animateBubble(bubble) {
    const bubbleSpeed = 5;
    const moveInterval = setGameInterval(() => {
      bubble.x += bubble.goingLeft ? -bubbleSpeed : bubbleSpeed;
      if (bubble.x < -bubble.width) {
        clearInterval(moveInterval);
        this.bubbles = this.bubbles.filter((b) => b !== bubble);
      }
    }, 1000 / 60);
  }

  /**
   * Displays the win screen.
   */
  displayWinScreen() {
    this.gameWon = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    document.getElementById("win-screen").style.display = "flex";
    backgroundMusic.pause();
    this.winSound.play().catch(() => {});
  }
}
