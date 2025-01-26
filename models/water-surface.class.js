class Surface extends MoveableObject {
  constructor() {
    super().loadImage(" Imgs/3. Background/Layers/5. Water/D.png");

    this.x = Math.random() * 500;
    this.y = 0;
    this.width = 2000;
  }
}
