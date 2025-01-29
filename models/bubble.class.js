// bubble.class.js
class Bubble extends MoveableObject {
  constructor(x, y, goingLeft, world) {
    super().loadImage("Imgs/1.Sharkie/4.Attack/Bubble trap/Bubble.png"); // Stelle sicher, dass der Pfad korrekt ist
    this.x = x;
    this.y = y;
    this.width = 20; // Kleinere Bubble
    this.height = 20; // Kleinere Bubble
    this.goingLeft = goingLeft;
    this.speed = 6; // Schnellere Bubble
    this.world = world; // Welt-Referenz speichern
    this.animate();
  }

  animate() {
    // Bewegungsintervall starten
    this.moveInterval = setInterval(() => {
      if (this.goingLeft) {
        this.x -= this.speed;
      } else {
        this.x += this.speed;
      }

      // Überprüfe, ob die Bubble aus dem Canvas fliegt und entferne sie
      if (
        this.x < -this.width ||
        this.x > this.world.canvas.width + this.width
      ) {
        this.removeBubble();
      }
    }, 1000 / 60);

    // Bubble nach 3 Sekunden entfernen
    this.lifeTimeout = setTimeout(() => {
      this.removeBubble();
    }, 3000);
  }

  removeBubble() {
    // Entferne die Bubble aus dem bubbles Array der Welt
    let index = this.world.bubbles.indexOf(this);
    if (index >= 0) {
      this.world.bubbles.splice(index, 1);
    }
    // Stoppe das Bewegungsintervall und das Timeout
    clearInterval(this.moveInterval);
    clearTimeout(this.lifeTimeout);
  }
}
