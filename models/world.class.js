/**
 * Represents the game world.
 * @class
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
    this.setupMenuExit();
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
    this.level.enemies.forEach((e) => {
      e.world = this;
      e.slapHit = false;
    });
  }

  /**
   * Resets the slap flag for all enemies.
   */
  resetEnemySlapFlags() {
    this.enemies.forEach((e) => {
      if (e) e.slapHit = false;
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
          enemy instanceof Endboss ? enemy.receiveDamage() : enemy.die();
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
        const sharkieCenter = this.character.y + this.character.height / 2;
        const enemyCenter = enemy.y + enemy.height / 2;
        if (
          enemy instanceof Endboss ||
          Math.abs(sharkieCenter - enemyCenter) < 50
        ) {
          this.character.hit(enemy instanceof Endboss ? 40 : 20, enemy);
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
      if (
        this.character.isAttacking &&
        this.character.isSlapColliding(enemy) &&
        !enemy.slapHit
      ) {
        enemy.slapHit = true;
        enemy instanceof Endboss ? enemy.hit(20) : enemy.die();
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
   * Continuously checks for collisions.
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
    if (this.gameWon) return this.handleWin();
    if (this.gameOver) return this.handleGameOver();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateCameraPosition();
    this.drawGameObjects();
    this.drawUI();
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Handles the win state.
   */
  handleWin() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const winEl = document.getElementById("win-screen");
    winEl.style.display = "flex";
    if (document.fullscreenElement) {
      document.fullscreenElement.appendChild(winEl);
    }
    backgroundMusic.pause();
    this.winSound.play().catch(() => {});
  }

  /**
   * Handles the game over state.
   */
  handleGameOver() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const goEl = document.getElementById("game-over-screen");
    goEl.style.display = "flex";
    if (document.fullscreenElement) {
      document.fullscreenElement.appendChild(goEl);
    }
    backgroundMusic.pause();
    this.loseSound.play().catch(() => {});
  }

  /**
   * Updates the camera position.
   */
  updateCameraPosition() {
    this.camera_x = 50 - this.character.x;
  }

  /**
   * Draws all game objects.
   */
  drawGameObjects() {
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.surfaces);
    this.addObjectsToMap(this.collectibles);
    this.addObjectsToMap(this.bubbles);
    this.addToMap(this.character);
    this.ctx.restore();
  }

  /**
   * Draws the UI elements.
   */
  drawUI() {
    this.addObjectsToMap([
      this.statusBar,
      this.coinStatusBar,
      this.poisonStatusBar,
    ]);
  }

  /**
   * Adds an array of drawable objects to the canvas.
   * @param {Array} objs - Array of drawable objects.
   */
  addObjectsToMap(objs) {
    objs.forEach((o) => this.addToMap(o));
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
   * @param {Character} sharkie - The character instance.
   */
  spawnBubble(sharkie) {
    const offX = 140,
      offY = 130;
    const spawnX = sharkie.otherDirection ? sharkie.x - offX : sharkie.x + offX;
    const spawnY = sharkie.y + offY;
    const bubble = new Bubble(spawnX, spawnY, sharkie.otherDirection, this);
    this.bubbles.push(bubble);
    this.animateBubble(bubble);
  }

  /**
   * Spawns a poisoned bubble from the character.
   * @param {Character} sharkie - The character instance.
   */
  spawnPoisonedBubble(sharkie) {
    const offX = 140,
      offY = 130;
    const spawnX = sharkie.otherDirection ? sharkie.x - offX : sharkie.x + offX;
    const spawnY = sharkie.y + offY;
    const pbubble = new PoisonedBubble(
      spawnX,
      spawnY,
      sharkie.otherDirection,
      this
    );
    this.bubbles.push(pbubble);
    this.animateBubble(pbubble);
  }

  /**
   * Animates a bubble in the game world.
   * @param {Bubble} bubble - The bubble to animate.
   */
  animateBubble(bubble) {
    const speed = 5;
    const moveInt = setGameInterval(() => {
      bubble.x += bubble.goingLeft ? -speed : speed;
      if (bubble.x < -bubble.width) {
        clearInterval(moveInt);
        this.bubbles = this.bubbles.filter((b) => b !== bubble);
      }
    }, 1000 / 60);
  }

  /**
   * Displays the win screen.
   */
  displayWinScreen() {
    this.gameWon = true;
    this.handleWin();
  }

  /**
   * Mutes or unmutes all game sounds.
   * @param {boolean} mute - True to mute, false to unmute.
   */
  muteAllSounds(mute) {
    backgroundMusic.muted = mute;
    this.winSound.muted = mute;
    this.loseSound.muted = mute;
    this.character.fishSwimmingSound.muted = mute;
    this.character.bubblePopSound.muted = mute;
    this.character.coinPickUpSound.muted = mute;
    this.character.poisonBottleSound.muted = mute;
    this.character.electricitySound.muted = mute;
  }

  /**
   * Sets up event listeners on Menu buttons to exit fullscreen when clicked.
   */
  setupMenuExit() {
    const menuButtons = document.querySelectorAll(
      "#game-over-screen button, #win-screen button"
    );
    menuButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      });
    });
  }
}
