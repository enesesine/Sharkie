function startGame() {
  document.getElementById("startscreen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  init(); // Startet das Spiel
}

function showControls() {
  alert(
    "Steuerung:\n- Pfeiltasten: Bewegung\n- D: Bubble Attack\n- Space: Slap Attack"
  );
}

function showImprint() {
  alert("Impressum:\nEntwickelt von [Dein Name]\nKontakt: [Deine E-Mail]");
}

function showPrivacy() {
  alert("Datenschutz:\nDein Spiel speichert keine persönlichen Daten.");
}

function startGame() {
  document.getElementById("startscreen").style.display = "none";
  // Neu: Den Game-Container einblenden
  document.getElementById("game-container").style.display = "block";
  document.getElementById("canvas").style.display = "block";
  init(); // Startet das Spiel
}

/**
 * Öffnet das Popup-Fenster mit dem gewünschten Inhalt.
 * @param {string} type - Welcher Inhalt geladen werden soll ("controls", "imprint", "privacy")
 */
function openPopup(type) {
  let content = "";

  if (type === "controls") {
    content = `
            <h2>Steuerung</h2>
            <p>🡆 Pfeiltasten: Bewegung</p>
            
            <p>🡆 D: Bubble Attack</p>
                 <p>🡆 C: Poisoned Bubble Attack</p>
            <p>🡆 Space: Slap Attack</p>
        `;
  } else if (type === "imprint") {
    content = `
            <h2>Impressum</h2>
            <p>Entwickelt von Enes Hadzic</p>
            <p>Kontakt: contacthadzic@gmail.com</p>
        `;
  } else if (type === "privacy") {
    content = `
            <h2>Datenschutz</h2>
            <p>Dieses Spiel speichert keine persönlichen Daten.</p>
        `;
  }

  document.getElementById("popup-content").innerHTML = content;
  document.getElementById("popup-overlay").style.display = "block";
  document.getElementById("popup-container").style.display = "block";
}

/**
 * Schließt das Popup-Fenster.
 */
function closePopup() {
  document.getElementById("popup-overlay").style.display = "none";
  document.getElementById("popup-container").style.display = "none";
}
