class VideoObj {
    constructor(x, y, w, h, videoElement, context) {
        this.videoElement = videoElement;
        this.context = context;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.shapeX = 10;
        this.shapeY = 10;
        this.shapeCol = "#000000";


        let self = this;//creates a copy 


        let filterButton_blur = document.getElementById("filter_button_blur");//getting html button element and naming filterButton_blur
        let blurInput = document.getElementById("blurnum");//getting html button input and naming it blurInput
        this.userProvidedBlur = 0;//sets beginng value to 0

        filterButton_blur.addEventListener("click", function () {
            //get value from input field
            self.userProvidedBlur = blurInput.value;
            //console.log(self.userProvidedBlur);

        });


        let filterButton_sepia = document.getElementById("filter_button_sepia");
        let sepiaInput = document.getElementById("sepianum");
        this.userProvidedSepia = 0;

        filterButton_sepia.addEventListener("click", function () {
            self.userProvidedSepia = sepiaInput.value;
            //console.log(self.userProvidedSepia);
        });


        let filterButton_hue = document.getElementById("filter_button_hue");
        let hueInput = document.getElementById("huenum");
        this.userProvidedHue = 0;

        filterButton_hue.addEventListener("click", function () {
            self.userProvidedHue = hueInput.value;
            //console.log(self.userProvidedHue);
        });


        let filterButton_invert = document.getElementById("filter_button_invert");
        let invertInput = document.getElementById("invertnum");
        this.userProvidedInvert = 0;

        filterButton_invert.addEventListener("click", function () {
            self.userProvidedInvert = invertInput.value;
            //console.log(self.userProvidedInvert);
        });

    }

    display() {
        this.context.save();

        //adds all filters
        this.context.filter = `
        blur(${this.userProvidedBlur}px)
        sepia(${this.userProvidedSepia}%)
        hue-rotate(${this.userProvidedHue}deg)
        invert(${this.userProvidedInvert}%)`;


        this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);


        this.context.fillStyle = this.shapeCol;
        this.context.fillRect(this.shapeX, this.shapeY, 50, 50)

        this.context.restore();

    }

    //called when rectangle color is to be updated
    changeColor(newCol) {
        /** FILL IN */
        this.shapeCol = newCol;
    }
    //called when rectangle Pos is to be updated
    updatePositionRect(mx, my) {
        /** FILL IN */
        this.shapeX = mx;
        this.shapeY = my;
    }
    update(videoElement) {
        this.videoElement = videoElement;
    }
}