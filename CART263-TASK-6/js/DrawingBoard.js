class DrawingBoard {
    /* Constructor */
    constructor(canvas, context, drawingBoardId) {
        this.canvas = canvas;
        this.context = context;
        this.objectsOnCanvas = [];
        let self = this;
        this.drawingBoardId = drawingBoardId;
        //each element has a mouse clicked and a mouse over
        this.canvas.addEventListener("click", function (e) {
            self.clickCanvas(e);
        });

        this.canvas.addEventListener("mousemove", function (e) {
            self.overCanvas(e);

            // console.log("mouseover")
        });
    }

    overCanvas(e) {
        console.log("over");
        this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
        this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
        this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
        console.log(this.mouseOffsetX, this.mouseOffsetY);
        //differentiate which canvas
        //you can remove the console.logs /// 
        if (this.drawingBoardId === "partA") {
            //this.objectsOnCanvas=[]; 
            console.log("in A")
        }
        if (this.drawingBoardId === "partB") {
            console.log("in B")
        }
        if (this.drawingBoardId === "partC") {
            console.log("in C")
        }
        if (this.drawingBoardId === "partD") {
            console.log("in D")
            for (let i = 0; i < this.objectsOnCanvas.length; i++) {
                let mx = this.mouseOffsetX;//name current mouseX mx
                let my = this.mouseOffsetY;//name current mouseY my
                this.objectsOnCanvas[i].updatePositionRect(mx, my);//apply this function to all objs in canvas, which is only the rectangle rn
            }
        }
    }

    clickCanvas(e) {
        // console.log("clicked");
        this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
        this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
        this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
        //console.log(this.mouseOffsetX, this.mouseOffsetY);

        //differentiate which canvas
        //you can remove the console.logs /// 
        if (this.drawingBoardId === "partA") {
        }
        if (this.drawingBoardId === "partB") {
            console.log("in B")
        }
        if (this.drawingBoardId === "partC") {
            console.log("in C")
        }
        if (this.drawingBoardId === "partD") {
            console.log("in D");
            for (let i = 0; i < this.objectsOnCanvas.length; i++) {//go through all objects in canvas
                //made it rgb because I prefer it to hex
                let r = Math.floor(Math.random() * 255);
                let g = Math.floor(Math.random() * 255);
                let b = Math.floor(Math.random() * 255);

                let randomColor = `rgb(${r}, ${g}, ${b})`;

                this.objectsOnCanvas[i].changeColor(randomColor)//apply change color function to all object on canvas
            }
        }
    }
    /* method to add obj to canvas */
    addObj(objToAdd) {

        this.objectsOnCanvas.push(objToAdd);
    }

    clearObjs() {
        this.objectsOnCanvas = [];
    }

    /* method to add display objects on canvas */
    display() {
        for (let i = 0; i < this.objectsOnCanvas.length; i++) {
            this.objectsOnCanvas[i].display();
        }
    }

    /* method to add animate objects on canvas */
    animate() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let i = 0; i < this.objectsOnCanvas.length; i++) {
            this.objectsOnCanvas[i].update();
            this.objectsOnCanvas[i].display();
        }
    }

    run(videoElement) {
        for (let i = 0; i < this.objectsOnCanvas.length; i++) {
            this.objectsOnCanvas[i].update(videoElement);
            this.objectsOnCanvas[i].display();
        }

    }
}