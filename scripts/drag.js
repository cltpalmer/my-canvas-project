import { isResizing } from './main.js';

function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  element.addEventListener('mousedown', (e) => {
    if (isResizing) return; // Prevent dragging if resizing is happening

    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    element.classList.add('selected');
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging && !isResizing) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

export { makeDraggable };
