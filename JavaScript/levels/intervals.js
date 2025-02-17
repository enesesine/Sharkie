/**
 * Global array to store game interval IDs.
 * @global
 */
window.gameIntervals = [];

/**
 * Calls setInterval and stores the timer ID.
 * @param {Function} fn - The function to execute.
 * @param {number} delay - The delay in milliseconds.
 * @returns {number} The timer ID.
 */
function setGameInterval(fn, delay) {
  const id = setInterval(fn, delay);
  window.gameIntervals.push(id);
  return id;
}

/**
 * Clears all game intervals and stops the character's swim sound if active.
 */
function clearAllGameIntervals() {
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
