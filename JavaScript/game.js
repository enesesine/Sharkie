// game.js

// Global variables
let canvas;
let world;
let keyboard = new Keyboard(); // Die Keyboard-Klasse speichert, welche Tasten gerade gedrückt sind (z. B. LEFT, RIGHT, SPACE, C, D, etc.).
let backgroundMusic = new Audio("Audio/backgroundSound.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

// Game-Initialisierung (wird z. B. von startGame() aufgerufen)
function init() {
  clearAllGameIntervals(); // Alte Intervalle entfernen
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  world.statusBar.setPercentage(100);
  console.log("Game initialized", world);

  backgroundMusic.play().catch((err) => {
    console.error(
      "Hintergrundmusik konnte nicht automatisch gestartet werden:",
      err
    );
  });
}

// Toggle-Funktion für die Hintergrundmusik mit Änderung des Sound-Icons
function toggleMusic() {
  const soundToggle = document.getElementById("sound-toggle");
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch((err) => {
      console.error("Hintergrundmusik konnte nicht gestartet werden:", err);
    });
    // Zeige das "Sound-image", wenn Musik an ist
    soundToggle.src = "Imgs/7. Other/Sound-image.png";
  } else {
    backgroundMusic.pause();
    // Zeige das "Mute-image", wenn Musik aus ist
    soundToggle.src = "Imgs/7. Other/Mute-image.png";
  }
}

// Toggle-Funktion für den Fullscreen-Modus (nur für den Game-Container)
function toggleFullScreen() {
  const container = document.getElementById("game-container");
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => {
      alert(
        `Fehler beim Aktivieren des Fullscreens: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
}

// Keyboard-Event-Listener
window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") keyboard.RIGHT = true;
  if (event.code === "ArrowLeft") keyboard.LEFT = true;
  if (event.code === "ArrowUp") keyboard.UP = true;
  if (event.code === "ArrowDown") keyboard.DOWN = true;
  if (event.code === "Space") keyboard.SPACE = true;
  if (event.code === "KeyD") keyboard.D = true;
  if (event.code === "KeyC") keyboard.C = true;
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") keyboard.RIGHT = false;
  if (event.code === "ArrowLeft") keyboard.LEFT = false;
  if (event.code === "ArrowUp") keyboard.UP = false;
  if (event.code === "ArrowDown") keyboard.DOWN = false;
  if (event.code === "Space") keyboard.SPACE = false;
  if (event.code === "KeyD") keyboard.D = false;
  if (event.code === "KeyC") keyboard.C = false;
});

// DOMContentLoaded: Setze die Event-Listener für den Fullscreen-Button und den Sound-Toggle
document.addEventListener("DOMContentLoaded", () => {
  // Fullscreen-Button
  const fsBtn = document.getElementById("fullscreen-btn");
  if (fsBtn) {
    fsBtn.addEventListener("click", toggleFullScreen);
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        // Optional: Ändere das Bild für "Exit Fullscreen"
        // fsBtn.src = "Imgs/exit-fullscreen.png";
      } else {
        fsBtn.src = "Imgs/7. Other/fullscreen.png";
      }
    });
  }

  // Sound Toggle (Lautsprecher)
  const soundToggle = document.getElementById("sound-toggle");
  if (soundToggle) {
    soundToggle.addEventListener("click", toggleMusic);
  }
});
