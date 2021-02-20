const body = document.getElementById("bg");

const IMG_NUM = 3;

function getBg(number){
    const image = new Image();
    image.src = `src/img/${number}.png`;
    image.classList.add('bgImage');
    body.appendChild(image);
}
function getRandom(){
    const rand = Math.random();
    const number = Math.ceil(rand * IMG_NUM);
    return number;
}
function init() {
    const randomNumber = getRandom();
    getBg(randomNumber);
}
init();