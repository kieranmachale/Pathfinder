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
    /* Flush the DOM */
    document.querySelector(".grid-container").innerHTML = ' ';

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
            <p class="project_id">${data[i].p_id}<p>
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

/* Handle user requests to create new project */
async function createNewProject(){
    const response = fetch(`http://localhost:3000/api/project/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'token': token
        },
        body: JSON.stringify({
            name:"Test Project 2",
            description:"test description",
            public:"true",
            width:14,
            len:12,
            uid: userId
        })
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        /* Update the DOM with new project */
        let newGridItem = `<div class="grid-item">
            <h5><b class="projectName">${data.name.toUpperCase()}</b></h5>
            <hr>
            <p>${data.description}</p> 
            <p class="project_id">${data.p_id}<p>
            <button class="updateBtn">Update</button>
            <button class="delBtn">Delete</button>
            <button class="launchBtn">Launch</button>
            </div>`;
        document.querySelector(".grid-container").innerHTML += newGridItem;
    })
    .catch(err => {
        console.log(err.message || "Error occurred while logging user in");
        alert(err.message);
    });
}
// --------------------------------------------------------------------------------------


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

            //window.alert("Clicked connect");
            let connectModal = document.querySelector(".modal-connect");
            connectModal.classList.add('bg-active');
            const targetEl = e.target;
            console.log(targetEl.parentElement.parentElement.querySelector(".project_id").innerHTML);
            
        })
    })
  
}

/* Event handlers */
document.querySelector("#createProjectBtn").addEventListener("click", function(e){
    e.preventDefault();
    /* Send fetchAPI request to create project */
    createNewProject();
    
});


/* Search bar */
$("#searchBar").on("keyup", function () {
    var search = this.value;  if( search == '') { return } 
 $( ".grid-item" ).each(function() {
   a = this; if (a.innerHTML.search(search) > 0 ) {this.hidden = false} else {this.hidden = true}
 }); })