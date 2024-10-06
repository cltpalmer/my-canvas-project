let layers = [];

export function addLayer(element) {
  const layersList = document.getElementById('layersList');

  // Add a new layer to the layers array
  layers.push(element);

  // Create a new list item for the layer
  const layerItem = document.createElement('li');
  layerItem.textContent = `Layer ${layers.length}`;
  layersList.appendChild(layerItem);

  // Optionally: Add click functionality for each layer to select the shape
  layerItem.addEventListener('click', () => {
    layers.forEach(layer => layer.classList.remove('selected'));
    element.classList.add('selected');
  });
}

export function toggleLayersPanel() {
  const layersPanel = document.getElementById('layersPanel');
  const collapseButton = document.getElementById('collapseButton');
  const isPanelVisible = layersPanel.style.display === 'block';

  if (isPanelVisible) {
    layersPanel.style.display = 'none';
    collapseButton.style.display = 'none';
    document.getElementById('layersIcon').style.display = 'flex';
  } else {
    layersPanel.style.display = 'block';
    collapseButton.style.display = 'block';
    document.getElementById('layersIcon').style.display = 'none';
  }
}

export function collapseLayersPanel() {
  const layersPanel = document.getElementById('layersPanel');
  const collapseButton = document.getElementById('collapseButton');

  layersPanel.style.display = 'none';
  collapseButton.style.display = 'none';
  document.getElementById('layersIcon').style.display = 'flex';
}

// Setup the layers button and collapse button
document.getElementById('layersIcon').addEventListener('click', toggleLayersPanel);
document.getElementById('collapseButton').addEventListener('click', collapseLayersPanel);
