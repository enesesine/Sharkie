class ThrowableBubble extends MoveableObject {
  // Basis-Eigenschaften, analog zum Kollegen-Code
  speedX = 20; // (wird hier zwar definiert, aber in calculateShot nicht direkt genutzt)
  hz = 144; // Aktualisierungsfrequenz in Hertz

  // Offset-Einstellungen (können ggf. noch angepasst werden)
  offset = {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  };

  /**
   * Erzeugt ein neues ThrowableBubble-Objekt.
   * @param {number} x - Die Basis-x-Position (z. B. Sharkies x + Offset).
   * @param {number} y - Die Basis-y-Position (z. B. Sharkies y + Offset).
   * @param {World} world - Referenz auf die Spielwelt.
   */
  constructor(x, y, world) {
    // Nutzt das WebP-Bild (du kannst auch dein PNG verwenden)
    super().loadImage("Imgs/1.Sharkie/4.Attack/Bubble trap/Bubble.webp");
    this.world = world;
    // Setze die Dimensionen der Bubble (40x40 Pixel, analog zum Kollegen-Code)
    this.width = 40;
    this.height = 40;
    // Berechne den angepassten x-Wert anhand der Blickrichtung des Charakters
    this.x = this.setX(x);
    this.y = y;
    // Starte die Wurf-Animation (d.h. die Bewegung der Bubble)
    this.throw();
  }

  /**
   * Passt die x-Position der Bubble an – abhängig davon, ob der Charakter nach links schaut.
   * @param {number} x - Die ursprüngliche x-Position.
   * @returns {number} - Die angepasste x-Position.
   */
  setX(x) {
    if (this.world.character.otherDirection === true) {
      return x - this.world.character.width;
    } else {
      // Nutzt den rechten Offset des Charakters, falls definiert
      return (
        x -
        (this.world.character.offset ? this.world.character.offset.right : 0)
      );
    }
  }

  /**
   * Startet den Wurf der Bubble.
   * Setzt die vertikale Geschwindigkeit und startet ein stoppbares Interval, das die Position der Bubble regelmäßig aktualisiert.
   */
  throw() {
    // Setze initial eine vertikale Geschwindigkeit (Basiswert)
    this.speedY = 1;
    // Speichere die x-Position zum Zeitpunkt des Feuerns
    const currentX = this.x;
    // Bestimme die Richtung: 1 für rechts, -1 für links
    const direction = this.world.character.otherDirection ? -1 : 1;
    // Starte ein stoppbares Interval, das in jedem Schritt calculateShot aufruft
    setStoppableInterval(
      this.calculateShot.bind(this, currentX, direction),
      1000 / this.hz
    );
  }

  /**
   * Berechnet die Bewegung der Bubble.
   * Die Bubble bewegt sich in x‑Richtung (jeweils um "direction" inkrementiert) und passt ihre y‑Position anhand der zurückgelegten Strecke an.
   * @param {number} currentX - Die x-Position zum Zeitpunkt des Wurfs.
   * @param {number} direction - Die Wurfrichtung (1 oder -1).
   */
  calculateShot(currentX, direction) {
    // Erhöhe die x-Position – (hier wird 1 Pixel pro Intervall addiert; der Effekt hängt von hz ab)
    this.x += direction;
    // Berechne, wie weit die Bubble seit dem Wurf in x-Richtung zurückgelegt hat
    let distance = this.x - currentX;
    // Solange die Bubble noch nicht 500 Pixel (in Richtung) zurückgelegt hat, wird die y-Position organisch angepasst
    if (distance * direction <= 500) {
      this.y += Math.sin(distance / 35) * 0.3;
    } else {
      // Danach wird die Bubble leicht nach unten gezogen
      this.y -= 1.25;
    }
    // Entferne die Bubble, wenn sie aus dem sichtbaren Bereich des Canvas ist
    if (this.x < -this.width || this.x > this.world.canvas.width + this.width) {
      this.removeBubble();
    }
  }

  /**
   * Entfernt die Bubble aus dem Array der throwableObjects in der Welt.
   */
  removeBubble() {
    const index = this.world.throwableObjects.indexOf(this);
    if (index >= 0) {
      this.world.throwableObjects.splice(index, 1);
    }
  }
}
