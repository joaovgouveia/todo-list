//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//Event Listeners
todoButton.addEventListener('click', AddTodo);
todoList.addEventListener('click', DeleteComplete);

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

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function DeleteComplete(e) {
    const target = e.target;
    console.log(target);

    //Delete TODO
    if(target.classList[0] === "delete-btn") {
        const todo = target.parentElement;
        todo.remove();
    }

    //Complet TODO
    if(target.classList[0] === "check-btn") {
        const todo = target.parentElement;
        todo.classList.toggle("complete");
    }
}