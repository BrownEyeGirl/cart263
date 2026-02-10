
let shades = [
    "#7fb3d5", //grey blue first
    "#76d7c4",
    "#f7dc6f",
    "#eb984e",
    "#cb4335",
    "#8e44ad",
    "#2e4053",
    "#e5e7e9",
    ];
  

window.onload = function () {
  

    
  
/*console.log("timers running");
  for (let i = 0; i < 24; i++) {
    //for each x - make a column of changing y's
    for (let j = 0; j < 24; j++) {
      //create a grid cell with a div
      let parent = document.getElementById("parent");
      let d = document.createElement("div");
      d.classList.add("grid-cell"); // common class of all elements, stored in a flat array
      parent.appendChild(d);

      d.style.left = (i + 1) * 25 + "px";
      d.style.top = (j + 1) * 25 + "px";
    }
  }


  // for rows! 
  let gridCells = document.querySelectorAll(".grid-cell"); // selects all elements
  let divisor = 2; 

  for(let i = 0; i < gridCells.length; i++) { // grid cells are accessed in a 1d flat array created on line 26
    if(i % divisor === 0) {
        gridCells[i].style.background = shades[0];
    }
    else {
        gridCells[i].style.background = shades[1];
    }
  }

// for columns! 
let num = 24;
  let currentShade = 0;
  for (let index = 0; index < gridCells.length; index++) {
    //check if we reach the 24th
    if (index % 24 === 0) {
        //switch the shade ...
      if (currentShade === 0) {
        currentShade = 1;
      } else {
        currentShade = 0;
      }
    }
    gridCells[index].style.background = shades[currentShade];
  }


// Animate rows!
  let changingNum = 0; 
  window.setInterval(animateRows, 1000) // runs animateRows every 1 second
  function animateRows() {
    changingNum += 1;
    console.log(changingNum); // prints out changingNum everytime animateRows is called
    drawGrid(); 
    
    if (changingNum === 8) {
      changingNum = 0;
    }
  }


  // draw the grid  function, go through each grid cell, changes background of each 
  function drawGrid(){
    for (let index = 0; index < gridCells.length; index++) {

    //check what the remainder is ...
      if (index % changingNum === 0) {
        gridCells[index].style.background = shades[0];
      } 
      else if (index % changingNum === 1) {
        gridCells[index].style.background = shades[1];
      } 
      else if (index % changingNum === 2) {
        gridCells[index].style.background = shades[2];
      } 
      else if (index % changingNum === 3) {
        gridCells[index].style.background = shades[3];
      } 
      else if (index % changingNum === 4) {
        gridCells[index].style.background = shades[4];
      } 
      else if (index % changingNum === 5) {
        gridCells[index].style.background = shades[5];
      } 
      else if (index % changingNum === 6) {
        gridCells[index].style.background = shades[6];
      } 
      else if (index % changingNum === 7) {
        gridCells[index].style.background = shades[7];
      } 

    }
 }
 /* hmmm : we could just remove the if /else and write:
  gridCells[index].style.background = shades[index%changingNum];
  */

   
/*
  let speed = 1000;
  window.setInterval(addText, speed); // setTimeout is only run once, calls function one time, resets the dela yevery time vs. setInterval 
  function addText() {
    console.log("adding");
    console.log(speed);
    let sp = document.createElement("span");
    sp.textContent = " adding Text ";
    sp.classList.add("appearInText");
    document.getElementById("parent").appendChild(sp);
    if (speed > 100) {
      speed -= 100;
    }
  }
*/

  // clearInterval() & clearTimeout()
/*
  window.setInterval(addOtherText, 500);
  function addOtherText() {
      let sp = document.createElement("span");
      sp.textContent = " ***-*** ";
      sp.classList.add("appearInStarText");
      document.getElementById("parent").appendChild(sp);
    
    }


let randomChanceToRun = setTimeout(oneTimeText, 500);

let num = Math.random();
if ( num < 0.5) { // 50% chance
  defusedText();
  clearTimeout(randomChanceToRun);
}
console.log(num);

  function oneTimeText() {
    let sp = document.createElement("span");
    sp.textContent = " TIME OUT ";
    sp.classList.add("timeOutText");
    document.getElementById("parent").appendChild(sp);
  }


  function defusedText() {
    let sp = document.createElement("span");
    sp.textContent = "DEFUSED";
    sp.classList.add("timeOutText");
    document.getElementById("parent").appendChild(sp);
  } 
*/

  // requestAnimationFrame() 

  // CREATE A PARTICLE 
  //create a particle div
  let particleDiv = document.createElement("div");
  particleDiv.id = "particle";
  document.querySelector("#parent").appendChild(particleDiv);
  particleDiv.style.left = "25px";
  particleDiv.style.top = "25px";

  window.requestAnimationFrame(animate); // put function we want to run 

  function animate() { // function can be named anything 
    let p = document.getElementById("particle");
    p.style.left = parseInt(p.style.left) + 2 + "px";
    p.style.top = parseInt(p.style.top) + 3 + "px";
  }

// MOVE THE PARTICLE AROUND 
 let speedX = 2;
 let speedY =3;
 window.requestAnimationFrame(animate);
 
  function animate() {
  let p = document.getElementById("particle");
  p.style.left = parseInt(p.style.left) + speedX+ "px";
  p.style.top = parseInt(p.style.top) + speedY + "px";
  window.requestAnimationFrame(animate);
  checkBounds(document.getElementById("parent"), p);

}

function checkBounds(parent, p) {
  let bounds = parent.getBoundingClientRect();

  if (parseInt(p.style.left) > bounds.right) { // we have to parse it to get just the integer value, strips it of 'px'. extracts number 
    speedX*=-1;
  
  } else if (parseInt(p.style.left) < bounds.left) {
    speedX*=-1;
    }

  if (parseInt(p.style.top) > bounds.bottom) {
    speedY*=-1;

  } else if (parseInt(p.style.top) < bounds.top) {
    speedY*=-1;
  }
 }


 //cancelAnimation()

let aniRef = null;
//add a new particle
  let p2 = document.createElement("div");
  p2.id = "particle_two";
  document.getElementById("parent").appendChild(p2);
  p2.style.left = '500px'
  p2.style.top = '100px';
  let theta =0;
  aniRef = window.requestAnimationFrame(modifyParticle);

  function modifyParticle() {
  let p2 = document.getElementById("particle_two");
  //map -1 to 1 to between 5 100
  let mappedNum = mapNumRange(Math.sin(theta),-1,1,5,100)
  p2.style.width = (mappedNum)+"px";
  p2.style.height = (mappedNum)+"px";
  p2.style.borderRadius = (mappedNum)+"px";
  theta+=0.05;
  aniRef = window.requestAnimationFrame(modifyParticle);
}
  //same as map in p5
  const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
    ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;




}