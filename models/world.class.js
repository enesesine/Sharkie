// world.class.js
class World {
  character = new Character();
  enemies = level1.enemies;
  backgroundObjects = level1.backgroundObjects;
  surfaces = [new Surface()];
  level = level1;
  bubbles = []; // Sammlung aller Bubbles

  // Sammelbare Objekte kommen nun aus dem Level:
  collectibles = level1.collectibles;
  collectedCoins = 0;
  collectedPoisonBottles = 0;

  // Status Bars für Coins und PoisonBottles:
  coinStatusBar = new CoinStatusBar();
  poisonStatusBar = new PoisonStatusBar();

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();

  // Globaler Flag für Game Over
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
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    // Kollisionsabfrage für Gegner:
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          if (!this.character.isHurt) {
            let damageAmount = enemy instanceof Endboss ? 40 : 20;
            this.character.hit();
            this.character.energy -= damageAmount;
            this.statusBar.setPercentage(this.character.energy);
            console.log(
              `Collision with ${
                enemy instanceof Endboss ? "Endboss" : "Fish"
              }, energy: ${this.character.energy}`
            );
            this.character.isHurt = true;
            this.character.hurtStartTime = Date.now();

            if (enemy.damageType === "shock") {
              this.character.currentHurtImages =
                this.character.IMAGES_HURT_SHOCK;
            } else if (enemy.damageType === "poison") {
              this.character.currentHurtImages =
                this.character.IMAGES_HURT_POISON;
            } else {
              this.character.currentHurtImages =
                this.character.IMAGES_HURT_SHOCK;
            }

            if (this.character.energy <= 0) {
              this.character.energy = 0;
              this.character.die();
            }
          }
        }
      });
    }, 300);

    // Kollisionsabfrage für Sammelobjekte (Collectibles):
    setInterval(() => {
      this.collectibles.forEach((item, index) => {
        if (this.character.isColliding(item)) {
          if (item instanceof Coin) {
            this.collectedCoins++;
            // 5 Coins = 100 % → jede Coin = 20%
            this.coinStatusBar.setPercentage(this.collectedCoins * 20);
            console.log(`Coin collected! Count: ${this.collectedCoins}`);
            // Spiele den Coin-PickUp-Sound (lautstärke in der Character-Klasse eingestellt)
            this.character.coinPickUpSound
              .play()
              .catch((err) => console.error(err));
          } else if (item instanceof PoisonBottle) {
            this.collectedPoisonBottles++;
            // 5 PoisonBottles = 100 % → jede Bottle = 20%
            this.poisonStatusBar.setPercentage(
              this.collectedPoisonBottles * 20
            );
            console.log(
              `Poison Bottle collected! Count: ${this.collectedPoisonBottles}`
            );
            // Spiele den Poisoned-Bottle-Sound
            this.character.poisonBottleSound
              .play()
              .catch((err) => console.error(err));
          }
          // Entferne das eingesammelte Objekt:
          this.collectibles.splice(index, 1);
        }
      });
    }, 100);
  }

  draw() {
    // Wenn Game Over, zeichne ein leicht dunkles Overlay und zeige den Game Over Screen
    if (this.gameOver) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.save();
      // Leicht dunkles Overlay (nicht komplett schwarz)
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.restore();

      // Blende den HTML-Game-Over Screen ein
      document.getElementById("game-over-screen").style.display = "flex";
      return;
    }

    // Normale Zeichnungslogik:
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.surfaces);
    this.addObjectsToMap(this.collectibles);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    // Zeichne die HUD-Elemente (HP, Coin-StatusBar, PoisonBottle-StatusBar)
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.poisonStatusBar);

    // Aktualisiere und zeichne Bubbles:
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

      if (mo instanceof Character || mo instanceof Fish) {
        this.ctx.beginPath();
        this.ctx.lineWidth = "5";
        this.ctx.strokeStyle = "blue";
        this.ctx.rect(0, 0, mo.width, mo.height);
        this.ctx.stroke();
      }
    }
    this.ctx.restore();
  }

  spawnBubble(sharkie) {
    // Verwende feste Offsets, die in der Character-Klasse definiert sind (oder Standardwerte)
    let offsetX =
      typeof sharkie.bubbleSpawnOffsetX !== "undefined"
        ? sharkie.bubbleSpawnOffsetX
        : 140;
    let offsetY =
      typeof sharkie.bubbleSpawnOffsetY !== "undefined"
        ? sharkie.bubbleSpawnOffsetY
        : 130;

    // Berechne den Spawnpunkt anhand von Sharkies aktueller Position (absolut in der Welt)
    let spawnX = !sharkie.otherDirection
      ? sharkie.x + offsetX
      : sharkie.x + sharkie.width - offsetX;
    let spawnY = sharkie.y + offsetY;

    // Erstelle die Bubble – hier werden die initialen Koordinaten festgehalten
    let bubble = new Bubble(spawnX, spawnY, sharkie.otherDirection, this);

    // Setze eine höhere Geschwindigkeit, damit die Bubble ihre Strecke unabhängig von der Kamerabewegung zurücklegt
    bubble.speed = 20; // Experimentiere hier mit dem Wert, z.B. 20 oder 25

    this.bubbles.push(bubble);
  }

  spawnPoisonedBubble(sharkie) {
    let bubbleX, bubbleY;
    if (!sharkie.otherDirection) {
      bubbleX = sharkie.x + sharkie.width - 20;
    } else {
      bubbleX = sharkie.x + 20;
    }
    bubbleY = sharkie.y + sharkie.height / 2;
    let pBubble = new PoisonedBubble(
      bubbleX,
      bubbleY,
      sharkie.otherDirection,
      this
    );
    this.bubbles.push(pBubble);
  }
}
