class Fish extends MoveableObject {
  width = 90;
  height = 120;
  y = Math.random() * 300; // Zufällige Höhe zwischen 0 und 300
  speed = 0.5 + Math.random() * 1.5; // Zufällige Geschwindigkeit

  IMAGES_SWIMMING = [
    "Imgs/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "Imgs/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "Imgs/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "Imgs/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "Imgs/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);

    this.x = 800 + Math.random() * 2000; // Zufällige Startposition auf der X-Achse
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= this.speed; // Fisch bewegt sich nach links

      // Falls der Fisch aus dem Bildschirm schwimmt, respawn auf neuer Position
      if (this.x < -100) {
        this.x = 2800 + Math.random() * 500;
        this.y = Math.random() * 300; // Neue zufällige Höhe
      }
    }, 1000 / 60);

    // Animation aktivieren (Bildwechsel)
    setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING);
    }, 150);
  }
}
