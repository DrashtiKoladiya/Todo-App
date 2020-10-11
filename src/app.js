const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoItem = document.querySelector('.todo');


document.addEventListener('DOMcontentLoaded',Show());
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',CompleteDelete);

function addTodo(event){
    event.preventDefault();
    if(todoInput.value === ""){
        alert("Please enter Todo");
    }
    else{
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        saveToLocal(todoInput.value);
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
        removeFromLoal(todo);
        todo.remove();
    }
    else if(item.classList[0]==="completed-btn")
    {
        updateLocalClass(todo);
        todo.classList.toggle('cheaked');
    }
}

//save to do to the local storage
function saveToLocal(todoEle)
{
    let todos,todosClass;
    if(localStorage.getItem('todos')===null) todos = [],todosClass=[];
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
        todosClass = JSON.parse(localStorage.getItem('todosClass'));
        
    }
    todos.push(todoEle);
    todosClass.push('Uncheaked');
    localStorage.setItem('todos',JSON.stringify(todos));
    localStorage.setItem('todosClass',JSON.stringify(todosClass));
}

//shows full todo list when the documents gets fully loaded.
function Show()
{
    let todos,todosClass;
    if(localStorage.getItem('todos')===null) todos = [],todosClass=[];
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
        todosClass = JSON.parse(localStorage.getItem('todosClass'));
        
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const indexE = todos.indexOf(todo);
        if(todosClass[indexE]==='cheaked') todoDiv.classList.add(todosClass[indexE]);
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


//toggle class cheaked for completed and uncompleted items
function updateLocalClass(todo)
{
    let todos,todosClass;
    if(localStorage.getItem('todos')===null) todos = [],todosClass=[];
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
        todosClass = JSON.parse(localStorage.getItem('todosClass'));   
    }
    const value1 = todo.children[0].innerText;
    const IndexE = todos.indexOf(value1);
    if(todosClass[IndexE] === 'cheaked')
    {
        todosClass[IndexE] = 'Uncheaked';
    }
    else
    {
        todosClass[IndexE] = 'cheaked';
    }
    localStorage.setItem('todos',JSON.stringify(todos));
    localStorage.setItem('todosClass',JSON.stringify(todosClass));

}

//for removing item's completely from the local storage..
function removeFromLoal(todo)
{
    let todos,todosClass;
    if(localStorage.getItem('todos')===null) todos = [],todosClass=[];
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
        todosClass = JSON.parse(localStorage.getItem('todosClass'));   
    }
    const value1 = todo.children[0].innerText;
    const IndexE = todos.indexOf(value1);
    todos.splice(IndexE,1);
    todosClass.splice(IndexE,1);
    localStorage.setItem('todos',JSON.stringify(todos));
    localStorage.setItem('todosClass',JSON.stringify(todosClass));
}