/**
 * Global variables.
 * @global
 */
let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic = new Audio("Audio/backgroundSound.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

/**
 * Initializes the game.
 */
function init() {
  clearAllGameIntervals();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  window.world = world;
  world.statusBar.setPercentage(100);
  backgroundMusic.play().catch(() => {});
}

/**
 * Resets the game state without reloading the page.
 */
function resetGame() {
  clearAllGameIntervals();
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "none";
  level1 = createLevel1();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  world.statusBar.setPercentage(100);
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  backgroundMusic.play().catch(() => {});
}

/**
 * Toggles the background music and updates the sound icon.
 */
function toggleMusic() {
  const soundToggle = document.getElementById("sound-toggle");
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch(() => {});
    soundToggle.src = "Imgs/7. Other/Sound-image.png";
  } else {
    backgroundMusic.pause();
    soundToggle.src = "Imgs/7. Other/mute.png";
  }
}

/**
 * Toggles fullscreen mode for the game container.
 */
function toggleFullScreen() {
  const container = document.getElementById("game-container");
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const fsBtn = document.getElementById("fullscreen-btn");
  if (fsBtn) {
    fsBtn.addEventListener("click", toggleFullScreen);
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        fsBtn.src = "Imgs/7. Other/fullscreen.png";
      }
    });
  }
  const soundToggle = document.getElementById("sound-toggle");
  if (soundToggle) {
    soundToggle.addEventListener("click", toggleMusic);
  }
});
