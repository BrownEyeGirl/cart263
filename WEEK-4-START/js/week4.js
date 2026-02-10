window.onload = setup;
function setup() {
  console.log("in week 4 ;)")

  window.setTimeout(addTimeoutText,2000);W
  function addTimeoutText(){
    let parent = document.querySelector("#parent");
    parent.innerHTML+=" NEW TEXT TO APPEAR ";
  }

  window.setInterval(addTextRecur,2000);
    function addTextRecur(){ 
    let parent = document.getElementById("parent");
        parent.innerHTML+=" NEW TEXT TO APPEAR RECUR ";
  }
  

}
