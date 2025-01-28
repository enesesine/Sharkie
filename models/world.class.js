class World {
  character = new Character();
  enemies = [new Fish(), new Fish(), new Fish()];
  backgroundObjects = [
    new BackgroundObject("  Imgs/3. Background/Layers/5. Water/D2.png", 0),

    new BackgroundObject(
      "  Imgs/3. Background/Legacy/Layers/3.Fondo 1/D1.png",
      0
    ),

    new BackgroundObject("Imgs/3. Background/Layers/4.Fondo 2/D1.png", 0),

    new BackgroundObject("Imgs/3. Background/Layers/2. Floor/D1.png", 0),

    new BackgroundObject("  Imgs/3. Background/Layers/5. Water/D1.png", 720),

    new BackgroundObject(
      "  Imgs/3. Background/Legacy/Layers/3.Fondo 1/D2.png",
      720
    ),

    new BackgroundObject("Imgs/3. Background/Layers/4.Fondo 2/D2.png", 720),
  ];

  surfaces = [new Surface()];
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

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }

    if (mo.img && mo.img.complete && mo.img.naturalWidth > 0) {
      this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
      if (mo.otherDirection) {
        mo.x = mo.x * -1;
        this.ctx.restore();
      }
    }
  }
}
