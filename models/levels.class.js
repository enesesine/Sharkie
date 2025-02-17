/**
 * Represents a game level.
 */
class Level {
  enemies;
  backgroundObjects;
  collectibles;
  level_end_x = 2120;

  /**
   * Creates a new Level.
   * @param {Array<Object>} enemies - The enemies in the level.
   * @param {Array<Object>} backgroundObjects - The background objects.
   * @param {Array<Object>} collectibles - The collectibles in the level.
   */
  constructor(enemies, backgroundObjects, collectibles) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.collectibles = collectibles;
  }
}

/**
 * Creates a new instance of Level 1 with all initial objects.
 * Adjust the arrays as needed to match the level's initial state.
 * @returns {Level} A Level 1 instance.
 */
function createLevel1() {
  return new Level(
    spawnFishLevel1(),
    setBackgroundsLevel1(),
    spawnCollectiblesLevel1()
  );
}
