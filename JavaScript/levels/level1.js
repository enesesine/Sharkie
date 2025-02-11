const level1 = new Level(
  [
    new Fish(),
    new Fish(),
    new Fish(),
    new Fish2(),
    new Fish2(),
    new Fish3(),
    new Fish3(),
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
    new PoisonBottle(600, 250),
    new PoisonBottle(900, 200),
    new PoisonBottle(1200, 150),
    new PoisonBottle(1500, 220),
    new PoisonBottle(1800, 180),
  ]
);
