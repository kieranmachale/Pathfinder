/* Javascript for C.R.U.D operations on project resources */
let userId = localStorage.uid;
let token = localStorage.token;

/* DOM elements to be modified */
let modalName = document.querySelector("#modal-name");
let modalDesc = document.querySelector("#modal-description");
let modalWidth = document.querySelector("#modal-width");
let modalLength = document.querySelector("#modal-length");

/* Form data */
let inputProjectName = document.querySelector("#name-input");
let inputProjectDescription = document.querySelector("#desc-input");
let inputWidth = document.querySelector("#widthRange");
let inputLength = document.querySelector("#lengthRange");


//let projectArea = document.querySelector(".grid-container");
document.addEventListener('DOMContentLoaded', function() {
    handleDOMUpdates(userId, token);


}, false);
// ------------------------------------------------------------------------------------------

/* Fetch user's projects */
async function handleDOMUpdates(userId, token) {
    /* Flush the DOM */
    document.querySelector(".grid-container").innerHTML = ' ';

    const response = fetch(`https://pathfinder-heroku.herokuapp.com/api/project/${userId}`, {
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

        if(data.length < 1){
            document.querySelector(".empty").classList.remove('content');
        }

        // Update the DOM
        for(let i = 0; i < data.length; i++){
            let newGridItem = `<div class="grid-item">
            <h5><b class="projectName">${data[i].name.toUpperCase()}</b>
            </h5>
            <hr>
            <p>${data[i].description}</p> 
            <p class="project_id">${data[i].p_id}</p>
            <button class="launchBtn">LAUNCH</button>
            <button class="updateBtn">UPDATE</button>
            <button class="delBtn">DELETE</button>
            </div>`;
            document.querySelector(".empty").classList.add("content");
            document.querySelector(".grid-container").innerHTML += newGridItem;
        }

        if(data.length > 6){
            document.querySelector(".grid-container").style.overflowY = "scroll";
            document.querySelector(".grid-container").style.overflowX = "hidden";
            document.querySelector(".grid-container").style.height = "80vh";

        }
        //console.log(data);

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
    let widthValue = parseFloat(inputWidth.value);
    let lengthValue = parseFloat(inputLength.value);

    const response = fetch(`https://pathfinder-heroku.herokuapp.com/api/project/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'token': token
        },
        body: JSON.stringify({
            name: inputProjectName.value,
            description: inputProjectDescription.value,
            public:"true",
            width: widthValue,
            len: lengthValue,
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
            <p class="project_id">${data.p_id}</p>
            <button class="launchBtn">Launch</button>
            <button class="updateBtn">Update</button>
            <button class="delBtn">Delete</button>   
            </div>`;
        document.querySelector(".grid-container").innerHTML += newGridItem;
    
    })
    .then(() => {
        setEventListeners();
        document.querySelector(".empty").classList.add("content");
        document.querySelector(".modal-bg").classList.remove("bg-active"); // Close the modal view
    })
    .catch(err => {
        console.log(err.message || "Error occurred while logging user in");
        alert(err.message);
    });
}
// --------------------------------------------------------------------------------------

async function deleteProject(projectId){

    const response = fetch(`https://pathfinder-heroku.herokuapp.com/api/project/${projectId}`, {
        method: 'DELETE',
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
        window.alert(data.message);
    })
    .catch(err => {
        console.log(err.message || "Error occurred while logging user in");
    });
}
// --------------------------------------------------------------------------------------

/* Fetch a single user project */
async function getProjectInfo(projectId){
    //console.log(projectId);

    const response = fetch(`https://pathfinder-heroku.herokuapp.com/api/project/${userId}/${projectId}`, {
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
        console.log(data);
        // Update Modal View with project info
        modalName.innerHTML = data.name;
        modalDesc.innerHTML = data.description;
        modalWidth.innerHTML = `${data.width} cm`;
        modalLength.innerHTML = `${data.length} cm`;
    })
    .catch(err => {
        console.log(err.message || "Error occurred while logging user in");
    });

}

async function updateProject(projectId){
    localStorage.setItem("currentProjectId", projectId);
    const response = fetch(`https://pathfinder-heroku.herokuapp.com/api/project/${userId}/${projectId}`, {
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
        console.log(data);
        // Update Modal View with project info
        document.querySelector("#name-update").value = data.name;
        document.querySelector("#desc-update").value = data.description;
        document.querySelector("#widthUpdate").value = data.width;
        document.querySelector("#lengthUpdate").value = data.length;
        
    })
    .catch(err => {
        console.log(err.message || "Error occurred while fetching user data");
    });
}

async function doProjectPatch(projectId){
    const response = fetch(`https://pathfinder-heroku.herokuapp.com/api/project/${projectId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'token': token
        },
        body: JSON.stringify({
            name: document.querySelector("#name-update").value,
            description: document.querySelector("#desc-update").value,
            public:"true",
            width: document.querySelector("#widthUpdate").value,
            len: document.querySelector("#lengthUpdate").value,
            uid: userId
        })
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        window.alert("Project updated!");
        handleDOMUpdates(userId, token);
    })
    .then(() => {
        document.querySelector(".modal-update").classList.remove("bg-active"); // Close the modal view
    })
    .catch(err => {
        window.alert(err.message || "Error occurred while updating project");
    });
}

document.querySelector("#updateProjectBtn").addEventListener("click", function(e){
    doProjectPatch(localStorage.currentProjectId);
});


// --------------------------------------------------------------------------------------
function setEventListeners() {
    /* Delete button event listener */
    document.querySelectorAll(".delBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent returning to the top of the page when clicked

            //window.alert("Clicked delete!");
            const deleteTarget = e.target.parentElement;
            const projectId = parseInt(e.target.parentElement.querySelector(".project_id").innerHTML);

            // Delete project from database
            console.log(projectId);
            deleteProject(projectId);
            // Remove project from the DOM
            deleteTarget.remove();
           
            
        })
    })
    /* Update button event listener */
    document.querySelectorAll(".updateBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent returning to the top of the page when clicked

            //window.alert("Clicked update!");
            let updateModal = document.querySelector(".modal-update");
            updateModal.classList.add('bg-active');
            const targetEl = e.target;
            const projectId = parseInt(targetEl.parentElement.querySelector(".project_id").innerHTML);
            
            updateProject(projectId);
            
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
            const projectId = parseInt(targetEl.parentElement.querySelector(".project_id").innerHTML);

            getProjectInfo(projectId);
            
        })
    })
  
}

async function submitReport(){

    let report = document.querySelector("#reportText").value;
    const res = fetch(`http://localhost:3000/api/report/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'token': token
        },
        body: JSON.stringify({
            uid: userId,
            type: "bug",
            description: report
        })
    })
    .then(res => {
        // check status
    })
    .then(() => {
        window.alert("Your report was submitted, thank you.");
        document.querySelector(".modal-report").classList.remove("bg-active");
    })
}

/* Event handlers */
document.querySelector("#createProjectBtn").addEventListener("click", function(e){
    e.preventDefault();
    /* Send fetchAPI request to create project */
    if(!inputProjectName.value || !inputProjectDescription.value || !inputWidth.value || !inputLength.value){
        window.alert("Content cannot be missing!");
    }else{
        createNewProject();
    }
});

/* Report Submission */
document.querySelector("#submitReportBtn").addEventListener("click", function(e){
    e.preventDefault();
    submitReport();
})

/* Search bar */
 $("#searchBar").on("keyup", function () {
    var searchString = this.value.toLowerCase();  if( searchString == ' ') { return } 
  $( ".grid-item" ).each(function() {
   a = this; if(a.querySelector(".projectName").innerHTML.toLowerCase().includes(searchString)) { this.hidden = false } else { this.hidden = true}
 }); })