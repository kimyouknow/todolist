const dateContainer = document.querySelectorAll(".js-dateContainer");
const clock = document.querySelector(".js-clock");

function getDate(){
    const week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
    const today = new Date();
    const fullYear = today.getFullYear();
    const year = fullYear % 1000;
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = week[today.getDay()];
    dateContainer.forEach(function(container) {
        container.innerHTML = `${year}.${
            month < 10 ? `0${month}` : month}.${
            date < 10 ? `0${date}` : date}.${
            day}`;
    });
    };

function getTime(){
    const getTime = new Date();
    const hour = getTime.getHours();
    const minute = getTime.getMinutes();
    const second = getTime.getSeconds();
    clock.innerHTML = `${hour < 10 ? `0${hour}` : hour}:
    ${minute < 10 ? `0${minute}` : minute}:
    ${second < 10 ? `0${second}` : second}`;
}
function init() {
    getDate();
    getTime();
    setInterval(getTime, 1000);
}
init();