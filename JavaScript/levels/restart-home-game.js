function homeGame() {
  // Lösche alle aktiven Intervalle, um Konflikte zu vermeiden
  clearAllGameIntervals();
  // Blende den Game Over Screen aus
  document.getElementById("game-over-screen").style.display = "none";
  // Blende den Game-Container aus
  document.getElementById("game-container").style.display = "none";
  // Blende den Startscreen ein
  document.getElementById("startscreen").style.display = "flex";
}

function restartGame() {
  clearAllGameIntervals();
  // Blende den Game Over Screen aus
  document.getElementById("game-over-screen").style.display = "none";
  // Blende den Startscreen aus
  document.getElementById("startscreen").style.display = "none";
  // Stelle sicher, dass der Game-Container sichtbar ist
  document.getElementById("game-container").style.display = "block";
  // Mache den Canvas sichtbar
  document.getElementById("canvas").style.display = "block";

  // Starte das Spiel neu:
  init();
}
