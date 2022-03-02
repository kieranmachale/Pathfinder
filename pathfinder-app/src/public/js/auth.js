/* Javascript code for handling registration, login and logout */
document.querySelector("#btn1").addEventListener("click", function(e){
    e.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#pass").value;

    location.href ="http://localhost:3000/profile";

    if(!email || !password){
        //alert("Content cannot be missing!");
    }
    else{
        loginUser(email, password);
    }
});
// -----------------------------------------------------------------------------------------------

async function loginUser(email, password) {
    const response = fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        let accessToken = data.jwt;
        let userId = data.id;
        window.localStorage.setItem("token", accessToken);
        window.localStorage.setItem("uid", userId);
        /* Redirect to profile page */
        //location.href = 'http://localhost:3000';
    })
    .catch(err => {
        console.log(err.message || "Error occurred while logging user in");
    });
    
}