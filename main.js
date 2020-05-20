const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const task = document.querySelector("#tasks p");


// we have our classes of font awesome

const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle"
const LINE_THROUGH = "lineThrough";
//variables

var List,id ;


//local storage

 let data = localStorage.getItem("TODO");
var count = 0;

  if(data){

      List = JSON.parse(data);
      id = List.length;
     
      LoadList(List);
  }else{
      List = [];
      id  = 0;
     count  = 0;
      

  }

  function LoadList(array){

      array.forEach(function(item){
             addToDo(item.name,item.id,item.done,item.trash);
      });
  }

  clear.addEventListener("click",function(){
      localStorage.clear();
      location.reload();

  });

// show todays date

const today = new Date();
const Option = { weekday :"long",month:"short",day:"numeric"};

dateElement.innerHTML  = today.toLocaleDateString("en-US",Option);

function addToDo(toDo,id,done,trash){

         if(trash) {
             
             
             
             return;
         }

          const DONE = done ? CHECK: UNCHECK;
          const LINE = done ? LINE_THROUGH: "";
         const position = "beforeend";
         
          const listItem =   '<li class="item"> <i class="'+DONE+'" job="complete" id="'+id+'"></i> <p class="text '+LINE+'">'+toDo+'</p><i class="fas fa-trash" job="delete" id="'+id+'"></i>  </li>';

         list.insertAdjacentHTML(position,listItem);
}


addToDo("hello",1,true,true);

document.addEventListener("keypress",function(event){

   
         if(event.keyCode == 13){
                     let toDo = input.value;

                     if(toDo){
                        addToDo(toDo,id,false,false);

                        List.push({

                               name:toDo,
                               id:id,
                               done:false,
                               trash:false
                        });
                        id++;
                        count++;
                    
                        localStorage.setItem("TODO",JSON.stringify(List));

                     }else{
                         alert("input is empty");
                         
                     }
                     input.value = "";

                   
         }

});

function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  List[element.id].done = List[element.id].done ? false:true;
       
}

function removeToDo(element){

     element.parentNode.parentNode.removeChild(element.parentNode);
     count--;
     List[element.id].trash = true;
}

list.addEventListener("click",function(event){

     element = event.target;
     console.log(element);
     elementJob = element.getAttribute('job');
     console.log(elementJob);
       if(elementJob == "complete"){

          completeToDo(element);
       }else if(elementJob == "delete"){

           removeToDo(element);
        
      
           localStorage.setItem("TODO",JSON.stringify(List));
       }
     
})



