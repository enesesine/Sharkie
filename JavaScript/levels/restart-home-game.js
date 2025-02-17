function homeGame() {
  clearAllGameIntervals();
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "none"; // Hier den Win-Screen ausblenden
  document.getElementById("game-container").style.display = "none";
  document.getElementById("startscreen").style.display = "flex";
}

function restartGame() {
  clearAllGameIntervals();
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "none"; // Hier den Win-Screen ausblenden
  document.getElementById("startscreen").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  document.getElementById("canvas").style.display = "block";

  init();
}
