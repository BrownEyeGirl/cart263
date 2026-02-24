window.onload = function (){
// Our garden
let garden = {

    numDogs:10,
    dogs:[],

    birds: [],  // An array to store the individual birds
    numBirds: 10, // How many birds in the garden

    /*grass object */
    grass: {
      // The color of the grass (background)
      grassColor: {
        r: 120,
        g: 180,
        b: 120,
      },
      //the grass element
      grassDiv: document.createElement("div"),
    },
 
    /*sky object */
    sky: {
      // The color of the sky (background)
      skyColor: {
        r: 83,
        g: 154,
        b: 240,
      },
      //the sky element
      skyDiv: document.createElement("div"),
    },

  };
  // new  sun instancce
  let sun =  new Sun(10,10,{r: 240, g: 206,b: 83})


  function createAndRenderTheGarden() {
    /* note how we use dot notation....*/
    //sky
    garden.sky.skyDiv.classList.add("sky");
    garden.sky.skyDiv.style.background = `rgb(${garden.sky.skyColor.r},${garden.sky.skyColor.g},${garden.sky.skyColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.sky.skyDiv);
    //sun
    sun.renderSun();

    //grass
    garden.grass.grassDiv.classList.add("grass");
    garden.grass.grassDiv.style.background = `rgb(${garden.grass.grassColor.r},${garden.grass.grassColor.g},${garden.grass.grassColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.grass.grassDiv);
   
    // dogs
    // Create the correct number of dogs and put them in our array
    for (let i = 0; i < garden.numDogs; i++) {
      let x = Math.random()*window.innerWidth;
      let y = Math.random()*100;
      let dog = new Dog(x, y,15,15);
      garden.dogs.push(dog);
    }

    //create some birds
    for (let i = 0; i < garden.numBirds; i++) {
      let x = Math.random()*window.innerWidth;
      let y = Math.random()*100;
      let bird = new Bird(x, y,15,15);
      garden.birds.push(bird);
    }
  }


  function renderAnimals(){
    // Go through all the animals and move, wrap, and display them
    for (let i = 0; i < garden.dogs.length; i++) {
      let dog = garden.dogs[i];
      dog.renderAnimal();
    }

    // Go through all the birds and move, wrap, and display them
  for (let i = 0; i < garden.birds.length; i++) {
    let bird = garden.birds[i];
    bird.renderAnimal();
  }

  }


  // new jump on key press
  window.addEventListener("keydown", function(e){
    //set up to allow got "0" to jump 
    if(e.code ==="Space"){
      //prevent default behaviour of the space bar
      e.preventDefault()
      //check if the dog is already jumping
      if(garden.dogs[0].isjumping ===false){ // only first dog is allowed to jump 
        garden.dogs[0].jump()    
      }
    
    }
  })


  createAndRenderTheGarden();
  //createDogs();
  //createBirds(); 
  renderAnimals();
  window.requestAnimationFrame(updateGarden)


  function updateGarden(){
      
     // if the first dog is set to jump
    if(garden.dogs[0].isjumping ===true){
      console.log("jump")
      garden.dogs[0].updateJump()
      for(let i =0; i< garden.birds.length;i++){
        //try to catch any bird
         garden.dogs[0].catchBird(garden.birds[i])
      }
    }


  // Go through all the animals and move, wrap, and display them
  for (let i = 0; i < garden.dogs.length; i++) {
    let dog = garden.dogs[i];
    dog.move();
    dog.wrap();
  }

  // Go through all the birds and move, wrap, and display them
  for (let i = 0; i < garden.birds.length; i++) {
    let bird = garden.birds[i];
    bird.move();
    bird.wrap();
  }
  window.requestAnimationFrame(updateGarden)
  }

  
}

  