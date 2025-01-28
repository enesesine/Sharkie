class Bubble extends MoveableObject {
  constructor(x, y, goingLeft) {
    super().loadImage("Imgs/1.Sharkie/4.Attack/Bubble trap/Bubble.png"); // oder mehrere Bilder laden
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.goingLeft = goingLeft;
    this.speed = 6;
    this.animate();
  }

  animate() {
    this.moveInterval = setInterval(() => {
      if (this.goingLeft) this.x -= this.speed;
      else this.x += this.speed;
      // Hier ggf. prüfen, ob Bubble aus dem Canvas fliegt => entfernen
    }, 1000 / 60);
  }
}
