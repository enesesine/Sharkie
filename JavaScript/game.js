// Global variables
let canvas;
let world;
let keyboard = new Keyboard();

// Game-Initialisierung (wird z. B. von startGame() aufgerufen)
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  // HP-Statusbar initial auf 100% setzen
  world.statusBar.setPercentage(100);

  console.log("Game initialized", world);
}

// Keyboard-Event-Listener
window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") keyboard.RIGHT = true;
  if (event.code === "ArrowLeft") keyboard.LEFT = true;
  if (event.code === "ArrowUp") keyboard.UP = true;
  if (event.code === "ArrowDown") keyboard.DOWN = true;
  if (event.code === "Space") keyboard.SPACE = true;
  if (event.code === "KeyD") keyboard.D = true;
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") keyboard.RIGHT = false;
  if (event.code === "ArrowLeft") keyboard.LEFT = false;
  if (event.code === "ArrowUp") keyboard.UP = false;
  if (event.code === "ArrowDown") keyboard.DOWN = false;
  if (event.code === "Space") keyboard.SPACE = false;
  if (event.code === "KeyD") keyboard.D = false;
});

// Funktion zum Umschalten des Fullscreen-Modus
// Hier wird der Container mit der ID "game-container" in den Fullscreen-Modus versetzt,
// sodass nur der Canvas-Bereich vergrößert wird.
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

// Stelle sicher, dass der DOM vollständig geladen ist, bevor du auf den Fullscreen-Button zugreifst
document.addEventListener("DOMContentLoaded", () => {
  const fsBtn = document.getElementById("fullscreen-btn");
  if (fsBtn) {
    fsBtn.addEventListener("click", toggleFullScreen);

    // Optional: Bild anpassen, wenn der Fullscreen-Modus ein- oder ausgeschaltet wird
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        // Falls du ein anderes Bild für "Exit Fullscreen" verwenden möchtest:
        // fsBtn.src = "Imgs/exit-fullscreen.png";
      } else {
        fsBtn.src = "Imgs/fullscreen.png";
      }
    });
  }
});
