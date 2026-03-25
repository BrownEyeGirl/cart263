window.onload = function () {
    console.log("hello json");


    let donut_as_json = {
    "id": "0001",
    "type": "donut",
    "name": "Cake",
    "image": "../images/donuts/b.png",
    "flavours": [
      { "id": "1001", "type": "Regular" },
      { "id": "1002", "type": "Chocolate" },
      { "id": "1003", "type": "Blueberry" },
      { "id": "1004", "type": "Devil's Food" },
    ],

    "toppings": [
      { "id": "5001", "type": "None" },
      { "id": "5002", "type": "Glazed" },
      { "id": "5005", "type": "Sugar" },
      { "id": "5007", "type": "Powdered Sugar" },
      { "id": "5006", "type": "Chocolate with Sprinkles" },
      { "id": "5003", "type": "Chocolate" },
      { "id": "5004", "type": "Maple" },
    ],
  };
 

  // dot notation 
  let headingTag = document.createElement("h2"); 
  headingTag.classList.add("donut_name_class"); 
  document.getElementById("output_rev").appendChild(headingTag);
  headingTag.innerHTML=`Donut Name : ${donut_as_json.name}`; 

  // how to access flavours lable 
  let flavoursArray = donut_as_json.flavours; 
  // make a for loop and iterate 
  for(flavour of flavoursArray) {
    let pTag = document.createElement("p"); 
    pTag.classList.add("donut_flavour_class");
    document.getElementById("output_rev").appendChild(pTag);
    pTag.innerHTML = `Donut flavour : ${flavour.type}`; 
  }
   
  // how to access flavours label 
    let toppingsArray = donut_as_json.toppings;
  for (topping of toppingsArray) {
    console.log(topping.type);
    let pTag = document.createElement("p");
    pTag.classList.add("donut_topping_class");
    document.getElementById("output_rev").appendChild(pTag);
    pTag.innerHTML = `Donut topping : ${topping.type}`;
};

console.log(donut_as_json_array[0]);
  for (let i = 0; i < donut_as_json_array.length; i++) {
    let headingTag = document.createElement("h2");
    headingTag.classList.add("donut_name_class");
    document.getElementById("output_rev").appendChild(headingTag);
    headingTag.innerHTML = `Donut Name : ${donut_as_json_array[i].name}`;
    let imageTag = document.createElement("img");
    document.getElementById("output_rev").appendChild(imageTag);
    imageTag.src = ` ${donut_as_json_array[i].image}`;
  }
  
  // Coonstructing a fetch request 
  window.onload = goFetch;
  async function goFetch(){
  try {
        let response = await fetch('https://my-horrible-webservice.com/data.json');
        let data = await response.json();// or response.text() 
  } 
  catch(err) { 
      console.log(err)
  }
}


// making your own fetch request 
    window.onload = goFetch(); 
    async function goFetch() {
        try{

        let response = await fetch('../files/tests.json'); //response
        let parsedResultJS = await response.json();
        console.log(parsedResultJS)
        }
        catch(err){

            console.log(err)
        }
    }

    // html output 
    function displayResults(parsedResultJS){
    for (let i=0; i< parsedResultJS.length; i++){
        console.log(parsedResultJS)
        
        //the object
        let donutObj = parsedResultJS[i];
        //container
        let containerDiv = document.createElement("div");
        containerDiv.classList.add("donutItem");
        document.querySelector("#output").appendChild(containerDiv);
     
        let title = document.createElement("h3");
        title.textContent = donutObj.name;
        containerDiv.appendChild(title)

        //access the image
        let donutImage = document.createElement("img");
        donutImage.src = donutObj.image;
        containerDiv.appendChild(donutImage)
     }

    }

    // fetch with public apis 
    window.onload(goFetch2()); 
    
    async function goFetch2() {
        try {
            let response = await fetch("https://jsonplaceholder.typicode.com/posts"); //response
            let posts = await response.json();
            console.log(posts);
            for(let i = 0; i< 10; i++){
                document.querySelector("#output_rev").innerHTML +=
                `POST ${i} title:  ${posts[i].title}`
            }
        } catch (err) {
            console.log(err);
        }
    }
    
  
// fetch with public apis 
    window.onload(goFetchCats()); 
    
    async function goFetchCats() {

    try{

    let urlA = `https://cataas.com/cat/gif/says/Hello?filter=mono&fontColor=orange&fontSize=20&type=square&json=true`
    let urlB = `https://cataas.com/cat?json=true`
    //
    let response = await fetch(urlB) //response
    let cat = await response.json();
    console.log(cat)
    displayOnSite(cat.url)

    }
     catch (err) {
     console.log(err);
 }

 function displayOnSite(path){
    console.log(path)
    document.querySelector("#output_rev").innerHTML += `<img style = "width:90%"src= ${path} />`
 }
  
}




}