/**
 * JS Challenge
 * Jan 14, 2026
 * 
 */



"use strict";


let r, g, b;
let x, y; 
let size

function setup() {
    createCanvas(600, 600); 
    background(255); 

    r = 200;
    g = 30;
    b = 100; 

    x = 30; 
    y = 30; 

    size = 60; 


}

function draw() {

    background(0); 
    noStroke(); 

    // circle 1
    fill(r, g, b); 
    ellipse(x, y, size); 

    // circle 2
    fill(r+50, g+30, b); 
    ellipse(x+100, y+100, size+30); 

    // circle 3
    fill(r+50, g-30, b-50); 
    ellipse(x+200, y+200, size+50); 
}