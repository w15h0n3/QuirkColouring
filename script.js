// script.js
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('coloringCanvas');
    const context = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSizeInput = document.getElementById('brushSize');
    const eraserBtn = document.getElementById('eraserBtn');
    const clearBtn = document.getElementById('clearBtn');
    const saveBtn = document.getElementById('saveBtn');
    const templateSelect = document.getElementById('templateSelect');
  
    let isDrawing = false;
    let templateImage = new Image();
  
    // Load the default template
    loadTemplate('template1.png');
  
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
  
    eraserBtn.addEventListener('click', enableEraser);
    clearBtn.addEventListener('click', clearUserDrawings);
    saveBtn.addEventListener('click', saveCanvas);
  
    // Handle template selection change
    templateSelect.addEventListener('change', function () {
      const selectedTemplate = this.value;
      loadTemplate(selectedTemplate);
    });
  
    function loadTemplate(templateUrl) {
      templateImage.src = `https://raw.githubusercontent.com/w15h0n3/QuirkColouring/main/${templateUrl}`;
      templateImage.onload = function () {
        // Draw the template first
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(templateImage, 0, 0, canvas.width, canvas.height);
      };
    }
  
    function startDrawing(e) {
      isDrawing = true;
      draw(e);
    }
  
    function draw(e) {
      if (!isDrawing) return;
  
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;
  
      context.globalCompositeOperation = eraserBtn.classList.contains('active') ? 'destination-out' : 'source-over';
      context.fillStyle = colorPicker.value;
      const size = brushSizeInput.value;
  
      // Draw the user's drawings with the 'source-in' composite operation
      context.fillRect(x, y, size, size);
      context.globalCompositeOperation = 'source-in';
      context.drawImage(templateImage, 0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = 'source-over'; // Reset the composite operation
    }
  
    function stopDrawing() {
      isDrawing = false;
    }
  
    function enableEraser() {
      eraserBtn.classList.toggle('active');
      if (eraserBtn.classList.contains('active')) {
        colorPicker.value = '#ffffff'; // Set color to white for eraser
      } else {
        colorPicker.value = '#000000'; // Reset color to black
      }
    }
  
    function clearUserDrawings() {
      // Clear the entire canvas, including the template
      context.clearRect(0, 0, canvas.width, canvas.height);
      loadTemplate(templateSelect.value);
    }
  
    function saveCanvas() {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'coloring_page.png';
      link.click();
    }
  });
  