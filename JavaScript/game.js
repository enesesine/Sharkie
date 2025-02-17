/**
 * Global variables.
 * @global
 */
window.keyboard = new Keyboard();
let canvas;
let world;
let backgroundMusic = new Audio("Audio/backgroundSound.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

/**
 * Initializes the mute state based on localStorage.
 * If muted, pauses background music and updates the sound icon.
 */
function initializeMuteState() {
  const soundToggle = document.getElementById("sound-toggle");
  const isMuted = localStorage.getItem("muteStatus") === "true";
  if (isMuted) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    soundToggle.src = "Imgs/7. Other/mute.png";
  } else {
    soundToggle.src = "Imgs/7. Other/Sound-image.png";
  }
}

/**
 * Initializes the game.
 */
function init() {
  clearAllGameIntervals();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  window.world = world;
  world.statusBar.setPercentage(100);
  // Initialize mute state and start background music if not muted
  initializeMuteState();
  if (localStorage.getItem("muteStatus") !== "true") {
    backgroundMusic.play().catch(() => {});
  }
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
  if (localStorage.getItem("muteStatus") !== "true") {
    backgroundMusic.play().catch(() => {});
  }
}

/**
 * Toggles the background music and updates the sound icon.
 * The mute state is stored in localStorage.
 */
function toggleMusic() {
  const soundToggle = document.getElementById("sound-toggle");
  const isMuted = localStorage.getItem("muteStatus") === "true";
  if (isMuted) {
    backgroundMusic.play().catch(() => {});
    soundToggle.src = "Imgs/7. Other/Sound-image.png";
    localStorage.setItem("muteStatus", "false");
  } else {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    soundToggle.src = "Imgs/7. Other/mute.png";
    localStorage.setItem("muteStatus", "true");
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
