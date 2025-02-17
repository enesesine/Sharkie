/**
 * Spawns a Fish enemy.
 * @returns {Fish} A Fish instance.
 */
function spawnFish() {
  const fish = new Fish();
  fish.x = 500 + Math.random() * 2000;
  return fish;
}

/**
 * Spawns a Fish2 enemy.
 * @returns {Fish2} A Fish2 instance.
 */
function spawnFish2() {
  const fish2 = new Fish2();
  fish2.x = 500 + Math.random() * 2000;
  return fish2;
}

/**
 * Spawns a Fish3 enemy.
 * @returns {Fish3} A Fish3 instance.
 */
function spawnFish3() {
  const fish3 = new Fish3();
  fish3.x = 500 + Math.random() * 2000;
  return fish3;
}

/**
 * Creates an array of enemies for Level 1.
 * @returns {Array<Object>} Array of enemy instances.
 */
function spawnFishLevel1() {
  return [
    spawnFish(),
    spawnFish(),
    spawnFish(),
    spawnFish2(),
    spawnFish2(),
    spawnFish3(),
    spawnFish3(),
    new Endboss(),
  ];
}

/**
 * Creates an array of background objects for Level 1.
 * @returns {Array<BackgroundObject>} Array of background object instances.
 */
function setBackgroundsLevel1() {
  return [
    new BackgroundObject("Imgs/3. Background/Layers/5. Water/D2.png", -720 * 2),
    new BackgroundObject(
      "Imgs/3. Background/Legacy/Layers/3.Fondo 1/D1.png",
      -720 * 2
    ),
    new BackgroundObject(
      "Imgs/3. Background/Layers/4.Fondo 2/D1.png",
      -720 * 2
    ),
    new BackgroundObject("Imgs/3. Background/Layers/2. Floor/D1.png", -720 * 2),
    new BackgroundObject("Imgs/3. Background/Layers/5. Water/D1.png", -720),
    new BackgroundObject(
      "Imgs/3. Background/Legacy/Layers/3.Fondo 1/D2.png",
      -720
    ),
    new BackgroundObject("Imgs/3. Background/Layers/4.Fondo 2/D2.png", -720),
    new BackgroundObject("Imgs/3. Background/Layers/2. Floor/D2.png", -720),
    new BackgroundObject("Imgs/3. Background/Layers/5. Water/D2.png", 0),
    new BackgroundObject(
      "Imgs/3. Background/Legacy/Layers/3.Fondo 1/D1.png",
      0
    ),
    new BackgroundObject("Imgs/3. Background/Layers/4.Fondo 2/D1.png", 0),
    new BackgroundObject("Imgs/3. Background/Layers/2. Floor/D1.png", 0),
    new BackgroundObject("Imgs/3. Background/Layers/5. Water/D1.png", 720),
    new BackgroundObject(
      "Imgs/3. Background/Legacy/Layers/3.Fondo 1/D2.png",
      720
    ),
    new BackgroundObject("Imgs/3. Background/Layers/4.Fondo 2/D2.png", 720),
    new BackgroundObject("Imgs/3. Background/Layers/2. Floor/D2.png", 720),
    new BackgroundObject("Imgs/3. Background/Layers/5. Water/D2.png", 720 * 2),
    new BackgroundObject(
      "Imgs/3. Background/Legacy/Layers/3.Fondo 1/D1.png",
      720 * 2
    ),
    new BackgroundObject("Imgs/3. Background/Layers/4.Fondo 2/D1.png", 720 * 2),
    new BackgroundObject("Imgs/3. Background/Layers/2. Floor/D1.png", 720 * 2),
    new BackgroundObject("Imgs/3. Background/Layers/5. Water/D1.png", 720 * 3),
    new BackgroundObject(
      "Imgs/3. Background/Legacy/Layers/3.Fondo 1/D2.png",
      720 * 3
    ),
    new BackgroundObject("Imgs/3. Background/Layers/4.Fondo 2/D2.png", 720 * 3),
    new BackgroundObject("Imgs/3. Background/Layers/2. Floor/D2.png", 720 * 3),
  ];
}

/**
 * Creates an array of collectibles for Level 1.
 * @returns {Array<Object>} Array of collectible instances.
 */
function spawnCollectiblesLevel1() {
  return [
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new PoisonBottle(600, 250),
    new PoisonBottle(900, 200),
    new PoisonBottle(1200, 150),
    new PoisonBottle(1500, 220),
    new PoisonBottle(1800, 180),
  ];
}

/**
 * Creates a new Level 1 instance.
 * @returns {Level} Level 1 instance.
 */
let level1 = new Level(
  spawnFishLevel1(),
  setBackgroundsLevel1(),
  spawnCollectiblesLevel1()
);

/**
 * Respawns poison bottles if fewer than 5 are present.
 */
setInterval(() => {
  const currentPoison = level1.collectibles.filter(
    (item) => item instanceof PoisonBottle
  ).length;
  if (currentPoison < 5) {
    const x = 500 + Math.random() * 2000;
    const y = 150 + Math.random() * 150;
    level1.collectibles.push(new PoisonBottle(x, y));
  }
}, 10000);
