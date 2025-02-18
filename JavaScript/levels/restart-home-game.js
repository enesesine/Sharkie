function homeGame() {
  clearAllGameIntervals();
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "none"; // Hier den Win-Screen ausblenden
  document.getElementById("game-container").style.display = "none";
  document.getElementById("startscreen").style.display = "flex";
}

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
