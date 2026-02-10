
window.onload = setup;
function setup(){
    console.log("events!")

    // TOGGLE 
    let introState = "off"; 
    let s1State = "off"

    //RESPONDING TO A MOUSE CLICK EVENT 
    let introSection = document.querySelector("#intro"); // access the intro section 
    introSection.addEventListener("click",function(e){ // addEvent listener is found on all dom elements. first arg is a string containing the name of the event to listen for, here its a mouseclick. second parameter is a callback function
            console.log(this);
            console.log(e)
        
            //a:
            this.style.background = `rgba(214, 110, 239, 0.5)`
    });


    // same but in class 
    
    // gives specific section access to event information 
    let s1 = document.querySelector("#s1"); 
    s1.addEventListener("click", mouseClickCallback)
    
    // (same as earlier) let introSection = document.querySelector("#intro"); // access the intro section 
    introSection.addEventListener("click", mouseClickCallback);
    
    let s2 = document.querySelector("#s2");
    s2.addEventListener("click", mouseClickCallback); 

    let allSections = document.querySelectorAll(".mouseclick-active-section");
    for(let currentSection of allSections) {
        currentSection.addEventListener("click", mouseClickCallback); 
    }

    // assigns response to the event 
    function mouseClickCallback() {
        console.log("clicked"); 
        console.log(this); // assigned to element with event listener attached to it. here, its the whole element with id "#s1"
        this.style.background="blue"; // refers to whatever is eing clicked
        document.querySelector(`#${this.id} p`).style.background = `rgba(214, 110, 239 ,.75)`; // template strings! 

    }


    // DYNAMIC CALLBACK 
    // (same as earlier) let introSection = document.querySelector("#intro"); // access the intro section 
    introSection.addEventListener("click", function (e) {
      console.log(this);
      this.style.setProperty("opacity",".5");
      //same as
      //this.style.opacity = 0.5;
    })

    function mouseClickCallback(eventObj) {
        console.log(this);
        let idOfThis = this.getAttribute("id"); 


         this.setAttribute("custom-bool", "active");

        if(this.getAttribute("custom-bool") === "inactive") { // if example is inactive, we can set it to active 
            let child = document.querySelector(`#${idOfThis} p`)
            let classToAdd = `${idOfThis}-section-active`; 
            this.classList.add(classToAdd);
            let classToAddP = `${idOfThis}-section-p-active`;
            child.classList.add(classToAddP);
            console.log(this.getAttribute("custom-bool"));
            this.setAttribute("custom-bool", "active");
        }

        else {
           //this.setAttribute("custom-bool", "inactive");
        }
    }



}

