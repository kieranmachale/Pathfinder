/* Javascript for C.R.U.D operations on project resources */
let userId = localStorage.uid;
let token = localStorage.token;
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
            let newProjectTemplate = `<p>${data[i].name}</p>
            <p>${data[i].description}</p>
            <p>${data[i].p_id}</p>`;
            document.querySelector(".text").innerHTML += newProjectTemplate;
        }
    })
    .catch(err => {
        console.log(err.message || "Error occurred while logging user in");
    });
    
}
// ------------------------------------------------------------------------------------------