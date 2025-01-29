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
    }
    this.ctx.restore();
  }

  /**
   * Spawn-Methode für Bubbles.
   * Positioniert die Bubble direkt aus Sharkies Mund und fügt sie dem bubbles Array hinzu.
   */
  spawnBubble(sharkie) {
    // Rücksetzen der Offsets auf ursprüngliche Werte
    let offsetX = sharkie.otherDirection ? -20 : 50; // Ursprüngliche seitliche Anpassung
    let offsetY = 120; // Ursprüngliche vertikale Anpassung

    // Berechne die exakten Positionen
    let bubbleX = sharkie.x + offsetX;
    let bubbleY = sharkie.y + offsetY;

    // Debugging-Logs zur Überprüfung der Position
    console.log(`Sharkie Position: x=${sharkie.x}, y=${sharkie.y}`);
    console.log(`Bubble Position: x=${bubbleX}, y=${bubbleY}`);

    // Erstelle und füge die Bubble hinzu
    let bubble = new Bubble(bubbleX, bubbleY, sharkie.otherDirection, this);
    this.bubbles.push(bubble);
  }
}
