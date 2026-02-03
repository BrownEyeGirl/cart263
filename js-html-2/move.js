window.onload = function() {
    console.log("move");

    // make a surface (draw-box-a) able to register mouse movement 
    this.document.querySelector("#draw-box-a").addEventListener("mousemove", mouseMoveFunction) // mousemove, callback function (can be annonymous or a callback function)

    console.log(document.querySelector("#draw-box-a").getBoundingClientRect()) // getBoundingClientRect() gets the hight, top bottom width etc of the bounding box (changes as you resize window. recall it when window size changes)

    // get bounding ox of draw-box-a
    let rect = document.querySelector("#draw-box-a").getBoundingClientRect(); 

    // make div and move it to where the cursor is
    let pointDiv = this.document.createElement("div");
    pointDiv.classList.add("point");
    document.querySelector("#draw-box-a").appendChild(pointDiv); // adds div to the siurface box rect 


    function mouseMoveFunction(eventObj) {
        console.log("moving");
       

        // difference to ensure cordinates are relative 
        let offsetX = eventObj.clientX-rect.x; 
        let offsetY = eventObj.clientY-rect.y; 

        //this.innerHTML = `x: ${offsetX}, y:${offsetY}`; // this overrides the html and wont show the point div 

        pointDiv.style.top = `${offsetY}px`; 
        pointDiv.style.left = `${offsetX}px`; 


    
    }


}