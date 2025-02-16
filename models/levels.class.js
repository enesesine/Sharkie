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
  return new Level(
    spawnFishLevel1(),
    setBackgroundsLevel1(),
    spawnCollectiblesLevel1()
  );
}
