// world.class.js
class World {
  character = new Character();
  enemies = level1.enemies;
  backgroundObjects = level1.backgroundObjects;
  surfaces = [new Surface()];
  level = level1;
  bubbles = [];
  poisonBottles = [
    new PoisonBottle(600, 250),
    new PoisonBottle(900, 200),
    new PoisonBottle(1200, 150),
    new PoisonBottle(1500, 220),
    new PoisonBottle(1800, 180),
  ];
  collectedPoisonBottles = 0;
  poisonStatusBar = new PoisonStatusBar();

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.character.animate();
    this.checkCollisions();

    // Endboss erhält den Zugriff auf die Welt
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
    // Kollisionsabfrage für Feinde
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          if (!this.character.isHurt) {
            let damageAmount = enemy instanceof Endboss ? 40 : 20; // Endboss verursacht mehr Schaden

            this.character.hit(); // Schaden anwenden
            this.character.energy -= damageAmount; // HP reduzieren
            this.statusBar.setPercentage(this.character.energy); // HP-StatusBar updaten

            console.log(
              `Collision with ${
                enemy instanceof Endboss ? "Endboss" : "Fish"
              }, energy: ${this.character.energy}`
            );

            this.character.isHurt = true;
            this.character.hurtStartTime = Date.now();

            // Verschiedene Hurt-Typen basierend auf dem Enemy festlegen
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

            // Falls HP auf 0 fällt → Game Over
            if (this.character.energy <= 0) {
              this.character.energy = 0;
              this.character.die();
            }
          }
        }
      });
    }, 300);

    // Kollisionsabfrage für Poison Bottles
    setInterval(() => {
      this.poisonBottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          // Bottle einsammeln
          this.poisonBottles.splice(index, 1);
          this.collectedPoisonBottles++;
          // Jede Bottle entspricht 20 % → 5 Bottles = 100 %
          this.poisonStatusBar.setPercentage(this.collectedPoisonBottles * 20);
          console.log(
            `Poison Bottle collected! Count: ${this.collectedPoisonBottles}`
          );
        }
      });
    }, 100);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Zeichne den Level-Inhalt (Hintergrund, Gegner, Oberflächen, Poison Bottles und den Character)
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.surfaces);
    this.addObjectsToMap(this.poisonBottles);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    // Zeichne die HUD-Elemente (HP-StatusBar und Poison Bottle Status Bar)
    this.addToMap(this.statusBar);
    this.addToMap(this.poisonStatusBar);

    // Aktualisiere und zeichne die Bubbles
    this.bubbles.forEach((bubble) => bubble.update());
    this.addObjectsToMap(this.bubbles);

    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
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

      // Optional: Zeichne ein Umrandungsrechteck für Character und Fish (zur Debugging-Unterstützung)
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
    let offsetX = sharkie.otherDirection ? -20 : 50;
    let offsetY = 120;

    let bubbleX = sharkie.x + offsetX;
    let bubbleY = sharkie.y + offsetY;

    let bubble = new Bubble(bubbleX, bubbleY, sharkie.otherDirection, this);
    this.bubbles.push(bubble);
  }
}
