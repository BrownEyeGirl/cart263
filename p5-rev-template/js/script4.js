/**
 * JS Challenge 4/7
 * Jan 14, 2026
 * 
 */


"use strict"; 


let col1 = {
    r: 0, 
    g: 100, 
    b: 250
}

let col2 = {
    r: 10, 
    g: 200, 
    b: 220
}

let col3 = {
    r: 100, 
    g: 200, 
    b: 250
}

function setup() {
    // create canvas
    createCanvas(600, 600); 
    background(255); 
}

/* Draw 3 rects & check if mouse is on them */ 
function draw() {
    background(255); 
    noStroke(); 

    fill(255); 
    if(!(mouseX < width/3)) { // if mousex not on rect1, fill with colour
        fill(col1.r, col1.g, col1.b); 
    }
    rect(0, 0, width/3, height); 


    fill(255); 
    if(!(mouseX > width/3 && mouseX < 2*width/3)) { // if mousex not on rect2, fill with colour
        fill(col2.r, col2.g, col2.b); 
    }
    rect(width/3, 0, width/3, height); 

    fill(255); 
    if(!(mouseX > 2*width/3)) { // if mousex not on rect3, fill with colour
        fill(col3.r, col3.g, col3.b); 
    }
    rect(2*width/3, 0, width/3, height); 





}