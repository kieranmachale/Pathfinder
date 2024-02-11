document.querySelector("#signup").addEventListener("click", function(e){
    e.preventDefault();
    let username = document.querySelector("#usernameReg").value;
    let emailAddress = document.querySelector("#emailReg").value;
    let passwordReg = document.querySelector("#passwordReg").value;
    let confirmPass = document.querySelector("#confirmPassword").value;

    if(!username || !emailAddress || !passwordReg || !confirmPass){
        window.alert("Content cannot be missing!");
    } else if(passwordReg!== confirmPass){
        window.alert("Passwords do not match")
    }else {
        handleRegistration(username, emailAddress, passwordReg);
    }
});

async function handleRegistration(username, emailAddress, passwordReg) {
    const response = fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: emailAddress,
            password: passwordReg
        })
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        if(data.jwt){
            location.href="/login"
        }else{
            //Handle error
            location.href="/register"
        }
        
        /* Redirect to profile page */
        //location.href = 'http://localhost:3000';
    })
    .catch(err => {
        alert(err.message);
        console.log(err.message || "Error occurred while logging user in");
    });
    
}