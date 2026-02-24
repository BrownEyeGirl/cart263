class Animal {
  // Create a new Animal object t
  constructor(x, y, width, height) { // put in properties that are common among all animals 
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // NOTE: We don't know how a generic animal will move
    // so we set its velocity to 0
    this.vx = 0;
    this.vy = 0;
    this.animalBody = document.createElement("div");
  }

  // Move the Animal according to its velocity
  move() {
    this.x += this.vx;
    this.y += this.vy;
    //update the actual div...
    this.animalBody.style.left = this.x + "px";
    this.animalBody.style.top = this.y + "px";
  }

  // Wrap the animal if it reaches the right edge
  wrap() {
    if (this.x > window.innerWidth) {
      this.x -= window.innerWidth;
    }
  }

  // Display the animal 
  
   // Display the animal 
  renderAnimal() {
    this.animalBody.classList.add("animal");
    this.animalBody.style.width = this.width + "px";
    this.animalBody.style.height = this.height + "px";
    this.animalBody.style.left = this.x + "px";
    this.animalBody.style.top = this.y + "px";
    this.animalBody.style.borderRadius = this.width + "px";
  }
}