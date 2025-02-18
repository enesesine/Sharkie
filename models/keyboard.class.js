/**
 * Handles keyboard input.
 */
class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;
  C = false;
  keyPressed = {};

  /**
   * Creates a new Keyboard instance and attaches key event listeners.
   */
  constructor() {
    window.addEventListener("keydown", (e) => this.setKeyState(e, true));
    window.addEventListener("keyup", (e) => this.setKeyState(e, false));
  }

  /**
   * Sets the key state based on a keyboard event.
   * @param {KeyboardEvent} event - The keyboard event.
   * @param {boolean} state - True if the key is pressed, false if released.
   */
  setKeyState(event, state) {
    const key = {
      ArrowLeft: "LEFT",
      ArrowRight: "RIGHT",
      ArrowUp: "UP",
      ArrowDown: "DOWN",
      Space: "SPACE",
      KeyD: "D",
      KeyC: "C",
    }[event.code];
    if (!key) return;
    if (state && !this.keyPressed[event.code]) this[key] = true;
    else if (!state) this[key] = false;
    this.keyPressed[event.code] = state;
  }
}
