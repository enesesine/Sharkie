// Helper-Funktionen zum Spawnen der normalen Feinde an sicheren Positionen
function spawnFish() {
  let fish = new Fish();
  // Überschreibe die x-Position, falls nötig (z. B. mindestens 500)
  fish.x = 500 + Math.random() * 2000;
  return fish;
}

function spawnFish2() {
  let fish2 = new Fish2();
  fish2.x = 500 + Math.random() * 2000;
  return fish2;
}

function spawnFish3() {
  let fish3 = new Fish3();
  fish3.x = 500 + Math.random() * 2000;
  return fish3;
}

// Level-Definition
const level1 = new Level(
  [
    spawnFish(),
    spawnFish(),
    spawnFish(),
    spawnFish2(),
    spawnFish2(),
    spawnFish3(),
    spawnFish3(),
    new Endboss(),
  ],
  [
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
  ],
  [
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    // Hier werden die PoisonBottle-Objekte initial platziert.
    new PoisonBottle(600, 250),
    new PoisonBottle(900, 200),
    new PoisonBottle(1200, 150),
    new PoisonBottle(1500, 220),
    new PoisonBottle(1800, 180),
  ]
);

// Respawn-Logik für PoisonBottles
// Alle 10 Sekunden prüfen: Wenn weniger als 5 PoisonBottle vorhanden sind, wird eine neu gespawnt.
setInterval(() => {
  let currentPoison = level1.collectibles.filter(
    (item) => item instanceof PoisonBottle
  ).length;
  if (currentPoison < 5) {
    let x = 500 + Math.random() * 2000; // Mindestens 500, damit Sharkie nicht betroffen ist
    let y = 150 + Math.random() * 150; // Beispielwert für Y
    level1.collectibles.push(new PoisonBottle(x, y));
    console.log(`🔄 PoisonBottle respawnt bei X=${x}, Y=${y}`);
  }
}, 10000);
