class PoisonedBubble extends MoveableObject {
  // Nur ein einziges Image
  IMAGES = [
    "Imgs/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png",
  ];

  constructor(x, y, goingLeft, world) {
    // Lade das einzige Bild
    super().loadImage(this.IMAGES[0]);

    this.world = world;
    // Speichere die Startpositionen (falls benötigt)
    this.initialX = x;
    this.initialY = y;

    // Setze Startposition
    this.x = x;
    this.y = y;

    this.width = 65;
    this.height = 65;

    this.goingLeft = goingLeft;
    // Setze die Geschwindigkeit exakt gleich wie bei der normalen Bubble
    this.speed = 10;

    // Da es nur ein Bild gibt, brauchen wir keine Frame-Animation.
    // Falls du dennoch einen Timer benötigst, kannst du die animate()-Methode leer lassen.
  }

  // Keine eigene update()-Methode – die Bewegung wird über die World gesteuert.

  // Leere animate()-Methode, da kein Framewechsel nötig ist.
  animate() {}

  removeBubble() {
    const index = this.world.bubbles.indexOf(this);
    if (index >= 0) {
      this.world.bubbles.splice(index, 1);
    }
  }
}
