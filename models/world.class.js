class World {
  character = new Character();
  enemies = level1.enemies;
  backgroundObjects = level1.backgroundObjects;
  surfaces = [new Surface()];
  level = level1;
  bubbles = []; // Alle Bubbles

  // Sammelbare Objekte:
  collectibles = level1.collectibles;
  collectedCoins = 0;
  collectedPoisonBottles = 0;

  // Status Bars:
  coinStatusBar = new CoinStatusBar();
  poisonStatusBar = new PoisonStatusBar();

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();

  // Game Over Flag:
  gameOver = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.setWorld();
    this.character.animate();
    this.draw();
    this.checkCollisions();

    // Endboss erhält Zugriff auf die Welt
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });

    console.log("🌍 Gegner in der Welt geladen:", this.enemies);
  }

  setWorld() {
    this.character.world = this;
  }

  /**
   * Prüft Kollisionen mit Gegnern, Bubbles & Sammelobjekten.
   */
  checkCollisions() {
    // 🔄 Prüft Kollisionen in jedem Frame
    requestAnimationFrame(() => this.checkCollisions());

    // ✅ 1. Kollisionsprüfung Bubbles & Gegner
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      let bubble = this.bubbles[i];
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        let enemy = this.enemies[j];
        if (bubble.isColliding(enemy) && !enemy.isDead) {
          console.log(
            `💥 Bubble trifft ${enemy.constructor.name} bei X: ${enemy.x}, Y: ${enemy.y}`
          );
          enemy.die(); // 🔥 Gegner stirbt sofort
          this.bubbles.splice(i, 1); // 🔥 Bubble verschwindet
          break; // Eine Bubble trifft nur einen Gegner
        }
      }
    }

    // ✅ 2. Kollisionsprüfung Sharkie & Gegner
    for (let enemy of this.enemies) {
      if (!enemy) continue; // Falls enemy null/undefined

      if (this.character.isColliding(enemy) && !enemy.isDead) {
        // Logge Kollision
        console.log(
          `⚠️ Sharkie kollidiert mit ${enemy.constructor.name} (X: ${enemy.x}, Y: ${enemy.y})`
        );

        let damageAmount = enemy instanceof Endboss ? 40 : 20; // Endboss 40, Rest 20
        console.log(`🛠 Aufruf: this.character.hit(${damageAmount})`);

        // Falls Sharkie keinen permanenten Schaden nimmt
        this.character.hit(damageAmount);
        // -> Die Character-Klasse regelt via `isHurt` oder `lastDamageTime`,
        // ob Schaden wirklich erfolgt oder geblockt wird
      }
    }

    // ✅ 3. Kollisionsprüfung Sammelobjekte
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      let item = this.collectibles[i];
      if (this.character.isColliding(item)) {
        if (item instanceof Coin) {
          this.collectedCoins++;
          this.coinStatusBar.setPercentage(this.collectedCoins * 20);
          console.log(`Coin collected! Count: ${this.collectedCoins}`);
          this.character.coinPickUpSound
            .play()
            .catch((err) => console.error(err));
        } else if (item instanceof PoisonBottle) {
          this.collectedPoisonBottles++;
          this.poisonStatusBar.setPercentage(this.collectedPoisonBottles * 20);
          console.log(
            `Poison Bottle collected! Count: ${this.collectedPoisonBottles}`
          );
          this.character.poisonBottleSound
            .play()
            .catch((err) => console.error(err));
        }
        this.collectibles.splice(i, 1);
      }
    }
  }

  draw() {
    if (this.gameOver) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      document.getElementById("game-over-screen").style.display = "flex";
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.surfaces);
    this.addObjectsToMap(this.collectibles);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.poisonStatusBar);

    // Bubbles aktualisieren & zeichnen
    this.bubbles.forEach((bubble) => bubble.update());
    this.addObjectsToMap(this.bubbles);

    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  addToMap(mo) {
    this.ctx.save();
    if (mo.otherDirection) {
      this.ctx.translate(mo.x + mo.width, mo.y);
      this.ctx.scale(-1, 1);
    } else {
      this.ctx.translate(mo.x, mo.y);
    }
    if (mo.img && mo.img.complete && mo.img.naturalWidth > 0) {
      this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
    }
    this.ctx.restore();
  }

  /**
   * Spawnt eine normale Bubble.
   */
  spawnBubble(sharkie) {
    let offsetX = 140;
    let offsetY = 130;
    let spawnX = sharkie.otherDirection
      ? sharkie.x - offsetX + this.camera_x
      : sharkie.x + offsetX + this.camera_x;
    let spawnY = sharkie.y + offsetY;

    let bubble = new Bubble(spawnX, spawnY, sharkie.otherDirection, this);
    this.bubbles.push(bubble);

    console.log(
      "Bubble corrected spawn at:",
      spawnX,
      spawnY,
      "Sharkie at:",
      sharkie.x,
      "Camera:",
      this.camera_x
    );
  }

  /**
   * Spawnt eine vergiftete Bubble (gleiche Physik wie normale Bubble).
   */
  spawnPoisonedBubble(sharkie) {
    let offsetX = 140;
    let offsetY = 130;
    let spawnX = sharkie.otherDirection
      ? sharkie.x - offsetX + this.camera_x
      : sharkie.x + offsetX + this.camera_x;
    let spawnY = sharkie.y + offsetY;

    let poisonedBubble = new PoisonedBubble(
      spawnX,
      spawnY,
      sharkie.otherDirection,
      this
    );
    this.bubbles.push(poisonedBubble);

    console.log(
      "Poisoned Bubble corrected spawn at:",
      spawnX,
      spawnY,
      "Sharkie at:",
      sharkie.x,
      "Camera:",
      this.camera_x
    );
  }
}
