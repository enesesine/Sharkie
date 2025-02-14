// game.js

// Global variables
let canvas;
let world;
let keyboard = new Keyboard(); // Die Keyboard-Klasse speichert, welche Tasten gerade gedrückt sind.
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

// Reset-Funktion: Setzt den gesamten Spielzustand zurück, ohne die Seite neu zu laden.
function resetGame() {
  // Alle aktiven Intervalle löschen
  clearAllGameIntervals();

  // UI-Elemente ausblenden (Game Over und Win-Screen)
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "none";

  // Wichtig: Neuer Level-Zustand wird erzeugt:
  level1 = createLevel1(); // Stelle sicher, dass createLevel1() alle Objekte frisch initialisiert

  // Neues World-Objekt erstellen – dadurch wird die komplette Welt neu aufgebaut
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  world.statusBar.setPercentage(100);

  // Hintergrundmusik zurücksetzen und neu starten
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  backgroundMusic.play().catch((err) => console.error(err));

  console.log("Game has been reset", world);
}

// Toggle-Funktion für die Hintergrundmusik mit Änderung des Sound-Icons
function toggleMusic() {
  const soundToggle = document.getElementById("sound-toggle");
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch((err) => {
      console.error("Hintergrundmusik konnte nicht gestartet werden:", err);
    });
    soundToggle.src = "Imgs/7. Other/Sound-image.png";
  } else {
    backgroundMusic.pause();
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

// Hinweis: Die Keyboard-Event-Listener sind nun in der Keyboard-Klasse implementiert,
// daher wurden die Listener in diesem File entfernt.

// DOMContentLoaded: Setze die Event-Listener für den Fullscreen-Button und den Sound-Toggle
document.addEventListener("DOMContentLoaded", () => {
  // Fullscreen-Button
  const fsBtn = document.getElementById("fullscreen-btn");
  if (fsBtn) {
    fsBtn.addEventListener("click", toggleFullScreen);
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        // Optional: Bild für "Exit Fullscreen" ändern
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
