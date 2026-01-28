//document.write("<h2>HELLO WORLD DYNAMIC</h2>");


/**
 * window.onload = function()
 * window -> window interface containing the dom elements
 * onload -> fires when the webpage is loaded
 */



window.onload = setup
function setup(){
    console.log("running setup");
    document.write("HELLO WORLD AFTER LOAD IN FUNCTION");
}