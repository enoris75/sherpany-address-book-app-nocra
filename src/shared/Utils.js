/**
 * Verify whether the bottom of the given element is shown in the screen
 * @param {Element} el
 */
export function isBottomOfElementOnScreen(el) {
  return el.getBoundingClientRect().bottom <= window.innerHeight;
}
