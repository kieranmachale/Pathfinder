$(function(){
    $(".dropdown-item").click(function(){
        let iconText = $(this).html();
        $(".dropdown-toggle").html(iconText);
        document.querySelector(".sb").value = iconText;
    })
});

let submitSearchBtn = document.querySelector(".btn-link");
if(submitSearchBtn){
    handleSearch();
} else{
    console.log("Button has been deleted or renamed!");
}

const repos = ['Range/Object Detection'];
function handleSearch(){
    submitSearchBtn.addEventListener("click", function(e){
        e.preventDefault();
        let choice = document.querySelector(".sb").value;
        if(choice){
            if(repos.includes(choice)){
                let url = `https://github.com/kieranmachale/Pathfinder/tree/main/pathfinder-app/scripts/object_detection`;
                //console.log(url);
                location.href = url;
            } else{
                window.alert("Sorry, that repository doesn't exist!");
            }
        } else{
            window.alert("Nothing selected!");
        }
        
    });
}