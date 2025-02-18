/**
 * Displays the controls popup via an alert.
 */
function showControls() {
  alert(
    "Steuerung:\n- Pfeiltasten: Bewegung\n- D: Bubble Attack\n- C: Poisoned Bubble Attack\n- Space: Slap Attack"
  );
}

/**
 * Displays the imprint information.
 */
function showImprint() {
  alert(
    "Impressum:\nEntwickelt von Enes Hadzic\nKontakt: contacthadzic@gmail.com"
  );
}

/**
 * Displays the privacy information.
 */
function showPrivacy() {
  alert("Datenschutz:\nDieses Spiel speichert keine persönlichen Daten.");
}

/**
 * Starts the game by hiding the startscreen and showing the game container.
 */
function startGame() {
  document.getElementById("startscreen").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  document.getElementById("canvas").style.display = "block";
  init();
}

/**
 * Opens a popup with the specified content.
 * @param {string} type - The type of content to display ("controls", "imprint", "privacy").
 */
/**
 * Öffnet das Popup-Fenster mit dem gewünschten Inhalt.
 * @param {string} type - "controls", "imprint" oder "privacy".
 */
function openPopup(type) {
  const contentMap = {
    controls: `<h2>Steuerung</h2>
<p>🡆 Pfeiltasten: Bewegung</p>
<p>🡆 D: Bubble Attack</p>
<p>🡆 C: Poisoned Bubble Attack</p>
<p>🡆 Space: Slap Attack</p>`,
    imprint: `<h2>Impressum</h2>
<p>Entwickelt von Enes Hadzic</p>
<p>Kontakt: contacthadzic@gmail.com</p>`,
    privacy: `<h2>Datenschutz</h2>
<p>Dieses Spiel speichert keine persönlichen Daten.</p>`,
  };
  document.getElementById("popup-content").innerHTML = contentMap[type] || "";
  document.getElementById("popup-overlay").style.display = "block";
  document.getElementById("popup-container").style.display = "block";
}

/**
 * Closes the popup.
 */
function closePopup() {
  document.getElementById("popup-overlay").style.display = "none";
  document.getElementById("popup-container").style.display = "none";
}
