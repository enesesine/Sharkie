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
  }

  setWorld() {
    this.character.world = this;
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

  /**
   * Prüft, ob das aktuelle Objekt mit einem anderen Objekt kollidiert.
   * @param {Object} obj - Das Objekt, mit dem kollidiert werden soll.
   * @returns {Boolean} - True, wenn eine Kollision vorliegt, sonst False.
   */
  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.offsetY + this.height >= obj.y &&
      this.y + this.offsetY <= obj.y + obj.height
    );
  }
}
