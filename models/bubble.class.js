class Bubble extends MoveableObject {
  constructor(x, y, goingLeft, world) {
    super().loadImage("Imgs/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    // Speichere die initialen Weltkoordinaten
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.goingLeft = goingLeft;
    this.speed = 6; // Wird später in spawnBubble überschrieben
    this.world = world;
  }

  update() {
    // Bewege die Bubble in X-Richtung unabhängig von Sharkie
    if (this.goingLeft) {
      this.x -= this.speed;
    } else {
      this.x += this.speed;
    }

    // Berechne die horizontale Distanz, die seit dem Spawn zurückgelegt wurde
    let distance = this.x - this.initialX;

    // Organische Oszillation der Y-Position basierend auf der zurückgelegten Distanz
    let amplitude = 5; // Kann angepasst werden
    this.y = this.initialY + Math.sin(distance / 35) * amplitude;

    // Entferne die Bubble, wenn sie zu weit fliegt oder außerhalb des Canvas ist
    if (
      this.x < -this.width ||
      this.x > this.world.canvas.width + this.width ||
      Math.abs(distance) > 500 // z.B. nach 500 Pixeln
    ) {
      this.removeBubble();
    }
  }

  removeBubble() {
    const index = this.world.bubbles.indexOf(this);
    if (index >= 0) {
      this.world.bubbles.splice(index, 1);
    }
  }
}
