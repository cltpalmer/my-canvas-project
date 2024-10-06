function showToolbar(show) {
    const toolbar = document.getElementById('toolbar');
    toolbar.style.display = show ? 'flex' : 'none';
  }
  
  // Show/Hide sliders based on button clicks and ensure only one slider is visible at a time
  function toggleSlider(sliderId) {
    const sliders = {
      opacitySlider: document.getElementById('opacitySlider'),
      shadowSlider: document.getElementById('shadowSlider'),
      radiusSlider: document.getElementById('radiusSlider')
    };
  
    // Hide all sliders initially
    for (const slider in sliders) {
      sliders[slider].style.display = 'none';
    }
  
    // Show the slider corresponding to the clicked button
    const slider = sliders[sliderId];
    slider.style.display = 'block';
  
    // Hide the slider when clicking outside
    document.addEventListener('click', (e) => {
      if (!slider.contains(e.target) && e.target.id !== sliderId) {
        slider.style.display = 'none';
      }
    });
  }
  
  function setupControls() {
    document.getElementById('opacityButton').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSlider('opacitySlider');
    });
  
    document.getElementById('shadowButton').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSlider('shadowSlider');
    });
  
    document.getElementById('radiusButton').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSlider('radiusSlider');
    });
  }
  
  export { showToolbar, setupControls };
  