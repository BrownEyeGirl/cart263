

window.onload = function(){
    console.log("keys");
    window.addEventListener('keydown',keyHandler);

    window.addEventListener('keyup', KeyHandlerUp)

    /*
    // listens for keydown, then logs info about the event in console
    window.addEventListener("keydown", function (event) {
        console.log(event);
        document.querySelector("#textContainer").textContent+=`${event.key} `; // adds the info of event to textbox with id textcontainer
        document.querySelector("#textContainer").textContent+=`${event.code} `; // adds the code of event keydown to the textbox with id textcontainer
    });
    */


    function KeyHandlerUp(event) {
        if(event.code==="Space") { // code vs key? 
            document.querySelector("boxB").style.background ="orange";
        }
    }
    


    let speedX = 5; 
    function keyHandler(event) {

        console.log(event.key)
        document.querySelector("#textContainer").textContent+=`${event.key}`

        if(event.key==="ArrowRight") {
            document.querySelector("#boxA").style.left = parseInt(document.querySelector("#boxA").style.left) + speedX + "px"; // moves boxA to the left by speedX px when leftarrow selected (note: moves box by the top corner)
        
        }
        
        if(event.key ==="ArrowLeft") {
            document.querySelector("#boxA").style.left = parseInt(document.querySelector("#boxA").style.left) - speedX + "px"; // moves boxA to the left by speedX px when leftarrow selected
        }

        if(event.code==="Space") { // code vs key? 
            document.querySelector("boxB").style.background ="orange";
        }
    }



    // settimeout, waits a given number of milliseconds and then calls its assoicated callback function 
     window.setTimeout(addTimeoutText,2000);
  function addTimeoutText(){
    let parent = document.getElementById("parent");
    parent.innerHTML+=" NEW TEXT TO APPEAR ";
  }


//   document.querySelector("#textContainer").textContent+=`${event.key} `; // 
//   document.querySelector("#textContainer").textContent+=`${event.code} `;

}





 