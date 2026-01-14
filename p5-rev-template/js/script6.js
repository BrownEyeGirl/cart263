/**
 * JS Challenge 6/7
 * Jan 14, 2026
 * 
 */


"use strict"; 



function setup() {
    createCanvas(600, 600);
    background(0); 

}

function draw() {

    push(); 
        fill(255); 
        textSize(28); 
        text('test', width/2, height/2);
    pop(); 

    for(let i = 0; i < 10; i++) {
        fill(255); 
        text(i, i*30+30, 30); 
    }

    for(let j = 0; j <= 15; j++) {
        fill(255); 
        text(j, 30, j*30+30); 
    }
}