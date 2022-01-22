/* Example of a HTTP request using fetch API */

document.querySelector("#btn1").addEventListener("click", function(e){
    //console.log("Button clicked");
    fetch('http://localhost:3000/api/test-get', {
        method: 'GET'
        /*,
        body: JSON.stringify({
            name: document.querySelector("#email").value,
            password: document.querySelector("#pass").value
        })*/
    }).then(res => {
        console.log(res.status);
        return res.json();
    }).then(data => {
        console.log(data);
    }).catch(err => console.log(err));
});

/*
document.querySelector("#logo").addEventListener("click", function(e){
    fetch('http://localhost:3000/blu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin' :'*',
            'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS'
        },
        body: JSON.stringify({
            a: 7,
            str: 'Some string &&&'
        })
    }).then(res => {
        console.log(res.status);
    }).catch(err => console.log(err));
});*/

document.querySelector("#logo").addEventListener("click", function(e){
    fetch('http://localhost:3000/api/test-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({
            name: 'John Doe',
            location: 'Dublin, Ireland',
            email: 'johndoe@gmail.com',
            hobbies : ['football', 'web development', 'reading'],
            address: {
                street: 'Avondale Rd.',
                county: 'Dublin',
                houseNo: 14
            }
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
});