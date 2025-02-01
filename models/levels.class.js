class Level {
  enemies;
  backgroundObjects;
  collectibles;
  level_end_x = 2100;

  constructor(enemies, backgroundObjects, collectibles) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.collectibles = collectibles;
  }
}
