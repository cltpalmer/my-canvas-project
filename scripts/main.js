import { setupControls, showToolbar } from './controls.js';
import { setupColorPicker } from './color.js';
import { addResizeHandles, removeResizeHandles } from './resize.js';
import { makeDraggable } from './drag.js';
import { addLayer } from './layers.js';
import { addTextElement } from './text.js';  // Import text handling

export let isResizing = false;  
export let selectedElement = null;

export function setIsResizing(value) {
  isResizing = value;
}

// Update properties like opacity and shadow only on the shape inside the wrapper
function updateShapeProperties() {
  const opacitySlider = document.getElementById('opacitySlider');
  const shadowSlider = document.getElementById('shadowSlider');
  
  // Update opacity and shadow based on slider inputs
  opacitySlider.addEventListener('input', (e) => {
    if (selectedElement) {
      const shape = selectedElement.querySelector('.shape-content');
      const value = e.target.value / 100;
      shape.style.opacity = value;
      shape.style.boxShadow = `0px 0px ${shape.style.boxShadow.split(' ')[2]} rgba(0, 0, 0, ${value})`;
    }
  });

  shadowSlider.addEventListener('input', (e) => {
    if (selectedElement) {
      const shape = selectedElement.querySelector('.shape-content');
      const shadowSize = e.target.value;
      const opacity = parseFloat(shape.style.opacity) || 1;
      shape.style.boxShadow = `0px 0px ${shadowSize}px rgba(0, 0, 0, ${opacity})`;
    }
  });
}

// This function handles selection and deselection of elements
export function selectElement(element, isText = false) {
  // Deselect the previously selected element
  if (selectedElement) {
    selectedElement.classList.remove('selected');
    removeResizeHandles(selectedElement);

    // Disable live editing for text if it was the previously selected element
    if (selectedElement.contentEditable === 'true') {
      selectedElement.contentEditable = 'false';
    }
  }

  selectedElement = element;
  selectedElement.classList.add('selected');

  // Show toolbar only if it's not a text element
  if (!isText) {
    showToolbar(true);

    // Update sliders with the current properties of the selected shape
    const shape = selectedElement.querySelector('.shape-content');
    document.getElementById('opacitySlider').value = parseFloat(shape.style.opacity) * 100 || 100;
    const shadowSize = parseInt(shape.style.boxShadow.split('px')[0]) || 16;
    document.getElementById('shadowSlider').value = shadowSize;
  } else {
    showToolbar(false);  // Hide the toolbar for text elements
  }

  addResizeHandles(element);
}

function addElement(type) {
  const canvas = document.getElementById('canvas');
  const wrapper = document.createElement('div');
  wrapper.classList.add('shape-wrapper'); // New wrapper div to hold the shape

  if (type === 'text') {
    addTextElement();  // Handle adding text
  } else {
    const shape = document.createElement('div');
    shape.classList.add('shape-content', type); // Shape inside the wrapper
    shape.style.width = '100px';
    shape.style.height = '100px';
    shape.style.backgroundColor = '#00FF00';
    shape.style.boxShadow = '0px 0px 16px rgba(0, 0, 0, 0.15)';
    shape.style.borderRadius = '7px';

    // Add the shape inside the wrapper
    wrapper.appendChild(shape);

    // Position the wrapper randomly on the canvas
    wrapper.style.top = `${Math.random() * (canvas.offsetHeight - 100)}px`;
    wrapper.style.left = `${Math.random() * (canvas.offsetWidth - 100)}px`;

    // Append wrapper to the canvas
    canvas.appendChild(wrapper);
    makeDraggable(wrapper);

    // Click event to select the element
    wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      selectElement(wrapper);
    });

    addResizeHandles(wrapper);  
    addLayer(wrapper);
  }
}

window.onload = function() {
  setupControls();
  setupColorPicker();
  updateShapeProperties();  // Ensure shape properties update based on slider input

  // Add click event to the "Add Text" button
  document.getElementById('addTextButton').addEventListener('click', () => addElement('text'));

  // Add click event to the "Add Square" button
  document.getElementById('addSquareButton').addEventListener('click', () => addElement('square'));

  // Deselect the element when clicking outside
  document.getElementById('canvas').addEventListener('click', (e) => {
    if (selectedElement) {
      selectedElement.classList.remove('selected');
      removeResizeHandles(selectedElement);
      selectedElement = null;
      showToolbar(false);  // Hide toolbar when no element is selected
    }
  });

  // Add event listener for the trash button to delete the selected element
  document.getElementById('trashButton').addEventListener('click', () => {
    if (selectedElement) {
      selectedElement.remove();  // Remove the selected element
      selectedElement = null;
      showToolbar(false);  // Hide toolbar after deletion
    }
  });
};
