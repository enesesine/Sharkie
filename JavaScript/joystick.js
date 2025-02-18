/**
 * Initializes the on-screen joystick.
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
   * Handles the start of joystick interaction.
   * @param {Event} event - The event object.
   */
  function onStart(event) {
    active = true;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    const rect = container.getBoundingClientRect();
    startX = rect.left + rect.width / 2;
    startY = rect.top + rect.height / 2;
    event.preventDefault();
  }

  /**
   * Handles joystick movement.
   * @param {Event} event - The event object.
   */
  function onMove(event) {
    if (!active) return;
    const { clientX, clientY } = event.touches ? event.touches[0] : event;
    let deltaX = clientX - startX,
      deltaY = clientY - startY,
      distance = Math.hypot(deltaX, deltaY);
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
   * Handles the end of joystick interaction.
   * @param {Event} event - The event object.
   */
  function onEnd(event) {
    active = false;
    joystick.style.transform = "translate(0px, 0px)";
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    event.preventDefault();
  }

  container.addEventListener("mousedown", onStart);
  container.addEventListener("touchstart", onStart);
  document.addEventListener("mousemove", onMove);
  container.addEventListener("touchmove", onMove, { passive: false });
  document.addEventListener("mouseup", onEnd);
  container.addEventListener("touchend", onEnd);
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
