// intervals.js
window.gameIntervals = [];

/**
 * Ruft setInterval auf und speichert die Timer-ID in window.gameIntervals.
 * @param {Function} fn - Die Funktion, die ausgeführt werden soll.
 * @param {number} delay - Das Intervall in Millisekunden.
 * @returns {number} - Die ID des Intervalls.
 */
function setGameInterval(fn, delay) {
  const id = setInterval(fn, delay);
  window.gameIntervals.push(id);
  return id;
}

/**
 * Löscht alle in window.gameIntervals gespeicherten Intervalle.
 * Zusätzlich wird, falls vorhanden, der swimSoundInterval des Characters beendet.
 */
function clearAllGameIntervals() {
  // Falls es einen globalen world und einen Character gibt, beende dessen swimSoundInterval
  if (
    window.world &&
    window.world.character &&
    window.world.character.swimSoundInterval
  ) {
    clearInterval(window.world.character.swimSoundInterval);
    window.world.character.swimSoundInterval = null;
  }

  window.gameIntervals.forEach((id) => clearInterval(id));
  window.gameIntervals = [];
}
