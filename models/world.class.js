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

  // Status Bars (UI, fix am Bildschirmrand):
  coinStatusBar = new CoinStatusBar();
  poisonStatusBar = new PoisonStatusBar();
  statusBar = new StatusBar();

  canvas;
  ctx;
  keyboard;
  camera_x = 0; // Kamera-Verschiebung in Weltkoordinaten
  gameOver = false;
  gameWon = false; // Flag, das anzeigt, ob der Spieler gewonnen hat

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.setWorld();
    this.character.animate();
    this.draw();
    this.checkCollisions();

    // Den Gegnern Zugriff auf die Welt geben und initialisiere das Slap-Flag
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
      enemy.slapHit = false; // Flag zur Verhinderung mehrfacher Treffer pro Slap
    });

    console.log("🌍 Gegner in der Welt geladen:", this.enemies);
  }

  setWorld() {
    this.character.world = this;
  }

  /**
   * Prüft Kollisionen zwischen Bubbles, Gegnern, Sharkie und Sammelobjekten.
   */
  checkCollisions() {
    requestAnimationFrame(() => this.checkCollisions());

    // Setze das Slap-Flag für alle Gegner am Anfang jedes Frames zurück
    this.enemies.forEach((enemy) => {
      if (enemy) enemy.slapHit = false;
    });

    // Kollision Bubbles ↔ Gegner
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      let bubble = this.bubbles[i];
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        let enemy = this.enemies[j];
        if (bubble.isColliding(enemy)) {
          console.log(
            `💥 Kollision! Bubble X: ${bubble.x}, Gegner X: ${enemy.x}`
          );
          // Endboss bekommt Schaden, sonst sterben normale Gegner
          if (enemy instanceof Endboss) {
            enemy.receiveDamage();
          } else {
            enemy.die();
          }
          this.bubbles.splice(i, 1);
          break;
        }
      }
    }

    // Kollision Sharkie ↔ Gegner (Normaler Kontakt, wenn nicht im Angriff)
    for (let enemy of this.enemies) {
      if (!enemy) continue;
      if (
        !this.character.isAttacking &&
        this.character.isColliding(enemy) &&
        !enemy.isDead
      ) {
        let damageAmount = enemy instanceof Endboss ? 40 : 20;
        this.character.hit(damageAmount, enemy);
      }
    }

    // Slap-Angriff: Wenn Sharkie angreift (Space-Taste) und die Slap-Hitbox einen Gegner trifft
    for (let enemy of this.enemies) {
      if (!enemy) continue;
      if (
        this.character.isAttacking &&
        !enemy.isDead &&
        this.character.isSlapColliding(enemy)
      ) {
        // Für kleine Gegner: sofort sterben
        if (!(enemy instanceof Endboss)) {
          enemy.die();
          console.log(
            "Slap-Angriff: Kleiner Gegner sofort tot! (enemy.x =",
            enemy.x,
            ", character.x =",
            this.character.x,
            ")"
          );
        } else {
          // Beim Endboss eventuell weiterhin Schaden über hit() verteilen
          let slapDamage = 20;
          enemy.hit(slapDamage);
          console.log(
            "Slap-Angriff: Endboss getroffen! (enemy.x =",
            enemy.x,
            ", character.x =",
            this.character.x,
            ")"
          );
        }
        // Optional: Falls ein Gegner mehrfach pro Frame getroffen werden soll,
        // kann hier ein Flag gesetzt werden (z.B. enemy.slapHit = true;)
      }
    }

    // Kollision Sharkie ↔ Sammelobjekte
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      let item = this.collectibles[i];
      if (this.character.isColliding(item)) {
        if (item instanceof Coin) {
          this.collectedCoins++;
          this.coinStatusBar.setPercentage(this.collectedCoins * 20);
          this.character.coinPickUpSound
            .play()
            .catch((err) => console.error(err));
        } else if (item instanceof PoisonBottle) {
          this.collectedPoisonBottles++;
          this.poisonStatusBar.setPercentage(this.collectedPoisonBottles * 20);
          this.character.poisonBottleSound
            .play()
            .catch((err) => console.error(err));
        }
        this.collectibles.splice(i, 1);
      }
    }
  }

  /**
   * Zeichnet die Spielwelt.
   * Weltobjekte werden in Weltkoordinaten gezeichnet (mit Kameraverschiebung),
   * UI-Elemente (Status Bars) bleiben fix am Bildschirmrand.
   */
  draw() {
    // Prüfe, ob der Spieler gewonnen hat:
    if (this.gameWon) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      document.getElementById("win-screen").style.display = "flex";
      return;
    }

    // Falls gameOver:
    if (this.gameOver) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      document.getElementById("game-over-screen").style.display = "flex";
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Aktualisiere die Kameraposition: Sharkie soll immer bei x = 50 sein
    this.updateCameraPosition();

    // Zeichne Weltobjekte (mit Kameraverschiebung)
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.surfaces);
    this.addObjectsToMap(this.collectibles);
    this.addObjectsToMap(this.bubbles);
    this.addToMap(this.character);
    this.ctx.restore();

    // Zeichne UI-Elemente fix am Bildschirmrand
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.poisonStatusBar);

    requestAnimationFrame(() => this.draw());
  }

  /**
   * Setzt die Kamera so, dass Sharkie immer bei x = 50 erscheint.
   */
  updateCameraPosition() {
    const fixedScreenX = 50; // Sharkie soll hier auf dem Bildschirm sein
    this.camera_x = fixedScreenX - this.character.x;
  }

  /**
   * Zeichnet eine Liste von Objekten mithilfe von addToMap().
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Zeichnet ein einzelnes Objekt.
   * Weltobjekte werden mit der globalen Kameratranslation gezeichnet,
   * UI-Elemente werden fix gezeichnet.
   */
  addToMap(mo) {
    this.ctx.save();
    if (
      mo instanceof StatusBar ||
      mo instanceof CoinStatusBar ||
      mo instanceof PoisonStatusBar
    ) {
      // UI-Elemente: Fix an Bildschirmposition
      this.ctx.translate(mo.x, mo.y);
    } else {
      // Weltobjekte: Bereits global durch draw() verschoben, also nur mo.x, mo.y
      this.ctx.translate(mo.x, mo.y);
    }

    if (mo.otherDirection) {
      // Wenn das Objekt nach links schaut, spiegel es:
      this.ctx.scale(-1, 1);
      this.ctx.translate(-mo.width, 0);
    }

    if (mo.img && mo.img.complete && mo.img.naturalWidth > 0) {
      this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
    }
    this.ctx.restore();
  }

  /**
   * Spawnt eine normale Bubble aus Sharkies Mund.
   */
  spawnBubble(sharkie) {
    let offsetX = 140;
    let offsetY = 130;
    let spawnX = sharkie.otherDirection
      ? sharkie.x - offsetX
      : sharkie.x + offsetX;
    let spawnY = sharkie.y + offsetY;

    let bubble = new Bubble(spawnX, spawnY, sharkie.otherDirection, this);
    this.bubbles.push(bubble);
    this.animateBubble(bubble);

    console.log(`🎈 Bubble erzeugt bei X=${spawnX}, Y=${spawnY}`);
  }

  /**
   * Spawnt eine vergiftete Bubble.
   */
  spawnPoisonedBubble(sharkie) {
    let offsetX = 140;
    let offsetY = 130;
    let spawnX = sharkie.otherDirection
      ? sharkie.x - offsetX
      : sharkie.x + offsetX;
    let spawnY = sharkie.y + offsetY;

    let poisonedBubble = new PoisonedBubble(
      spawnX,
      spawnY,
      sharkie.otherDirection,
      this
    );
    this.bubbles.push(poisonedBubble);
    this.animateBubble(poisonedBubble);

    console.log(`☠️ Poisoned Bubble erzeugt bei X=${spawnX}, Y=${spawnY}`);
  }

  /**
   * Bewegt eine Bubble in Weltkoordinaten.
   * Hier wird setGameInterval() verwendet, damit der Interval zentral registriert wird.
   */
  animateBubble(bubble) {
    let bubbleSpeed = 5;
    let moveInterval = setGameInterval(() => {
      if (bubble.goingLeft) {
        bubble.x -= bubbleSpeed;
      } else {
        bubble.x += bubbleSpeed;
      }
      // Entferne die Bubble, wenn sie links außerhalb des Bildschirms ist.
      if (bubble.x < -bubble.width) {
        clearInterval(moveInterval);
        this.bubbles = this.bubbles.filter((b) => b !== bubble);
      }
    }, 1000 / 60);
  }

  displayWinScreen() {
    this.gameWon = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    document.getElementById("win-screen").style.display = "flex";
  }
}
