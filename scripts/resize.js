import { setIsResizing, isResizing } from './main.js';

export function makeResizable(handle, element, corner) {
  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();  // Prevent default browser actions like text selection
    setIsResizing(true);
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
  });

  function resize(e) {
    if (!isResizing) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const shape = element.querySelector('.shape-content');  // Get the inner shape
    const MIN_SIZE = 50;  // Minimum size constraint
    const MAX_SIZE = 800; // Maximum size constraint

    // Resizing logic for the wrapper and the shape inside it
    if (corner.includes('right')) {
      const newWidth = e.clientX - rect.left;
      if (newWidth > MIN_SIZE && newWidth < MAX_SIZE) {
        element.style.width = `${newWidth}px`;
        shape.style.width = `${newWidth}px`;  // Apply width to the shape
      }
    }
    if (corner.includes('left')) {
      const newWidth = rect.right - e.clientX;
      if (newWidth > MIN_SIZE && newWidth < MAX_SIZE) {
        element.style.width = `${newWidth}px`;
        element.style.left = `${e.clientX}px`;
        shape.style.width = `${newWidth}px`;  // Apply width to the shape
      }
    }
    if (corner.includes('bottom')) {
      const newHeight = e.clientY - rect.top;
      if (newHeight > MIN_SIZE && newHeight < MAX_SIZE) {
        element.style.height = `${newHeight}px`;
        shape.style.height = `${newHeight}px`;  // Apply height to the shape
      }
    }
    if (corner.includes('top')) {
      const newHeight = rect.bottom - e.clientY;
      if (newHeight > MIN_SIZE && newHeight < MAX_SIZE) {
        element.style.height = `${newHeight}px`;
        element.style.top = `${e.clientY}px`;
        shape.style.height = `${newHeight}px`;  // Apply height to the shape
      }
    }
  }

  function stopResize() {
    setIsResizing(false);  // End resizing process
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
  }
}

export function addResizeHandles(element) {
  removeResizeHandles(element);

  const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

  corners.forEach(corner => {
    const handle = document.createElement('div');
    handle.classList.add('resize-handle', corner);
    element.appendChild(handle);
    makeResizable(handle, element, corner);
  });
}

export function removeResizeHandles(element) {
  const handles = element.querySelectorAll('.resize-handle');
  handles.forEach(handle => handle.remove());
}
