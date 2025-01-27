class Surface extends MoveableObject {
  constructor() {
    super().loadImage(" Imgs/3. Background/Layers/xx. Water/D.png");
    // "xx um das bild zu blocken"

    this.x = Math.random() * 500;
    this.y = 0;
    this.width = 2000;
  }
}
