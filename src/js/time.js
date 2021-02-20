const dateContainer = document.querySelectorAll(".js-dateContainer");

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


function init() {
    getDate();
    
}
init();