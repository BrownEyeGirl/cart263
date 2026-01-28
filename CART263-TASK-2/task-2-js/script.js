window.onload = setup;

/** function setup */
function setup(){
console.log("we are a go!")

/*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
/*** START PART ONE ACCESS */ 
/* 1: all paragraph elements */
/***CODE
 * console.log(document.getElementsByTagName("p")); 
 */
/***OUTPUT: 
 * HTMLCollection(9) [p#1, p#2.img-descript, p#3.img-descript, p#4.img-descript, p#5.img-descript, p#6.img-descript, p#7.img-descript, p#8.img-descript, p#9.img-descript]
 */


/*************************************** */
/* 2: only the first paragraph element */
/***CODE
 * document.getElementsByTagName("p")[0];
 */
/***OUTPUT: 
 * <p id="1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis blanditiis, et
        laborum praesentium earum. Enim facere, quia commodi voluptate, quis asperiores, pariatur ducimus
        officiis non
        quasi officia sit veniam!
    </p>
 */


/*************************************** */
/* 3: all elements with the class inner-container */
/***CODE 
 * document.getElementsByClassName("inner-container");
*/
/***OUTPUT: 
 * HTMLCollection(8) [div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container]0: div.inner-container1: div.inner-container2: div.inner-container3: div.inner-container4: div.inner-container5: div.inner-container6: div.inner-container7: div.inner-containerlength: 8[[Prototype]]: HTMLCollection
 */


/*************************************** */
/* 4: the last image element inside the element that has the class img-container */
/***CODE 
 * 
let imgs1 = document.querySelector(".img-container").querySelectorAll("img");
let lastImage1 = imgs1[imgs1.length - 1]; 
*/
/***OUTPUT: 
 * <img class="img-image" src="task-2-images/sixteen.png"> // note: it will select the first element with class .img-container
 */


/*************************************** */
/* 5A: all h2 elements */
/* 5B: length of the list in 5A */
/* 5C: the text content of the first element in the list from 5A */
/***CODE 
 * 5A: document.querySelectorAll("h2"); 
 * 5B: document.querySelectorAll("h2").length;
 * 5C: document.querySelectorAll("h2")[0].innerText; 
*/
/***OUTPUT: 
 * 5A: NodeList [h2]
 * 5B: 1
 * 5C: 'THE HEADER OF THIS FANCY PAGE'
 */


/*************************************** */
/* 6: the element with id name parent */
/***CODE 
 * document.getElementById("parent");
*/
/***OUTPUT: 
 * <selection id="parent"> ... </selection>
 */

/*************************************** */
/*** END PART ONE ACCESS */ 


/*************************************** */
/*** START PART TWO MODIFY */ 
/*************************************** */
/* 1: Select the first paragraph and replace the text within the paragraph... */
/***CODE 
 * document.querySelector("p").textContent = "skyla, jan 27";
*/
/*************************************** */
/* 2: Select all elements in the HTML that have the class name content-container
 and change the background color ... of first and second ...*/
/***CODE
 * document.querySelectorAll(".content-container")[0].style.background = "orange";
 * document.querySelectorAll(".content-container")[1].style.background = "purple";
 */

/*************************************** */
/* 3: Change the src element of the first image element on the page to be ...
/***CODE 
 * document.querySelector("img").src='task-2-images/seven.png'
*/

/*************************************** */
/* 4: Select the third paragraph element on the page and 
replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
/***CODE 
 * document.getElementsByTagName("p")[2].innerHTML = "<h2> TEST 123 </h2>"
*/

/*************************************** */
/* 5: Select the fourth paragraph element on the page and 
add to the existing content an h2 element containing the text `TEST 123`
/***CODE
 * document.getElementsByTagName("p")[3].innerHTML += "<h2> TEST 123 </h2>"
 */

/*************************************** */
/* 6: Select the fifth paragraph element on the page and add to the existing content 
an img element that holds `one.png`, and add the class newStyle to said paragraph element.
/***CODE 
 * document.getElementsByTagName("p")[4].innerHTML += "<img src='task-2-images/one.png'>"
 * document.getElementsByTagName("p")[4].classList.add("newStyle")
*/


/*************************************** */
/* 7: Add the following array variable: let colors = ['red','blue','green','orange'];, 
then access all elements with class name inner-container and save to a variable called `innerContainers`. 
Next, iterate over the colors array, and for each color: 
assign the element from innerContainers variable with the same index 
(i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...) 
a background using that color.
/***CODE
 * let colors = ['red','blue','green','orange'];
 * let innerContainers = [document.getElementsByClassName("inner-container")][0]; 
 * for(let i = 0; i < colors.length; i++) {
    innerContainers[i].style.background=colors[i];}
 */

/*************************************** */
/*** END PART TWO MODIFY */ 


/*************************************** */
/*** START PART THREE CREATE */ 
/*************************************** */
/* 1: NEW PARAGRAPHS */
/* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
/* 1B: Create a function:function customCreateElement(parent){ //body } */
/* 1C:  In the body of customCreateElement create a new parargraph element*/
/* 1D:  Set the text of this element to be : `using create Element`*/
/* 1E:  Set the background of this paragraph element to be green */
/* 1F:  Set the color of the text in this paragraph element to be white */
/* 1G: Append this new element to the parent variable within the function. */
/* 1H: Iterate through the allPTagsThree array and call customCreateElement(), 
passing the current allPTagsThree element as the parent with each iteration.*/
/***CODE 
1A: 
let allPTagsThree = document.querySelectorAll("p");

1B-1G: 
function customCreateElement(parent){
    let newP = document.createElement("p");
    newP.textContent = "using Create Element";
    newP.style.background = "green"; 
    newP.style.color = "white"; 
    parent.appendChild(newP); }

1H: for(let i = 0; i < allPTagsThree.length; i++) {
    customCreateElement(allPTagsThree[i]); }
*/


/***EXPLANATION::
 * (Screen grab in the solutions folder)
 * The function customCreateElement sets html and css attributes for the new "p" element it creates, then appends this to the parent element passed into the arguments.
 * Here, the parent element for each new "p" tag is all elements with "p". 
 * 
 */

/*************************************** */
/* 2: GRID OF BOXES */
/* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
/* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv. 
/* 2C:Then append this new element to the parent variable within the function. 
/* 2D:Finally, return</code> this new element */
/* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)). 
    Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
    Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
/* 2F: You will see at this point that the x,y position of the resulting divs makes no sense... 
    Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
    in a variable i.e. returnedDiv. 
    Set the style (left and top) to the of this element to 
    the necessary x and y position (use the counter variables in the for nested for loop to 
    calculate the new positions.
/* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
    and otherwise let it have a background of purple.</li>
/* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
    otherwise lat it have the content `ODD`.*/

/***CODE 
2A-2D: 
function customNewBoxCreate(parent){
    let newDiv = document.createElement("div"); 
    newDiv.classList.add("testDiv"); 
    parent.appendChild(newDiv);
    return newDiv; 
}

 
for(let row = 0; row < 10; row++) {
    for(let col = 0; col < 10; col++) {
        let returnedDiv = customNewBoxCreate(document.getElementById("new-grid"));
        returnedDiv.style.top = col*40 + 'px';
        returnedDiv.style.left = row*40+'px';
    }
}


// BONUS I: 
for(let row = 0; row < 10; row++) {
    for(let col = 0; col < 10; col++) {
        let returnedDiv = customNewBoxCreate(document.getElementById("new-grid"));
        if(col%2==0){returnedDiv.style.background='white';}
        else{returnedDiv.style.background='cornflowerblue';}
        returnedDiv.style.top = col*40 + 'px';
        returnedDiv.style.left = row*40+'px';
    }
}



*/


/***EXPLANATION::
 * The function customCreateBox() creates new div elements and assigns them the css attributes of the class "testDiv" by adding it to the class. Next, this is added to the parent passed into the function which enables collections of these divs to be made. Perfect for creating grids. 
 * This code creates a 10×10 grid of boxes by adding the function customCreateBox() to the element "new-grid" and positions them manually using CSS top and left. 
 * The “BONUS” does the same thing, but also adds alternating colors blue and white on each row.
 */

/*************************************** */
/* 3: GRID OF BOXES II */

/* 3A: Create ANOTHER nested for loop - in order to generate a new grid ... 
    USE the same customNewBoxCreate function..., the only difference is that the parent element 
    for each of these new divs is the element whose id is `new-grid-three`. */
/* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder), 
    when it is a column where the remainder is 1 or when the remainder is 2 ... 
    HINT:: look up the % operator.. */
/* 3C: Then for each of the above cases: give the new divs in the first case a background of red, 
        then the second a background of orange and the third yellow. */
/*  3D: Finally, let each div contain the text content representing the associated remainder 
    when dividing by three. */

/***CODE 
 
for(let row = 0; row < 10; row++) {
    for(let col = 0; col < 10; col++) {
        let returnedDiv = customNewBoxCreate(document.getElementById("new-grid-three"));
        if(row%3==0){returnedDiv.style.background='yellow';}
        else{
            if(row%3===1){returnedDiv.style.background='red';}
            else{returnedDiv.style.background='orange';}}
        returnedDiv.textContent=row%3; 
        returnedDiv.style.top = col*40 + 'px';
        returnedDiv.style.left = row*40+'px';
    }
}
*/


/***EXPLANATION::
 * This code creates 10x10 grid of boxes by callin gcustomCreateBox() from step 2 and creating a new grid in the element with id "new-grid-three". 
 * Next, modulo is used to assign one of three colours (yellow, red, orange) to the grid background in order. Finally, the results of the row modulo 3 is added as a text element to each box.  
 * 
 */

/*************************************** */
/*** END PART THREE CREATE */ 
/*************************************** */
    




}