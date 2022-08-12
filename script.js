//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', GetTodos);
todoButton.addEventListener('click', AddTodo);
todoList.addEventListener('click', DeleteComplete);
filterOption.addEventListener('click', FilterTodos);

//Functions
function AddTodo(event){
    event.preventDefault();

    if(todoInput.value == ""){
        console.log("Input is empty !");
        return;
    }

    //Creating the Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Complete BUTTON
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);

    //Delete BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //Add TODO to local storage
    SaveLocalTodos(todoInput.value);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function DeleteComplete(e) {
    const target = e.target;
    console.log(target);

    //Delete TODO
    if(target.classList[0] === "delete-btn") {
        const todo = target.parentElement;

        //Animation
        todo.classList.add("fall");

        //Remove TODO
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })

        RemoveFromLocalTodos(todo);
    }

    //Complete TODO
    if(target.classList[0] === "check-btn") {
        const todo = target.parentElement;

        if(todo.classList.contains("completed")){
            SaveLocalTodos(todo.children[0].innerText);
        } else {
            RemoveFromLocalTodos(todo);
        }

        todo.classList.toggle("completed");
    }
}

function FilterTodos(e) {
    const todos = todoList.childNodes;
    console.log(todos);

    todos.forEach(function(todo){
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;

            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
            break

            case "uncompleted":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
        }
    });
}

function SaveLocalTodos(todo){
    let todos;

    todos = CheckTodos();

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function RemoveFromLocalTodos(todo){
    let todos;

    todos = CheckTodos();

    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function GetTodos(){
    let todos;

    todos = CheckTodos();

    todos.forEach(todo => {
        //Creating the Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Complete BUTTON
        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add("check-btn");
        todoDiv.appendChild(checkButton);

        //Delete BUTTON
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    });
}

function CheckTodos(){
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}