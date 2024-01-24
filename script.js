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
  
    // Load the default template
    loadTemplate('template1.png');
  
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
  
    eraserBtn.addEventListener('click', enableEraser);
    clearBtn.addEventListener('click', clearCanvas);
    saveBtn.addEventListener('click', saveCanvas);
  
    // Handle template selection change
    templateSelect.addEventListener('change', function () {
      const selectedTemplate = this.value;
      loadTemplate(selectedTemplate);
    });
  
    function loadTemplate(templateUrl) {
      const img = new Image();
      img.src = `/templates/${templateUrl}`;
      img.onload = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
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
  
      context.fillStyle = eraserBtn.classList.contains('active') ? '#ffffff' : colorPicker.value;
      const size = brushSizeInput.value;
      context.fillRect(x, y, size, size);
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
  
    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    function saveCanvas() {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'coloring_page.png';
      link.click();
    }
  });
  