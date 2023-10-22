
const name = document.getElementById("user");
const login = document.getElementById("login");
login.addEventListener("click",() => {
    const username = name.value;
    if(username.trim()!==""){
        localStorage.setItem("username",username);
        window.location.href = "quiz.html";
    }
    else{
        alert("Please enter your name");
    }
})

    