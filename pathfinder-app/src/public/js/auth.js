/* Javascript code for handling registration, login and logout */
document.querySelector("#btn1").addEventListener("click", function(e){
    e.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#pass").value;

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
        if(data.jwt){
            let accessToken = data.jwt;
            let userId = data.id;
            let username = data.username;
            window.localStorage.clear();
            window.localStorage.setItem("token", accessToken);
            window.localStorage.setItem("uid", userId);
            window.localStorage.setItem("username", username);
            location.href ="/profile";
        }else{
            //Handle error
            document.querySelector(".error-div").style.display = "block";
        }
        
        /* Redirect to profile page */
        //location.href = 'http://localhost:3000';
    })
    .catch(err => {
        console.log(err.message || "Error occurred while logging user in");
    });
    
}

// -----------------------------------------------------------------------------------------------
