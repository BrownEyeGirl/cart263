
window.onload = setup
function setup(){ // setup only runs when the window loads 
    console.log("running setup");
    
    // get element by Id
   /* let second_element = document.getElementById("two"); // returns the element with id "twp"
    console.log(second_element);


    console.log(document.querySelector("#one")); //finds element by id one. querySelector returns THE FIRST match found. General function, need to identify if its an ID (#) or class (.)
   
    //get element by tag name
    console.log(document.getElementsByTagName("div")); // getElementsByTagName returns ALL id matches found
    console.log(document.getElementsByTagName("div").length); // length of all elements with id
    console.log(document.getElementsByTagName("div")[0]); // returns the first element with id div 

    let elements = document.getElementsByTagName("div") 
    console.log(elements[elements.length-1]); // return the last element with id div

    // get element by class 
    console.log(document.getElementsByClassName("square_shape"));
    console.log(document.getElementsByClassName("square_shape").length);
    console.log(document.getElementsByClassName("square_shape")[0]);

    // get first div
    let firstDiv = document.querySelector("div")
    // get all divs
    let allDivs = document.querySelectorAll("div"); 
    console.log(allDivs) // returns NodeList 

    // accessing inside the element 

    // by innerHTML (eg)
        let firstEl = document.querySelector(".square_shape"); 
        let htmlOfEl = firstEl.innerHTML; // returns html string of what is inside the element 
        console.log(firstEl);
        console.log(htmlOfEl);
        
    // by text
        let textOfEl = firstEl.textContent; 
        console.log(textOfEl);


    // chaining
    let idOfFive = document.querySelector("#five").getAttribute("id"); 
    let el = document.querySelector(".square_shape").style.background;  
    let elParent = document.querySelector("span")[0].parentElement; // or .classList? you can make your own attributes ?? 
    

    // parent child
    let parentOfOne = document.querySelector("#one").parentElement.parentElement.parentElement; // from every child you will eventually get to the html tag, after that it returns null 
    console.log(parentOfOne);

    let childrenOfFlex = document.querySelector(".wrapper_flex_box").children
    console.log(childrenOfFlex); 
    for(let i=0; i < childrenOfFlex.length; i++) {// for each child, you can access their children 
        console.log(childrenOfFlex[i]) // try not to use this method, for loops are not very efficient. try to use a mroe direct method 
        for(let j = 0; j < childrenOfFlex[i].children.length; j++) {

        }
    }

    document.querySelector("#four").innerHTML = "<h3> a new h3 </h3>";  // directly accesses four and changes the h3 tag to a new h3 
    */ 

    //
   // document.querySelector("").classList.add("") // or remove attribute 

   // document.querySelectorAll(".another_class")[0].setAttribute("id", "newTest"); 

    // creating a div 
    let newDiv = document.createElement("div"); 
    newDiv.classList.add("square_shape");
    newDiv.innerHTML = " NEW ELEMENT "; 
    newDiv.style.backgroundColor = "purple"; 

    // make the div in a new element by creating a new wrapper box 
    let parentElement = document.querySelector(".wrapper_flex_box"); 
    parentElement.appendChild(newDiv); 

}

