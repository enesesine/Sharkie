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
    this.spawnTime = Date.now(); // Zeitpunkt des Spawnings
    this.otherDirection = false; // Verhindere Spiegelung
  }

  /**
   * Update-Methode, die von der World-Klasse aufgerufen wird.
   * Bewegt die Bubble und prüft, ob sie entfernt werden muss.
   */
  update() {
    // Bewegung basierend auf Richtung und Geschwindigkeit
    if (this.goingLeft) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }

    // Debugging-Logs
    console.log(`Bubble Position: x=${this.x}, y=${this.y}`);

    // Überprüfen, ob die Bubble aus dem Canvas fliegt
    if (this.x < -this.width || this.x > this.world.canvas.width + this.width) {
      console.log("Bubble verlässt den Canvas und wird entfernt.");
      this.removeBubble();
      return; // Frühzeitig zurückkehren, um weitere Prüfungen zu vermeiden
    }

    // Überprüfen, ob die Bubble 3 Sekunden alt ist
    if (Date.now() - this.spawnTime >= 3000) {
      console.log("Bubble ist 3 Sekunden alt und wird entfernt.");
      this.removeBubble();
      return;
    }
  }

  /**
   * Entfernt die Bubble aus dem bubbles Array der Welt.
   */
  removeBubble() {
    const index = this.world.bubbles.indexOf(this);
    if (index >= 0) {
      this.world.bubbles.splice(index, 1);
    }
    // Keine Notwendigkeit, Intervalle oder Timeouts zu stoppen, da wir diese nicht mehr verwenden
  }
}
