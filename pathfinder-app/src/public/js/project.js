/* Javascript for C.R.U.D operations on project resources */
let userId = localStorage.uid;
let token = localStorage.token;
//let projectArea = document.querySelector(".grid-container");
document.addEventListener('DOMContentLoaded', function() {
    handleDOMUpdates(userId, token);

}, false);
// ------------------------------------------------------------------------------------------

/* Fetch user's projects */
async function handleDOMUpdates(userId, token) {
    const response = fetch(`http://localhost:3000/api/project/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'token': token
        }
    })
    .then(res => {
        return res.json();
    })
    .then(data => {

        // Update the DOM
        for(let i = 0; i < data.length; i++){
            let newGridItem = `<div class="grid-item">
            <h5><b class="projectName">${data[i].name.toUpperCase()}</b></h5>
            <hr>
            <p>${data[i].description}</p> 
            <p id="project_id"><e>${data[i].p_id}</e><p>
            <button class="updateBtn">Update</button>
            <button class="delBtn">Delete</button>
            <button class="launchBtn">Launch</button>
            </div>`;
            document.querySelector(".grid-container").innerHTML += newGridItem;
        }

        // Set event listeners for the buttons
        setEventListeners();
    })
    .catch(err => {
        console.log(err.message || "Error occurred while logging user in");
    });
    
}
// --------------------------------------------------------------------------------------
function setEventListeners() {
    /* Delete button event listener */
    document.querySelectorAll(".delBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent returning to the top of the page when clicked

            window.alert("Clicked delete!");
        })
    })
    /* Update button event listener */
    document.querySelectorAll(".updateBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent returning to the top of the page when clicked

            window.alert("Clicked update!");
            
        })
    })
    /* Launch button event listener */
    document.querySelectorAll(".launchBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent returning to the top of the page when clicked

            window.alert("Clicked launch!");
            
        })
    })
  
}


$("#searchBar").on("keyup", function () {
    var search = this.value;  if( search == '') { return } 
 $( ".grid-item" ).each(function() {
   a = this; if (a.innerHTML.search(search) > 0 ) {this.hidden = false} else {this.hidden = true}
 }); })