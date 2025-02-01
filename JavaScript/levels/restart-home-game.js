function homeGame() {
  // Blende den Game Over Screen aus
  document.getElementById("game-over-screen").style.display = "none";
  // Blende den Game-Container aus
  document.getElementById("game-container").style.display = "none";
  // Blende den Startscreen ein
  document.getElementById("startscreen").style.display = "flex";
}

function restartGame() {
  // Blende den Game Over Screen aus
  document.getElementById("game-over-screen").style.display = "none";
  // Blende den Startscreen aus
  document.getElementById("startscreen").style.display = "none";
  // Stelle sicher, dass der Game-Container sichtbar ist
  document.getElementById("game-container").style.display = "block";
  // Mache den Canvas sichtbar (falls er per Inline-Style auf "none" gesetzt wurde)
  document.getElementById("canvas").style.display = "block";

  // Starte das Spiel neu:
  init();
}
