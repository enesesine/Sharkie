// levels.class.js
class Level {
  enemies;
  backgroundObjects;
  collectibles;
  level_end_x = 2120;

  constructor(enemies, backgroundObjects, collectibles) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.collectibles = collectibles;
  }
}

/**
 * Erzeugt eine neue Instanz von Level 1 mit allen Ausgangsobjekten.
 * Passe die Arrays an, damit sie den ursprünglichen Zustand deines Levels wiedergeben.
 */
function createLevel1() {
  // Beispielinstanzen – bitte an deine tatsächlichen Klassen und Parameter anpassen:

  // Gegner (zum Beispiel: Fish, Fish2, Endboss)
  const enemies = [
    new Fish(), // Beispiel: Ein normaler Fisch
    new Fish2(), // Beispiel: Ein anderer Fischtyp
    new Endboss(), // Beispiel: Der Endboss
  ];

  // Hintergrundobjekte – Hier wird angenommen, dass der BackgroundObject-Konstruktor einen Bildpfad und eine X-Position erwartet.
  const backgroundObjects = [
    new BackgroundObject("Imgs/3. Background/Legacy/Dark/1.png", 0),
    new BackgroundObject("Imgs/3. Background/Legacy/Dark/2.png", 720),
  ];

  // Sammelobjekte (Coins, Poison Bottles)
  // Hier wird angenommen, dass der Coin- und der PoisonBottle-Konstruktor eventuell Positionen erwartet.
  const collectibles = [
    new Coin(100, 350), // Beispiel: Ein Coin an Position (100,350)
    new Coin(300, 350), // Ein weiterer Coin
    new PoisonBottle(500, 350), // Eine Poison Bottle an Position (500,350)
  ];

  return new Level(enemies, backgroundObjects, collectibles);
}
