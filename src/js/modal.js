const modal = document.querySelector(".js-modal"),
    modalForm = modal.querySelector(".js-modal__form")
    modalName = modal.querySelector(".js-modal__name"),
    modalUrl = modal.querySelector(".js-modal__url"),
    modalCancel = modal.querySelector(".js-modal__cancel"),
    modalDone = modal.querySelector(".js-modal__done");
    
const addBtn = document.querySelector(".js-addButton"),
    containerUl = document.querySelector(".js-container__ul"),
    containerX = document.querySelector(".js-container__x");

const BOOKMARK_LS = 'bookmark';
let bookmarks;

function showModal() {
    modal.classList.add("show");
}

function handleDisplayNone(){
    modal.classList.remove("show");
}
function paintBookmark(obj){
    const li = document.createElement("li");
    const anchor = document.createElement("a");
    const button = document.createElement("button");
    anchor.href = obj['url'];
    anchor.innerHTML = `<div class="container__img">    
                        </div>
                        <div class="container__img-span">
                            <span>${obj.text}</span>
                        </div>`;
    button.classList.add("js-container__x");
    button.innerText = "✖";
    button.addEventListener("click", deleteBookmark);
    li.append(anchor, button);
    li.id = obj.id;
    containerUl.prepend(li);
}

function saveBookmark(obj){
    bookmarks.push(obj);
}

function handleAddBtn(e){
    e.preventDefault();
    const inputName = modalName.value;
    const inputUrl = modalUrl.value;
    const obj = {
        id: String(Date.now()),
        text: inputName,
        url: inputUrl
    };
    paintBookmark(obj);
    saveBookmark(obj);
    saveBookmarkLS();
    inputName.value = "";
    inputUrl.value = "";
    handleDisplayNone();
}
function removeBookmark(taskId){
    bookmarks = bookmarks.filter(function(task) {
        return task.id !== taskId;
    });
}
function saveBookmarkLS() {
    localStorage.setItem(BOOKMARK_LS, JSON.stringify(bookmarks));
}

function loadBookmark() {
    bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_LS)) || [];
}

function restoreBookmark(){
    bookmarks.forEach(function(task){
        paintBookmark(task);
    });
}
function deleteBookmark(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeBookmark(li.id);
    saveBookmarkLS();
}

function init() {
    addBtn.addEventListener("click", showModal);
    modalCancel.addEventListener("click", handleDisplayNone);
    modalForm.addEventListener("submit", handleAddBtn);
    containerX.addEventListener("click", deleteBookmark);
    loadBookmark();
    restoreBookmark();
}
init();

