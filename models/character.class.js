class Character extends MoveableObject {
  height = 250;
  width = 200;
  y = 100;
  x = 5;

  constructor() {
    super().loadImage("Imgs/1.Sharkie/2.Long_IDLE/i1.png");
  }

  jump() {}
}
