/**
 * JS Challenge 3/7
 * Jan 14, 2026
 * 
 */

"use strict"; 

// initialize sizes for rects
let w1, w2, w3; 
let h1, h2, h3; 

// initialize coordinates for rects
let x1, x2, x3; 
let y1, y2, y3; 

// initialize colours for rects 
let r1, g1, b1; 
let r2, g2, b2; 
let r3, g3, b3; 

function setup() {
    // setup canvas 
    createCanvas(600, 600);
    background(0); 

    // initialize variables 
    w1 = w2 = w3 = 40; 
    h1 = h2 = h3 = 40; 

    // centres the rects with a 10px margin 
    x1 = width/2 - w1 - 10; 
    y1 = height/2; 

    x2 = width/2; 
    y2 = height/2; 

    x3 = width/2 + w3 + 10; 
    y3 = height/2; 

    r1 = g1 = b1 = 200; 
    r2 = g2 = b2 = 220; 
    r3 = g3 = b3 = 180;

}


function draw() {
    background(0);

    // rect 1
   fill(r1, g1, b1); 
   rect(x1, y1, w1, h1); 

   // rect 2
   fill(r2, g2, b2); 
   rect(x2, y2, w2, h2); 

   // rect 3
   y3 += 2; 
   if(y3-h3+10 > height) {
    y3 = 0; 
   }

   r3 = map(y3, 0, 600, 0, 255); 
   g3 = 10; 
   b3 = map(y3, 0, 600, 255, 100); 

   fill(r3, g3, b3); 
   rect(x3, y3, w3, h3);
    


}

/* when mouse clicked, rect1 goes to mouse position */
function mouseClicked() {
    x1 = mouseX; 
    y1 = mouseY; 

    r1 = random(10, 255);
    g1 = 40; 
    b1 = random(60, 255); 
}

function keyPressed() {
    if(keyCode === 32) {
        if(x2 < width && x2 > 0) {
            x2 += random(-10 , 10); 
            if(r2 < 250) {
                r2 += 10;
                b2 += 10;  
                g2 = 0;  
            }
            else {
                r2 = 100; 
                b2 = random(10, 100);  
            }

        }
    }
} 
