class Surface extends MoveableObject {
  constructor() {
    super();

    this.x = Math.random() * 500;
    this.y = 0;
    this.width = 2000;
  }
}
