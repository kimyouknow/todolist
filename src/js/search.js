const searchForm = document.querySelector(".js-searchForm"),
    searchInput = searchForm.querySelector(".js-searchFormInput");

function googleSearch(keyword){
    location.href = 'https://www.google.com/search?q=' + keyword;
}

function handlesearch(e){
    e.preventDefault();
    keyword = searchInput.value;
    googleSearch(keyword);
    searchInput.value = "";
}

function init() {
    searchForm.addEventListener("submit", handlesearch);
}
init();