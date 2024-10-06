import { addResizeHandles, removeResizeHandles } from './resize.js';
import { makeDraggable } from './drag.js';
import { selectElement } from './main.js';  // Import selectElement

// Add text to the canvas
export function addTextElement() {
  const canvas = document.getElementById('canvas');
  const element = document.createElement('div');
  element.classList.add('shape', 'text-element');
  element.textContent = 'type here...'; // Default text
  element.style.fontSize = '16px';  // Default font size
  element.style.width = '200px'; // Fixed width for the text box
  element.style.height = 'auto';  // Adjust height based on content

  // Position the text box in the middle of the screen
  element.style.top = `${(canvas.offsetHeight / 2) - 25}px`;
  element.style.left = `${(canvas.offsetWidth / 2) - 100}px`;

  canvas.appendChild(element);
  makeDraggable(element);

  // Automatically select the text element and add resize handles
  selectElement(element, true);

  // Allow inline editing directly on the canvas
  element.addEventListener('dblclick', () => {
    element.contentEditable = 'true';  // Enable live editing
    element.focus();  // Focus on the text for immediate editing
  });

  // Add resize handles for the text box
  addResizeHandles(element);
}
