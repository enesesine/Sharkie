class Fish extends MoveableObject {
  y = 250;
  height = 120;
  width = 90;

  constructor() {
    super().loadImage(
      "Imgs/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );

    this.x = 200 + Math.random() * 500;
  }
}
