let createBtn = document.querySelector("#createBtn");
let reportBtn = document.querySelector("#reportBtn");
let modalbg = document.querySelector(".modal-bg");
let connectClose = document.querySelector("#connect-close");
let connectModal = document.querySelector(".modal-connect");
let reportModal = document.querySelector(".modal-report");
let modalClose = document.querySelector(".modal-close");
let reportClose = document.querySelector(".modal-close-report");
let updateClose = document.querySelector(".update-close");
let logout = document.querySelector("#log_out");


/* Make modal view visible */
createBtn.addEventListener("click", function(e){
    modalbg.classList.add('bg-active');
});
/* Close modal view */
modalClose.addEventListener("click", function(e){
    modalbg.classList.remove('bg-active');
});
connectClose.addEventListener("click", function(e){
    connectModal.classList.remove('bg-active');
})
reportBtn.addEventListener("click", function(e){
    reportModal.classList.add('bg-active');
});
reportClose.addEventListener("click", function(e){
    reportModal.classList.remove('bg-active');
});
updateClose.addEventListener("click", function(e){
    document.querySelector(".modal-update").classList.remove('bg-active');
});





/* Remove access token from local storage and log out user */
logout.addEventListener("click", function(e){
    localStorage.clear();
    location.href="/login";
})

var widthSlider = document.getElementById("widthRange");
var output = document.getElementById("widthValue");
output.innerHTML = `${widthSlider.value}cm`;

widthSlider.oninput = function() {
  output.innerHTML = `${this.value}cm`;
}

var lengthSlider = document.getElementById("lengthRange");
var output2 = document.getElementById("lengthValue");
output2.innerHTML = `${lengthSlider.value}cm`;

lengthSlider.oninput = function() {
  output2.innerHTML = `${this.value}cm`;
}