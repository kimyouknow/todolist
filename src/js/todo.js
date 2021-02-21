const toDoForm = document.querySelector(".js-toDoForm"),
    inputTodo = toDoForm.querySelector(".js-inputToDo"),
    inputDeadline = toDoForm.querySelector(".js-inputDeadline"),
    inputBtn = toDoForm.querySelector(".js-inputBtn");

const toDoList = document.querySelector(".js-todoList"),
    doneList = document.querySelector(".js-doneList");

const TODO_LS = "todo";
const FINISH_LS = "finished";

let toDoTasks, doneTasks;

function getTaskObj(text, date){
    return {
        id: String(Date.now()),
        text,
        date
    };
}

function saveToDoTask(obj) {
    toDoTasks.push(obj);
}

function findInToDo(taskId){
    return toDoTasks.find(function(task) {
        return task.id === taskId;
    });
}

function findInDone(taskId) {
    return doneTasks.find(function(task) {
        return task.id === taskId;
    });
}

function removeFromToDo(taskId) {
    toDoTasks = toDoTasks.filter(function(task) {
        return task.id !== taskId;
    });
}

function removeFromDone(taskId) {
    doneTasks = doneTasks.filter(function(task) {
        return task.id !== taskId;
    });
}

function addToDone(object) {
    doneTasks.push(object);
}
function addToToDo(object){
    toDoTasks.push(object);
}
function deleteTask(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromToDo(li.id);
    removeFromDone(li.id);
    saveState();
}

function moveToDone(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const object = findInToDo(li.id);
    removeFromToDo(li.id);
    addToDone(object);
    paintDoneTask(object);
    saveState();
}
function moveToToDo(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const object = findInDone(li.id);
    removeFromDone(li.id);
    addToToDo(object);
    paintToDoTask(object);
    saveState();
}
function buildGenericLi(obj){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span_text = document.createElement("span");
    const span_date = document.createElement("span");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteTask);
    span_text.innerText = obj['text'];
    span_date.innerText = obj['date'];
    li.append(span_text,span_date,delBtn);
    li.id = obj.id;
    return li;
}
function paintDoneTask(obj) {
    const genericLi = buildGenericLi(obj);
    const backBtn = document.createElement("button");
    backBtn.innerText = "⏪";
    backBtn.addEventListener("click", moveToToDo);
    genericLi.appendChild(backBtn);
    doneList.appendChild(genericLi);
}

function paintToDoTask(obj) {
    const genericLi = buildGenericLi(obj);
    const checkBtn = document.createElement("button");
    checkBtn.innerText = "✅";
    checkBtn.addEventListener("click", moveToDone);
    genericLi.appendChild(checkBtn);
    toDoList.appendChild(genericLi);
}

function saveState(){
    localStorage.setItem(TODO_LS, JSON.stringify(toDoTasks));
    localStorage.setItem(FINISH_LS, JSON.stringify(doneTasks));
}

function loadstates() {
    toDoTasks = JSON.parse(localStorage.getItem(TODO_LS)) || [];
    doneTasks = JSON.parse(localStorage.getItem(FINISH_LS)) || [];
}

function restoreState() {
    toDoTasks.forEach(function(task){
        paintToDoTask(task);
    });
    doneTasks.forEach(function(task){
        paintToDoTask(task);
    });
}

function hadleSubmit(e) {
    e.preventDefault();
    const toDoObj = inputTodo.value;
    const deadLineObj = inputDeadline.value;
    const object = getTaskObj(toDoObj, deadLineObj);
    inputTodo.value = "";
    inputDeadline.value = "";
    paintToDoTask(object);
    saveToDoTask(object);
    saveState();
}


function init() {
    toDoForm.addEventListener("submit", hadleSubmit);
    loadstates();
    restoreState();
}
init();