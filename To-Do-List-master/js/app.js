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

// variables
let LIST=[], id=0

//get item from localstorage
let data = localStorage.getItem("TODO");

//check that data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); //load the list to the user interface

}else{
    // if data is empty
    let LIST= []
    , id = 0;
}

//load items to the user's interface (doesnt matter where you place the function unless tyou declare it in this way function = x(){})
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash); // each element of the array is an object
    });
}

//clear the local storage
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});

//add item to localstorage (this code must be added wehre the LIST array is updated)
// localStorage.setItem("TODO",JSON.stringify(LIST));


//show today's date
const options = {weekday:"short", month:"short", day:"numeric"}
const today = new Date();

dateElement.innerHTML=today.toLocaleDateString("en-US",options)


//add to do function

function addToDo(abc, id ,done,trash){
    if(trash){return; }

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : "";

    const item = ` <li class="item"> 
                    <i class="fa ${DONE} co" job= "complete" id="${id}"></i> 
                    <p class="text ${LINE}"> ${abc}</p> 
                    <i class="fa fa-trash-o de" job= "delete" id="${id}"></i> 
    </li> 
    `;

 
    list.insertAdjacentHTML("beforeend",item);
}

//add an item to the list using the enter key
document.addEventListener("keyup",function(event){ 
    if( event.keyCode == 13){
        const toDo = input.value;
        
        // if the input isnt empty
        if (toDo){
            addToDo(toDo,id,false,false);

            LIST.push({
                name:toDo,
                id:id,
                done: false,
                trash:false
            });
            //add item to localstorage (this code must be added wehre the LIST array is updated)
localStorage.setItem("TODO",JSON.stringify(LIST));
            id++;
            
        }
        input.value = "";
    }
});

//complete to do 
function completeToDo(element){
    element.classList.toggle(CHECK); // check become uncheck
    element.classList.toggle(UNCHECK); //uncheck become check [CHECK : UNCHECK] 
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH); //line through become"" [LINE_THROUGH : ""]
// how does this work?
    LIST[element.id].done = LIST[element.id].done? false: true; 
}

    //remove to do
    function removeToDo(element){
        element.parentNode.parentNode.removeChild(element.parentNode);//remove the <li> node 

        LIST[element.id].trash = true;
    }

    //target the items created dynamically
    list.addEventListener("click",function(event){
        const element = event.target; //return the clicked element inside list , 3 elements: <i>circle icon, <p>text, <i>trash icon
        const elementJob = element.attributes.job.value; // complete or delete 

        if (elementJob == "complete"){
            completeToDo(element); //clicked on the circle icon, has check/uncheck class
        }else if(elementJob == "delete"){
            removeToDo(element);
        }
        //add item to localstorage (this code must be added wehre the LIST array is updated)
localStorage.setItem("TODO",JSON.stringify(LIST));
    })






// document.addEventListener("keydown",function(){
//     return alert ("a key has been pressed")}
// )
// document.addEventListener("click", function(){
//     alert ("your mouse clicked")
// })
