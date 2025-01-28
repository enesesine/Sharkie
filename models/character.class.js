// character.class.js
class Character extends MoveableObject {
  height = 220;
  width = 170;
  y = 100;
  x = 5;
  speed = 10;

  // --- Kurze Idle-Animation (Breathing) ---
  IMAGES_STANDING = [
    "Imgs/1.Sharkie/1.IDLE/1.png",
    "Imgs/1.Sharkie/1.IDLE/2.png",
    "Imgs/1.Sharkie/1.IDLE/3.png",
    "Imgs/1.Sharkie/1.IDLE/4.png",
    "Imgs/1.Sharkie/1.IDLE/5.png",
    "Imgs/1.Sharkie/1.IDLE/6.png",
    "Imgs/1.Sharkie/1.IDLE/7.png",
    "Imgs/1.Sharkie/1.IDLE/8.png",
    "Imgs/1.Sharkie/1.IDLE/9.png",
    "Imgs/1.Sharkie/1.IDLE/10.png",
    "Imgs/1.Sharkie/1.IDLE/11.png",
    "Imgs/1.Sharkie/1.IDLE/12.png",
    "Imgs/1.Sharkie/1.IDLE/13.png",
    "Imgs/1.Sharkie/1.IDLE/14.png",
    "Imgs/1.Sharkie/1.IDLE/15.png",
    "Imgs/1.Sharkie/1.IDLE/16.png",
    "Imgs/1.Sharkie/1.IDLE/17.png",
    "Imgs/1.Sharkie/1.IDLE/18.png",
  ];

  // --- Lange Idle-Animation (Frames 1 bis 14) ---
  IMAGES_STANDING_LONG = [
    "Imgs/1.Sharkie/2.Long_IDLE/i1.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i2.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i3.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i4.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i5.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i6.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i7.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i8.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i9.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i10.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i11.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i12.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i13.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i14.png",
  ];

  // --- Lange Idle-Endlos-Schleife (nur Frames 11 bis 14) ---
  IMAGES_STANDING_LONG_LOOP = [
    "Imgs/1.Sharkie/2.Long_IDLE/i11.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i12.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i13.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i14.png",
  ];

  // --- Schwimm-Animation (Bewegung) ---
  IMAGES_SWIMMING = [
    "Imgs/1.Sharkie/3.Swim/1.png",
    "Imgs/1.Sharkie/3.Swim/2.png",
    "Imgs/1.Sharkie/3.Swim/3.png",
    "Imgs/1.Sharkie/3.Swim/4.png",
    "Imgs/1.Sharkie/3.Swim/5.png",
    "Imgs/1.Sharkie/3.Swim/6.png",
  ];

  // --- Attack, Hurt, usw. ---
  IMAGES_ATTACK_BUBBLE = [
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];

  IMAGES_ATTACK_SLAP = [
    "Imgs/1.Sharkie/4.Attack/Fin slap/1.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/2.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/3.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/4.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/5.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/6.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/7.png",
    "Imgs/1.Sharkie/4.Attack/Fin slap/8.png",
  ];

  IMAGES_HURT_POISON = [
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/3.png",
  ];

  IMAGES_HURT_SHOCK = [
    "Imgs/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "Imgs/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "Imgs/1.Sharkie/5.Hurt/2.Electric shock/3.png",
  ];

  IMAGES_DEAD_POISON = [
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/3.png",
  ];
  DEAD_BY_POISON = [
    "Imgs/1.Sharkie/6.dead/1.Poisoned/1.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/2.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/3.png",
  ];

  DEAD_BY_SHOCK = [
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/1.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/2.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/3.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/4.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/5.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/6.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/7.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/8.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/9.png",
    "Imgs/1.Sharkie/6.dead/2.Electro_shock/10.png",
  ];

  world;

  // --- Verschiedene Indizes zur Vermeidung von Flackern ---
  swimImageIndex = 0;
  idleImageIndex = 0;

  // Für "lange Idle":
  idleLongIntroIndex = 0; // i1.. i14
  idleLongLoopIndex = 0; // i11.. i14
  longIdleIntroDone = false;

  // Attack-Slap
  attackSlapIndex = 0;

  // **NEU**: Flag, ob Sharkie gerade angreift (Animation läuft)
  isAttacking = false;

  // Speichert Zeit (in ms), wann zuletzt Bewegung stattfand
  lastMovementTime = 0;

  constructor() {
    // Erstes Bild:
    super().loadImage("Imgs/1.Sharkie/1.IDLE/1.png");

    // Alle Bild-Arrays laden
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_STANDING_LONG);
    this.loadImages(this.IMAGES_STANDING_LONG_LOOP);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_ATTACK_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_SLAP);
    this.loadImages(this.IMAGES_HURT_POISON);
    this.loadImages(this.IMAGES_HURT_SHOCK);
    this.loadImages(this.IMAGES_DEAD_POISON);
    this.loadImages(this.DEAD_BY_POISON);
    this.loadImages(this.DEAD_BY_SHOCK);

    this.lastMovementTime = performance.now();
    this.animate();
  }

  animate() {
    this.animateHorizontalMovement();
    this.animateVerticalMovement();
    this.animateSwimming();
    this.animateIdle();
    this.animateAttackSlap();
  }

  animateHorizontalMovement() {
    setInterval(() => {
      const key = this.world.keyboard;
      let moved = false;

      if (key.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        moved = true;
      }
      if (key.LEFT && this.x > -300) {
        this.x -= this.speed;
        this.otherDirection = true;
        moved = true;
      }
      if (moved) {
        this.lastMovementTime = performance.now();
        this.resetLongIdle();
      }
      this.world.camera_x = -this.x + 5;
    }, 1000 / 60);
  }

  animateVerticalMovement() {
    setInterval(() => {
      const key = this.world.keyboard;
      let moved = false;

      if (key.DOWN && this.y < 270) {
        this.y += this.speed;
        moved = true;
      }
      if (key.UP && this.y > -50) {
        this.y -= this.speed;
        moved = true;
      }

      if (moved) {
        this.lastMovementTime = performance.now();
        this.resetLongIdle();
      }
    }, 1000 / 60);
  }

  animateSwimming() {
    setInterval(() => {
      const key = this.world.keyboard;

      // OPTIONAL: Wenn du Attack Vorrang geben willst, prüfe:
      // if (this.isAttacking) return;

      if (key.LEFT || key.RIGHT || key.UP || key.DOWN) {
        this.playAnimation(this.IMAGES_SWIMMING, "swimImageIndex");
      }
    }, 150);
  }

  animateIdle() {
    setInterval(() => {
      const key = this.world.keyboard;

      // OPTIONAL: Wenn Attack Vorrang, abfragen:
      // if (this.isAttacking) return;

      if (key.LEFT || key.RIGHT || key.UP || key.DOWN) {
        return;
      }
      let now = performance.now();
      let idleTime = now - this.lastMovementTime;

      if (idleTime < 5000) {
        this.playAnimation(this.IMAGES_STANDING, "idleImageIndex");
        return;
      }

      if (!this.longIdleIntroDone) {
        this.playLongIdleIntro();
      } else {
        this.playLongIdleLoop();
      }
    }, 150);
  }

  /**
   * NEU: Attack-Slap =>
   * - Einmal auslösen mit Tastendruck SPACE
   * - Dann Animation komplett durchlaufen (isAttacking = true)
   * - Nach letztem Frame => isAttacking = false, attackSlapIndex = 0
   */
  animateAttackSlap() {
    setInterval(() => {
      // Wenn wir gerade angreifen, spiele die Attack-Frames bis zum Ende
      if (this.isAttacking) {
        this.playAnimation(this.IMAGES_ATTACK_SLAP, "attackSlapIndex");

        // Wenn wir alle Frames durch haben, Attack vorbei
        if (this.attackSlapIndex >= this.IMAGES_ATTACK_SLAP.length) {
          this.isAttacking = false;
          this.attackSlapIndex = 0;
        }
      } else {
        // isAttacking = false => prüfen, ob SPACE gerade gedrückt wurde
        if (this.world.keyboard.SPACE) {
          // Angriff starten
          this.isAttacking = true;
          this.attackSlapIndex = 0; // Von vorn anfangen
        }
      }
    }, 150);
  }

  playLongIdleIntro() {
    let i = this.idleLongIntroIndex % this.IMAGES_STANDING_LONG.length;
    let path = this.IMAGES_STANDING_LONG[i];
    if (!this.imageCache[path]) {
      console.warn("Bildpfad nicht im Cache (Intro):", path);
      return;
    }
    this.img = this.imageCache[path];
    this.idleLongIntroIndex++;

    if (this.idleLongIntroIndex >= this.IMAGES_STANDING_LONG.length) {
      this.longIdleIntroDone = true;
    }
  }

  playLongIdleLoop() {
    let i = this.idleLongLoopIndex % this.IMAGES_STANDING_LONG_LOOP.length;
    let path = this.IMAGES_STANDING_LONG_LOOP[i];
    if (!this.imageCache[path]) {
      console.warn("Bildpfad nicht im Cache (Loop):", path);
      return;
    }
    this.img = this.imageCache[path];
    this.idleLongLoopIndex++;
  }

  resetLongIdle() {
    this.longIdleIntroDone = false;
    this.idleLongIntroIndex = 0;
    this.idleLongLoopIndex = 0;
  }

  playAnimation(images, indexName = "currentImage") {
    if (!this[indexName]) {
      this[indexName] = 0;
    }
    let i = this[indexName] % images.length;
    let path = images[i];
    if (!this.imageCache[path]) {
      console.warn(`Bildpfad nicht im Cache: ${path}`);
      return;
    }
    this.img = this.imageCache[path];
    this[indexName]++;
  }
}
