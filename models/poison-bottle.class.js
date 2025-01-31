// poison-bottle.class.js
class PoisonBottle extends MoveableObject {
  width = 40;
  height = 50;

  IMAGES = [
    "Imgs/4. Marcadores/Posión/Animada/1.png",
    "Imgs/4. Marcadores/Posión/Animada/2.png",
    "Imgs/4. Marcadores/Posión/Animada/3.png",
    "Imgs/4. Marcadores/Posión/Animada/4.png",
    "Imgs/4. Marcadores/Posión/Animada/5.png",
    "Imgs/4. Marcadores/Posión/Animada/6.png",
    "Imgs/4. Marcadores/Posión/Animada/7.png",
    "Imgs/4. Marcadores/Posión/Animada/8.png",
  ];

  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 150);
  }
}
