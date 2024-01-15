const imageProcess = new ImageProcess;

// Get the file input element
fileInput = document.getElementById('myImage');

// Add event listener for file input change
fileInput.addEventListener('change', imageProcess.handleFileSelect);