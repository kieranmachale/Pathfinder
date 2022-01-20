/* Example of a HTTP request using fetch API */

document.querySelector("#btn1").addEventListener("click", function(e){
    //console.log("Button clicked");
    fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'  
        },
        body: JSON.stringify({
            name: document.querySelector("#email").value,
            password: document.querySelector("#pass").value
        })
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
    }).catch(err => console.log(err));
});

