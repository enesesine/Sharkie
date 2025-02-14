// keyboard.class.js
class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;
  C = false;

  // Dieses Objekt speichert, ob ein Key bereits als gedrückt registriert wurde
  keyPressed = {};

  constructor() {
    window.addEventListener("keydown", (e) => this.onKeyDown(e));
    window.addEventListener("keyup", (e) => this.onKeyUp(e));
  }

  onKeyDown(event) {
    // Für Pfeiltasten, Space, D und C wird geprüft, ob der Key bereits gedrückt wurde.
    switch (event.code) {
      case "ArrowLeft":
        if (!this.keyPressed["ArrowLeft"]) {
          this.LEFT = true;
          this.keyPressed["ArrowLeft"] = true;
        }
        break;
      case "ArrowRight":
        if (!this.keyPressed["ArrowRight"]) {
          this.RIGHT = true;
          this.keyPressed["ArrowRight"] = true;
        }
        break;
      case "ArrowUp":
        if (!this.keyPressed["ArrowUp"]) {
          this.UP = true;
          this.keyPressed["ArrowUp"] = true;
        }
        break;
      case "ArrowDown":
        if (!this.keyPressed["ArrowDown"]) {
          this.DOWN = true;
          this.keyPressed["ArrowDown"] = true;
        }
        break;
      case "Space":
        if (!this.keyPressed["Space"]) {
          this.SPACE = true;
          this.keyPressed["Space"] = true;
        }
        break;
      case "KeyD":
        if (!this.keyPressed["KeyD"]) {
          this.D = true;
          this.keyPressed["KeyD"] = true;
        }
        break;
      case "KeyC":
        if (!this.keyPressed["KeyC"]) {
          this.C = true;
          this.keyPressed["KeyC"] = true;
        }
        break;
      default:
        break;
    }
  }

  onKeyUp(event) {
    switch (event.code) {
      case "ArrowLeft":
        this.LEFT = false;
        this.keyPressed["ArrowLeft"] = false;
        break;
      case "ArrowRight":
        this.RIGHT = false;
        this.keyPressed["ArrowRight"] = false;
        break;
      case "ArrowUp":
        this.UP = false;
        this.keyPressed["ArrowUp"] = false;
        break;
      case "ArrowDown":
        this.DOWN = false;
        this.keyPressed["ArrowDown"] = false;
        break;
      case "Space":
        this.SPACE = false;
        this.keyPressed["Space"] = false;
        break;
      case "KeyD":
        this.D = false;
        this.keyPressed["KeyD"] = false;
        break;
      case "KeyC":
        this.C = false;
        this.keyPressed["KeyC"] = false;
        break;
      default:
        break;
    }
  }
}
