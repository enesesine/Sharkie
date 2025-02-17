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
   * Updates the state of a key based on the keyboard event.
   * @param {KeyboardEvent} event - The keyboard event.
   * @param {boolean} state - True for keydown, false for keyup.
   */
  setKeyState(event, state) {
    const keyMap = {
      ArrowLeft: "LEFT",
      ArrowRight: "RIGHT",
      ArrowUp: "UP",
      ArrowDown: "DOWN",
      Space: "SPACE",
      KeyD: "D",
      KeyC: "C",
    };
    const keyName = keyMap[event.code];
    if (keyName) {
      if (state && !this.keyPressed[event.code]) {
        this[keyName] = true;
        this.keyPressed[event.code] = true;
      } else if (!state) {
        this[keyName] = false;
        this.keyPressed[event.code] = false;
      }
    }
  }
}
