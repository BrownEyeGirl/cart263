/**
 * JS Challenge 2/7
 * Jan 14, 2026
 * 
 */

"use strict";


function setup() {
    createCanvas(600, 600);

    background(0); 
    drawEllipse(30, 30, 60, 60, 200, 30, 100); 
    drawEllipse(130, 130, 90, 90, 250, 60, 100); 
    drawEllipse(230, 230, 110, 110, 250, 0, 50); 
}


function draw() {
    
}

function drawEllipse(x,y,w,h,r,g,b) {
    noStroke(); 
    fill(r, g, b); 
    ellipse(x, y, w, h); 
}