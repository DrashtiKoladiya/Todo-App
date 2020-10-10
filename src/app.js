const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoItem = document.querySelector('.todo');
// adding event listener for adding todo
document.addEventListener('DOMcontentLoaded',Show());
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',CompleteDelete);

function addTodo(event){
    event.preventDefault();
    if(todoInput.value === ""){
        alert("Please enter Todo");
    }
    else{
        //making a totally new todo element from scratch
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todoInput.value;
        todoDiv.appendChild(newTodo);

        const comButton = document.createElement('button');
        comButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        comButton.classList.add('completed-btn');
        todoDiv.appendChild(comButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        saveToLocal(todoDiv);
        todoList.append(todoDiv);

        todoInput.value = "";
    }
}

function CompleteDelete(event)
{
    const item = event.target;
    const todo = item.parentElement;
    if(item.classList[0]==="trash-btn")
    {
        todo.classList.add('animation-remove');
        //console.log(todo);
        removeFromLoal(todo);
        todo.remove();
    }
    else if(item.classList[0]==="completed-btn")
    {
        todo.classList.toggle('cheaked');
    }
}

function saveToLocal(todoEle)
{
    let todos;
    if(localStorage.getItem('todos')===null) todos = [];
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todo = todoEle.children[0].innerText;
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function Show()
{
    let todos;
    if(localStorage.getItem('todos')===null) todos = [];
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);

        const comButton = document.createElement('button');
        comButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        comButton.classList.add('completed-btn');
        todoDiv.appendChild(comButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.append(todoDiv);
        }
    );
}

function removeFromLoal(todo)
{
    let todos;
    if(localStorage.getItem('todos')===null) todos = [];
    else{
        //console.log(localStorage.getItem('todos'));
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const value1 = todo.children[0].innerText;
    todos.splice(todos.indexOf(value1),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}