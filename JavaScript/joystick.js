/**
 * Initializes the on-screen joystick using pointer events.
 */
function initJoystick() {
  const container = document.getElementById("joystick-container");
  const joystick = document.getElementById("joystick");
  joystick.style.background =
    'url("Imgs/7. Other/joystick.png") no-repeat center center';
  joystick.style.backgroundSize = "contain";
  let active = false,
    startX = 0,
    startY = 0;
  const maxDistance = 40;

  /**
   * Pointer down handler.
   * @param {PointerEvent} event - The pointer event.
   */
  function onPointerDown(event) {
    active = true;
    container.setPointerCapture(event.pointerId);
    const rect = container.getBoundingClientRect();
    startX = rect.left + rect.width / 2;
    startY = rect.top + rect.height / 2;
    event.preventDefault();
  }

  /**
   * Pointer move handler.
   * @param {PointerEvent} event - The pointer event.
   */
  function onPointerMove(event) {
    if (!active) return;
    const { clientX, clientY } = event;
    let deltaX = clientX - startX;
    let deltaY = clientY - startY;
    const distance = Math.hypot(deltaX, deltaY);
    if (distance > maxDistance) {
      const ratio = maxDistance / distance;
      deltaX *= ratio;
      deltaY *= ratio;
    }
    joystick.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    keyboard.RIGHT = deltaX > 10;
    keyboard.LEFT = deltaX < -10;
    keyboard.DOWN = deltaY > 10;
    keyboard.UP = deltaY < -10;
    event.preventDefault();
  }

  /**
   * Pointer up/cancel handler.
   * @param {PointerEvent} event - The pointer event.
   */
  function onPointerUp(event) {
    active = false;
    joystick.style.transform = "translate(0px, 0px)";
    keyboard.RIGHT = keyboard.LEFT = keyboard.UP = keyboard.DOWN = false;
    container.releasePointerCapture(event.pointerId);
    event.preventDefault();
  }

  container.addEventListener("pointerdown", onPointerDown);
  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerup", onPointerUp);
  container.addEventListener("pointercancel", onPointerUp);
}

document.addEventListener("DOMContentLoaded", () => {
  const attackBubbleBtn = document.getElementById("attack-bubble");
  const attackPoisonBtn = document.getElementById("attack-poison");

  attackBubbleBtn.addEventListener("click", () => {
    const character = window.world.character;
    if (!character.isBubbleAttacking) {
      character.isBubbleAttacking = true;
      character.bubbleAttackIndex = 0;
      character.shootBubbleAttack();
    }
  });

  attackPoisonBtn.addEventListener("click", () => {
    const character = window.world.character;
    if (
      !character.isPoisonBubbleAttacking &&
      window.world.collectedPoisonBottles > 0
    ) {
      character.isPoisonBubbleAttacking = true;
      character.poisonBubbleAttackIndex = 0;
      character.resetAFKTimer();
    }
  });

  initJoystick();
});
