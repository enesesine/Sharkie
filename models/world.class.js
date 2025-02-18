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

  setWorld() {
    this.character.world = this;
  }

  initializeEnemies() {
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
      enemy.slapHit = false;
    });
  }

  resetEnemySlapFlags() {
    this.enemies.forEach((enemy) => {
      if (enemy) enemy.slapHit = false;
    });
  }

  processBubbleCollisions() {
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const bubble = this.bubbles[i];
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const enemy = this.enemies[j];
        if (bubble.isColliding(enemy)) {
          enemy instanceof Endboss ? enemy.receiveDamage() : enemy.die();
          this.bubbles.splice(i, 1);
          break;
        }
      }
    }
  }

  processNormalCollisions() {
    for (const enemy of this.enemies) {
      if (!enemy || enemy.isDead) continue;
      if (!this.character.isAttacking && this.character.isColliding(enemy)) {
        const scY = this.character.y + this.character.height / 2;
        const ecY = enemy.y + enemy.height / 2;
        if (Math.abs(scY - ecY) < 50) {
          const dmg = enemy instanceof Endboss ? 40 : 20;
          this.character.hit(dmg, enemy);
        }
      }
    }
  }

  processSlapCollisions() {
    for (const enemy of this.enemies) {
      if (!enemy || enemy.isDead) continue;
      if (this.character.isAttacking && this.character.isSlapColliding(enemy)) {
        if (!enemy.slapHit) {
          enemy.slapHit = true;
          enemy instanceof Endboss ? enemy.hit(20) : enemy.die();
        }
      }
    }
  }

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

  checkCollisions() {
    requestAnimationFrame(() => this.checkCollisions());
    this.resetEnemySlapFlags();
    this.processBubbleCollisions();
    this.processNormalCollisions();
    this.processSlapCollisions();
    this.processCollectibleCollisions();
  }

  draw() {
    if (this.gameWon) {
      this.handleWin();
      return;
    }
    if (this.gameOver) {
      this.handleGameOver();
      return;
    }
    this.renderScene();
    requestAnimationFrame(() => this.draw());
  }

  handleWin() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    document.getElementById("win-screen").style.display = "flex";
    backgroundMusic.pause();
    this.winSound.play().catch(() => {});
  }

  handleGameOver() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    document.getElementById("game-over-screen").style.display = "flex";
    backgroundMusic.pause();
    this.loseSound.play().catch(() => {});
  }

  renderScene() {
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
  }

  updateCameraPosition() {
    const fixedX = 50;
    this.camera_x = fixedX - this.character.x;
  }

  addObjectsToMap(objs) {
    objs.forEach((o) => this.addToMap(o));
  }

  addToMap(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x, mo.y);
    if (mo.otherDirection) {
      this.ctx.scale(-1, 1);
      this.ctx.translate(-mo.width, 0);
    }
    if (mo.img && mo.img.complete && mo.img.naturalWidth > 0)
      this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
    this.ctx.restore();
  }

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

  animateBubble(bubble) {
    const speed = 5;
    const id = setGameInterval(() => {
      bubble.x += bubble.goingLeft ? -speed : speed;
      if (bubble.x < -bubble.width) {
        clearInterval(id);
        this.bubbles = this.bubbles.filter((b) => b !== bubble);
      }
    }, 1000 / 60);
  }

  displayWinScreen() {
    this.gameWon = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    document.getElementById("win-screen").style.display = "flex";
    backgroundMusic.pause();
    this.winSound.play().catch(() => {});
  }
}
