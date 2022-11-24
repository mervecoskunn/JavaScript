  //select global selectors
  const form = document.querySelector("#todo-form");
  const todoInput = document.querySelector("#todo");
  const todoList =document.querySelector(".list-group");
  const firstCardBody =document.querySelectorAll(".card-body")[0];
  const secondCardBody= document.querySelectorAll(".card-body")[1];  
  const filter = document.querySelector("#filter");
  const clearButton =document.querySelector("#clear-todos");



  eventListeners();


  function eventListeners(){ //for all eventlisteners
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo); 
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e){
  if(confirm("Are you sure  about clear all todos? ")){
    // todoList.innerHTML ="";
    while(todoList.firstElementChild!=null){
      todoList.removeChild(todoList.firstElementChild);
    
    }
    localStorage.removeItem("todos");
  
  }

}
function filterTodos(e){
  const filterValue = e.target.value.toLowerCase();
  const listItem = document.querySelectorAll(".list-group-item");

  listItem.forEach(function(listItem){
    const text =listItem.textContent.toLowerCase();
    if(text.indexOf(filterValue)=== -1){
      listItem.setAttribute("style","display : none !important");
    
    }
    else{
      listItem.setAttribute("style","display : block");
    
    }
  
  
  })


}

 function deleteTodoFromStorage(deletetodo){
  let todos = getTodosFromStorage();

  todos.forEach(function (todo,index){
    if(todo===deletetodo){
      todos.splice(index,1);

    
    }
  
  })
  localStorage.setItem("todos",JSON.stringify(todos));


}
function deleteTodo(e){
  if(e.target.className==="bi bi-x"){
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success","Todo deleted successfully!!");
  
  }

}
function loadAllTodosToUI(){
  let todos = getTodosFromStorage();
  todos.forEach(function(todo){
    addTodoUI(todo);
  
  })
}


function addTodo(e){
    const newTodo =todoInput.value.trim();

  //   <div class="alert alert-danger" role="alert">
  //   This is a danger alert—check it out!
  // </div>

    if(newTodo===""){
      showAlert("danger","please write a to do");
    
    }
    else{
      addTodoUI(newTodo);
      addTodoToStorage(newTodo);
      showAlert("success","Todo added successfully!!");
    
    }
    e.preventDefault();

}
function getTodosFromStorage(){
  let todos;
  if(localStorage.getItem("todos")===null){
    todos=[];
  
  }
  else{
    todos=JSON.parse(localStorage.getItem("todos"));
  
  }
  return todos;


}
function addTodoToStorage(newTodo){
  let todos = getTodosFromStorage();

  todos.push(newTodo);
  localStorage.setItem("todos",JSON.stringify(todos));
  
}

function showAlert(type,message){
  const alert =document.createElement("div");
  alert.className=`alert alert-${type}`;
  alert.textContent=message;
  firstCardBody.appendChild(alert);

  //settimeout
  setTimeout(function(){
    alert.remove();
  
  },1000);


}
function addTodoUI(newTodo){
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.href ="#";
  link.className="delete-item";
  link.innerHTML = '<i class="bi bi-x"></i>';

  listItem.className="list-group-item d-flex justify-content-between";
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  

  todoList.appendChild(listItem);
  todoInput.value ="";
}
