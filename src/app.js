const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');


// adding event listener for adding todo
todoButton.addEventListener('click',addTodo);

function addTodo(event){
    event.preventDefault();
    if(todoInput.value === ""){
        alert("Please enter Todo");
    }
    else{
        //making a totally new todo element from scratch
    }
}