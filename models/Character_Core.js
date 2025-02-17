/**
 * Represents the main character (Sharkie).
 * @extends MoveableObject
 */
class Character extends MoveableObject {
  // Eigenschaften
  height = 220;
  width = 170;
  x = 5;
  y = 100;
  speed = 6;
  hp = 100;
  isDead = false;
  isHurt = false;
  lastDamageTime = 0;
  hurtStartTime = 0;
  hurtDuration = 1000;
  damageCooldown = 1000;
  hurtImageIndex = 0;
  currentHurtImages = null;
  // Animation arrays
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
  IMAGES_STANDING_LONG_LOOP = [
    "Imgs/1.Sharkie/2.Long_IDLE/i11.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i12.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i13.png",
    "Imgs/1.Sharkie/2.Long_IDLE/i14.png",
  ];
  IMAGES_SWIMMING = [
    "Imgs/1.Sharkie/3.Swim/1.png",
    "Imgs/1.Sharkie/3.Swim/2.png",
    "Imgs/1.Sharkie/3.Swim/3.png",
    "Imgs/1.Sharkie/3.Swim/4.png",
    "Imgs/1.Sharkie/3.Swim/5.png",
    "Imgs/1.Sharkie/3.Swim/6.png",
  ];
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
    "Imgs/1.Sharkie/5.Hurt/1.Poisoned/4.png",
  ];
  IMAGES_HURT_SHOCK = [
    "Imgs/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "Imgs/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "Imgs/1.Sharkie/5.Hurt/2.Electric shock/3.png",
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
  DEATH_IMAGES = [
    "Imgs/1.Sharkie/6.dead/1.Poisoned/1.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/2.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/3.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/4.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/5.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/6.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/7.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/8.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/9.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/10.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/11.png",
    "Imgs/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];
  IMAGES_ATTACK_POISONED_BUBBLE = [
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png",
    "Imgs/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png",
  ];
  // Zustände für Angriffe und Animationen
  isBubbleAttacking = false;
  bubbleAttackIndex = 0;
  isPoisonBubbleAttacking = false;
  poisonBubbleAttackIndex = 0;
  // Animationszustände
  world;
  swimImageIndex = 0;
  idleImageIndex = 0;
  idleLongIntroIndex = 0;
  idleLongLoopIndex = 0;
  longIdleIntroDone = false;
  attackSlapIndex = 0;
  isAttacking = false;
  lastMovementTime = 0;
  lastBubbleTime = 0;
  bubbleCooldown = 500;
  deathImageIndex = 0;
  // Offsets
  bubbleSpawnOffsetX = 140;
  bubbleSpawnOffsetY = 140;
  // Sounds
  fishSwimmingSound = new Audio("Audio/fishSwimming.ogg");
  bubblePopSound = new Audio("Audio/Bubble_Pop_Attack.mp3");
  coinPickUpSound = new Audio("Audio/Coin_PickUp.ogg");
  poisonBottleSound = new Audio("Audio/Poisoned_Bottle_Sound.ogg");
  electricitySound = new Audio("Audio/electricity-sound.mp3");
  swimSoundInterval = null;
  wasPoisonKeyPressed = false;

  /**
   * Creates a new Character instance.
   */
  constructor() {
    super().loadImage("Imgs/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_STANDING_LONG);
    this.loadImages(this.IMAGES_STANDING_LONG_LOOP);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_ATTACK_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_SLAP);
    this.loadImages(this.IMAGES_HURT_POISON);
    this.loadImages(this.IMAGES_HURT_SHOCK);
    this.loadImages(this.DEAD_BY_POISON);
    this.loadImages(this.DEAD_BY_SHOCK);
    this.loadImages(this.DEATH_IMAGES);
    this.loadImages(this.IMAGES_ATTACK_POISONED_BUBBLE);
    this.x = 5;
    this.spawnX = this.x;
    this.lastMovementTime = performance.now();
    this.swimSoundInterval = setGameInterval(() => {
      const kb = this.world ? this.world.keyboard : null;
      kb && (kb.LEFT || kb.RIGHT || kb.UP || kb.DOWN)
        ? this.playFishSwimmingSound()
        : this.stopFishSwimmingSound();
    }, 100);
  }

  // Allgemeine Methoden
  resetLongIdle() {
    this.longIdleIntroDone = false;
    this.idleLongIntroIndex = 0;
    this.idleLongLoopIndex = 0;
    this.lastMovementTime = performance.now();
  }
  resetAFKTimer() {
    this.resetLongIdle();
  }
  playAnimation(images, indexName = "currentImage") {
    if (this.isHurt || this.isDead) return;
    if (!this[indexName]) this[indexName] = 0;
    const index = this[indexName] % images.length;
    const path = images[index];
    if (!this.imageCache[path]) return;
    this.img = this.imageCache[path];
    this[indexName]++;
  }
  playHurtAnimation() {
    const images = this.currentHurtImages || this.IMAGES_HURT_SHOCK;
    if (this.hurtImageIndex < images.length) {
      const path = images[this.hurtImageIndex];
      if (!this.imageCache[path]) return;
      this.img = this.imageCache[path];
      this.hurtImageIndex++;
    } else {
      this.isBeingHit = false;
      this.hurtImageIndex = 0;
      this.currentHurtImages = null;
    }
  }
  // Sound-Methoden
  playFishSwimmingSound() {
    if (this.fishSwimmingSound.paused)
      this.fishSwimmingSound.play().catch(() => {});
  }
  stopFishSwimmingSound() {
    if (!this.fishSwimmingSound.paused) {
      this.fishSwimmingSound.pause();
      this.fishSwimmingSound.currentTime = 0;
    }
  }
}
