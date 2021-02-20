const locationForm = document.querySelector('.js-enter__form'),
    input = locationForm.querySelector('.js-enter__input');

function loadName(e){
    const inputName = input.value;
    localStorage.setItem('name', inputName);
}

function init(){
    locationForm.addEventListener('submit', loadName);

}
init();