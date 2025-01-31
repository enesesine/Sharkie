/**
 * Zeigt den Game Over Screen und versteckt das Spielfeld.
 */
function showGameOverScreen() {
  document.getElementById("canvas").style.display = "none";
  document.getElementById("gameover-screen").style.display = "flex";
}

/**
 * Startet das Spiel neu.
 */
function restartGame() {
  document.getElementById("gameover-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  init(); // Neues Spiel starten
}

/**
 * Geht zurück zum Startscreen.
 */
function goToHome() {
  document.getElementById("gameover-screen").style.display = "none";
  document.getElementById("startscreen").style.display = "flex";
}
