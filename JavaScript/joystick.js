// Joystick-Initialisierung
function initJoystick() {
  const joystickContainer = document.getElementById("joystick-container");
  const joystick = document.getElementById("joystick");

  // Setze das Bild als Hintergrund, falls noch nicht in CSS gemacht
  joystick.style.background =
    'url("Imgs/7. Other/joystick.png") no-repeat center center';
  joystick.style.backgroundSize = "contain";

  let active = false;
  let startX = 0,
    startY = 0;
  const maxDistance = 40; // Maximale Verschiebung des Joysticks

  function onStart(event) {
    active = true;
    let clientX, clientY;
    if (event.touches) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    // Berechne den Mittelpunkt des Joystick-Containers
    const rect = joystickContainer.getBoundingClientRect();
    startX = rect.left + rect.width / 2;
    startY = rect.top + rect.height / 2;
    event.preventDefault();
  }

  function onMove(event) {
    if (!active) return;
    let clientX, clientY;
    if (event.touches) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    let deltaX = clientX - startX;
    let deltaY = clientY - startY;
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > maxDistance) {
      const ratio = maxDistance / distance;
      deltaX *= ratio;
      deltaY *= ratio;
    }
    // Setze die Position des Joysticks innerhalb des Containers
    joystick.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // Bestimme Richtungen anhand der Verschiebung (Schwellenwert z. B. 10px)
    keyboard.RIGHT = deltaX > 10;
    keyboard.LEFT = deltaX < -10;
    keyboard.DOWN = deltaY > 10;
    keyboard.UP = deltaY < -10;

    event.preventDefault();
  }

  function onEnd(event) {
    active = false;
    // Zurücksetzen der Joystick-Position
    joystick.style.transform = "translate(0px, 0px)";
    // Lösche alle Richtungs-Flags im Keyboard
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    event.preventDefault();
  }

  // Event-Listener für Maus und Touch
  joystickContainer.addEventListener("mousedown", onStart);
  joystickContainer.addEventListener("touchstart", onStart);

  document.addEventListener("mousemove", onMove);
  document.addEventListener("touchmove", onMove, { passive: false });

  document.addEventListener("mouseup", onEnd);
  document.addEventListener("touchend", onEnd);
}

// Nach DOMContentLoaded den Joystick initialisieren
document.addEventListener("DOMContentLoaded", () => {
  // Bestehende Listener für Fullscreen und Sound bleiben unverändert...
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
  const soundToggle = document.getElementById("sound-toggle");
  if (soundToggle) {
    soundToggle.addEventListener("click", toggleMusic);
  }

  // Initialisiere den Joystick (nur für Bildschirme zwischen 500px und 1200px)
  // Original:

  initJoystick();
});
