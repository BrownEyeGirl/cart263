/**
 * JS Challenge 5/7
 * Jan 14, 2026
 * 
 */


"use strict"; 

let counter; 
let counter1; 
let shade = 255; 

let oS = { // oS is short for orangeSquare
    w: 50,
    h: 50,
    x: 200,
    y: 200, 
    r: 220,
    g: 100, 
    b: 0
}

// circle 
let radius; 
let ellipseAlpha; 


function setup() {
    // create canvas 
    createCanvas(600, 600); 
    background(0);

    counter = 0; // set initial counter value
    counter1 = 0; 
    radius = 30;
    ellipseAlpha = 30;   
}

function draw() {

    counter1=counter;     
    ellipseAlpha = 10;   
    shade = 30; 

    while(counter1 > 0) {
       // setAlpha(ellipseAlpha); 
        shade+=ellipseAlpha;  // 
        fill(shade);

        ellipse(width/2, height/2, radius+counter1*50); // display ellipse 
        counter1--; 
        //ellipseAlpha+=10
    }
    
    displaySquare();
}

function mouseClicked() {
    if(oS.x < mouseX && mouseX < oS.x+oS.w && oS.y < mouseY && mouseY > oS.h) { // if mouseX is within the orange square   
        counter += 1; 
    }
}

/* Displays an orange square */
function displaySquare() {
    noStroke();
    if(checkCollisionWithSquare()) { // if mouseX is within the orange square
        fill(255, 150, oS.b); 
    }
    else {
        fill(oS.r, oS.g, oS.b); 
        counter = 0; 
        background(0);
    }
    rect(oS.x, oS.y, oS.w, oS.h); 
}

/* Displays circle */ 
function displayCircle(alpha) {
    fill(alpha); 
    ellipse(width/2, height/2, radius);
}


/* Check if mouse is in square */ 
function checkCollisionWithSquare() {
    if(oS.x < mouseX && mouseX < oS.x+oS.w && oS.y < mouseY && mouseY > oS.h) {
        return true;
    }
    return false;
}