// CODE EXPLAINED channel

//select the elements
const clear =document.querySelector(".clear")
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//select the classes 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


//show today's date
const options = {weekday:"short", month:"short", day:"numeric"}
const today = new Date();

dateElement.innerHTML=today.toLocaleDateString("en-US",options)


//add to do function

function addToDo(abc){
    
    const item = ` <li class="item"> 
                    <i class="fa fa-circle-thin co" job= "complete" id="0"></i> 
                    <p class="text"> ${abc}</p> 
                    <i class="fa fa-trash-o de" job= "delete" id="0"></i> 
    </li> 
    `;

 
    list.insertAdjacentHTML("beforeend",item);
}

// //add an item to the list using the enter key
document.addEventListener("keyup",function(event){
    console.log(event)
    if( event.keyCode == 13){
        const toDo = input.value;
     addToDo(toDo);
        // if (toDo){
        //     addToDo(toDo);
        // }
      
    }
});

addToDo("coffee")
// // document.addEventListener("keydown",function(){
// //     return alert ("a key has been pressed")
// }
