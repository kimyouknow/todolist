const body = document.querySelector("body");
const localName = document.querySelector(".js-localName");

const navigation = document.querySelector(".js-navigation"),
    nav__toDo = navigation.querySelector(".js-nav__toDo"),
    nav__weather = navigation.querySelector(".js-nav__weather"),
    nav__calendar = navigation.querySelector(".js-nav__calendar");

const backHome = document.querySelector(".js-backToHome");
const backToDo = document.querySelector(".js-backToDoList");

function getName() {
    const LS_name = localStorage.getItem('name');
    const span = document.createElement("span");
    span.innerText = LS_name;
    localName.appendChild(span);
}
function scrolldown(e){
    switch (e.path[0].innerText) {
        case 'toDoList':
            window.scrollTo({top:1000, left: 0, behavior: 'smooth'});
            break
        case 'calendar':
            window.scrollTo({top:2000, left: 0, behavior: 'smooth'});
            break
        case 'weather':
            window.scrollTo({top:3000, left: 0, behavior: 'smooth'});
            break
        
    }
}

function scrollHigh() {
    window.scrollTo({top:0, left: 0, behavior: 'smooth'});
}

function scrolToDo(){
    window.scrollTo({top:1000, left: 0, behavior: 'smooth'});
}
function moveScorll() {
    nav__toDo.addEventListener("click", scrolldown);
    nav__weather.addEventListener("click", scrolldown);
    nav__calendar.addEventListener("click", scrolldown);
    backHome.addEventListener("click", scrollHigh);
    backToDo.addEventListener("click", scrolToDo);
}

function hadnleSCroll(e){
    let scrolY = window.scrollY;
    if (scrolY > 500) {
        backHome.classList.add("show");
    } else {
        backHome.classList.remove("show");
    }
}
function init() {
    getName();
    moveScorll();
    window.addEventListener("scroll", hadnleSCroll);
    
}
init();