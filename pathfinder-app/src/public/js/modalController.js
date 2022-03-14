let createBtn = document.querySelector("#createBtn");
let modalbg = document.querySelector(".modal-bg");
let modalClose = document.querySelector(".modal-close");
let logout = document.querySelector("#log_out");


/* Make modal view visible */
createBtn.addEventListener("click", function(e){
    modalbg.classList.add('bg-active');
});
/* Close modal view */
modalClose.addEventListener("click", function(e){
    modalbg.classList.remove('bg-active');
})
/* Remove access token from local storage and log out user */
logout.addEventListener("click", function(e){
    localStorage.clear();
    location.href="/login";
})