import { selectedElement } from './main.js';

function setupColorPicker() {
  document.getElementById('colorPicker').addEventListener('input', (e) => {
    if (selectedElement) {
      selectedElement.style.backgroundColor = e.target.value;
    }
  });
}

export { setupColorPicker };
