/**
 * JS Challenge 7/7
 * Jan 14, 2026
 * 
 */

"use strict"; 

// circle design 
let radius; 
let margin; 

let circles; 

let r, g, b; 

// slider for size 
let slider; 

function setup() {
    createCanvas(600, 600);

    slider = createSlider(1, 20);
    slider.position(10, 10);
    slider.size(100);


    radius = slider.value(); 
    margin=width%radius; // makes sure the dots are centred 
    circles = false; // square every other line
    //margin = 5; 
    generateRandomColor(); 
     background(0); 

     
}


function draw() {
    background(0);
    radius = slider.value()*5; 
    margin=width%radius; // makes sure the dots are centred 

    for(let x = radius+margin; x < width; x+=radius+margin) {
        for(let y = radius+margin; y < height; y+=radius+margin) {
            fill(r, g, b);
            if(circles) { 
                ellipse(x, y, radius);
                circles = false; 
            } 
            else {
                //rect(x-radius/2, y-radius/2, radius/2); 
                rect(x-radius/2, y-radius/2, radius);
                circles = true; 
            }
        }
    }
    circles = false; 
}

function keyPressed() {
    if(keyCode === 32) {
       // generateRandomColor(); 
        r = random(0, 255);
        g = random(0, 255); 
        b = random(0, 255);
        circles = !circles 
    }
}

function generateRandomColor() {
    r = random(0, 255);
    g = random(0, 255); 
    b = random(0, 255); 
}