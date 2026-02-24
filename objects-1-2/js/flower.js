class Flower { // link class to index 

    // function to create a flower in the future
    constructor(x,y,size,stemLength,petalColor) {
        // We write instructions to set up a Flower here
        // Position and size information
        this.x = x//Math.random() * (window.innerWidth); //this.x needed, refers to the flower object that is created when Flower is called. 
        this.y = y //Math.random() * 120;
        this.size = size;
        this.stemLength = stemLength; // "bind" the left side to the right side of the element 
        this.stemThickness = 10;
        this.petalThickness = 8;
        this.flowerStemDiv = document.createElement("div");
        this.flowerPetalDiv = document.createElement("div");

        // Color information
        this.stemColor = {
        r: 50,
        g: 150,
        b: 50,
        };
        this.petalColor = petalColor; 
        this.centreColor = {
        r: 50,
        g: 0,
        b: 0,
        };
        
        let self = this; // "self" is equal to this specific flower 

        this.flowerStemDiv.addEventListener("click",growStem)
        function growStem(e){
            console.log("clicked");
            console.log(self) // copy of flower
            console.log(self.y) // y of flower 

            self.stemLength = self.stemLength+10;
            
            //update the actual div...
            self.flowerStemDiv.style.height = self.stemLength + "px";
            self.flowerStemDiv.style.top = self.y - self.stemLength + "px";

            // and also the petal element needs to move up
            self.flowerPetalDiv.style.top =
            self.y - self.stemLength - self.size / 2 + "px"; 
        }
    }



}

class Sun {
    constructor(x,y, sunColor){
        this.x = x;
        this.y = y;
        this.vx = 1; //for movement on x
        this.vy =1; //for movement on y
        this.sunColor = sunColor;
        this.sunDiv =  document.createElement("div")
 }
}
 