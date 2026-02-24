// NEW! 1. We show that the Dog is a subclass of Animal by using the
// key word "extends" and then the name of the class it extends
// Our Dog extends the Animal class...

class Dog  extends Animal{
  // Create a new Dog object that moves to the right
  constructor(x, y, width, height) {

     // NEW! 2. We call the Animals's constructor() first! 
     // Because the Animal is the superclass for our Dog, we call its constructor super()!
    // So super(x,y) means: call the superclass' constructor with arguments
    // x and y (values passed in as arguments when the Dog is created)
    super(x, y,width,height); // passes variables to the parent class animal! almost the same as this.x = x. 

    // After using the Animals's constructor() we need to set
    // the Animals properties to the specific values for a Dog
    this.vx = Math.random() * 5 + 1;
    this.vy = 0;
    this.animalBody = document.createElement("div");
    this.isjumping = false;
  }
  // 3. We don't need to define move() or wrap() because they are already part
  // of the Animal class so our Dog inherits them
  // Move the Dog according to its velocity
  jump() {
   // console.log("jump");
    this.isjumping = true;
    this.vy = -27; //speed to go up
  }

  updateJump() {
    //check if I am on the "ground" i.e. y of dog is > or equal to 150
    if (this.y < 150) {
      this.vy += 1; //speed of drop
    }
    //stop jumping
    else {
      this.isjumping = false;
      this.vy = 0; //reset y speed
      this.y = 100; //reset y value
    }
  }

  // catch bird :() method 
  catchBird(bird) {
        let birdEl = bird.animalBody.getBoundingClientRect();
        let dogBody = this.animalBody.getBoundingClientRect();
        let d = distance(birdEl.x, birdEl.y, dogBody.x, dogBody.y)
        if (d < 50){
            console.log("collision")
            console.log( bird.animalBody.style.background)
            bird.animalBody.style.background = `orange`
        }
    }



  //  we do want to define this - as we want to visualize a dog specifically
  renderAnimal() {
    super.renderAnimal();
    //add to the DOM
    document.getElementsByClassName("grass")[0].appendChild(this.animalBody);
  }
}

/*
The Euclidean distance between two points is the length of the line segment connecting them. 
The formula for calculating it in 2D is equal to the hypotenuse of a right triangle, 
given by the Pythagorean theorem.
*/

function distance(x0, y0, x1, y1) {
  return Math.hypot(x1 - x0, y1 - y0);
}