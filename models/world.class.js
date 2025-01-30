// world.class.js
class World {
  character = new Character();
  enemies = level1.enemies;
  backgroundObjects = level1.backgroundObjects;
  surfaces = [new Surface()];
  level = level1;
  bubbles = []; // Sammlung aller Bubbles
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          if (!this.character.isHurt) {
            // **Verhindert mehrfaches Auslösen in kurzer Zeit**
            this.character.hit();
            console.log(
              "Collision with Character, energy",
              this.character.energy
            );
            this.character.isHurt = true;
            this.character.hurtStartTime = Date.now();

            // **Verschiedene Hurt-Typen basierend auf dem Enemy festlegen**
            if (enemy.damageType === "shock") {
              this.character.currentHurtImages =
                this.character.IMAGES_HURT_SHOCK;
            } else if (enemy.damageType === "poison") {
              this.character.currentHurtImages =
                this.character.IMAGES_HURT_POISON;
            } else {
              // **Standard-Hurt-Array**
              this.character.currentHurtImages =
                this.character.IMAGES_HURT_SHOCK;
            }
          }
        }
      });
    }, 300);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.surfaces);

    // Update und Zeichnen der Bubbles
    this.bubbles.forEach((bubble) => bubble.update());
    this.addObjectsToMap(this.bubbles); // Bubbles zeichnen

    this.ctx.translate(-this.camera_x, 0);
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

      // Zeichne ein Rechteck um das Objekt nur, wenn es eine Instanz von Character oder Fish ist
      if (mo instanceof Character || mo instanceof Fish) {
        this.ctx.beginPath();
        this.ctx.lineWidth = "5";
        this.ctx.strokeStyle = "blue";
        this.ctx.rect(0, 0, mo.width, mo.height); // Zeichne das Rechteck relativ zum verschobenen Kontext
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
