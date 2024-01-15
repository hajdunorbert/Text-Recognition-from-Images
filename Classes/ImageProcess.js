class ImageProcess {
    constructor() {
        // Get the file input element
        this.fileInput = document.getElementById('myImage');

        this.imageContext = [];

        this.textOnImage = [];
    }

    handleFileSelect = (e) => {
        // Remove the event listener to prevent further executions
        this.fileInput.removeEventListener('change', this.handleFileSelect);

        var img = new Image(); // Create a new Image element
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        // Get the selected file from the input
        var selectedFile = e.target.files[0];

        if (selectedFile) {
            var reader = new FileReader();

            // Load the selected file into the Image element
            reader.onload = function (event) {
                img.src = event.target.result;
            };

            // When the image is loaded, draw it onto the canvas
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);

                this.imageContext.push({
                    imgWidth: img.width,
                    imgHeight: img.height
                });

                // Get pixel data
                var imageData = ctx.getImageData(0, 0, img.width, img.height);
                var pixels = imageData.data;

                // Iterate through pixels
                for (var i = 0; i < pixels.length; i += 4) {
                    var red = pixels[i];
                    var green = pixels[i + 1];
                    var blue = pixels[i + 2];
                    var alpha = pixels[i + 3];

                    let pixelData = {
                        red: red,
                        green: green,
                        blue: blue,
                        alpha: alpha
                    };

                    this.imageContext.push(pixelData);
                }

                this.processImageData();
            };

            // Read the selected file as a data URL
            reader.readAsDataURL(selectedFile);
        }
    }

    processImageData = () => {
        //Get image dimensions
        let imgWidth = this.imageContext[0].imgWidth;
        let imgHeight = this.imageContext[0].imgHeight;

        let mostLeftPixel = 0;

        let rowData = [];

        //Loop through all the pixels
        for(let i = 0; i < this.imageContext.length; i++){
            //Check if the pixel is darker than the background
            if(this.imageContext[i].red < 100 && this.imageContext[i].green < 100 && this.imageContext[i].blue < 100){
                rowData.push(1);
            }else{
                rowData.push(0);
            }

            if (i % imgWidth === 0) {
                this.textOnImage.push(rowData);
                rowData = [];
            }
        }
        //remove the first empty entry from the array
        this.textOnImage.splice(0, 1);

        

        console.log(this.textOnImage);
    }
}