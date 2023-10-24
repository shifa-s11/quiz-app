const username = localStorage.getItem("username");
if (username) {
    document.getElementById("username").textContent = username;
}
//end
const end = document.getElementById("end");
end.addEventListener("click",() =>{
    return window.location.assign("/end.html")
})
function endtest(){
end.click();
    }      
const timeLimit = 5*60*1000; 

function starttime() {
     setTimeout(() => {
       endtest();
    }, timeLimit);
}
const value = document.getElementsByClassName("value");
const choices = Array.from(document.getElementsByClassName("choice"));
const question = document.getElementById("ques");
const optionLabels = Array.from(document.querySelectorAll(".choice .option")); // Added option labels
let currques = {};
let accans = true;

let quesCount = 0;
let availquest = [];
let questions = [];
let score = 0;
const attempt = 0;
const maxques = 12;
const unattempt = maxques;
let review = 0;
choices.forEach(choice => {
    choice.addEventListener("click",event =>{
    if(!accans) return;
    accans = false;
    const sel = event.target;
    const selans = sel.dataset["number"];
    if(selans == currques.answer){
 sel.style.backgroundColor = "green";
 score += 4;
    }
    else{
        sel.style.backgroundColor = "red";
        score -= 1;
     }
    setTimeout( () =>{
        sel.style.backgroundColor ="#efe9e9"
        newques()
    },5000)
    document.getElementById("score").textContent = score;
})
});



// document.getElementById("score").textContent = `Total Score: ${score}`;
// // score
// const submit = document.getElementById("submit");
// const reviewbutton = document.getElementById("review");
// submit.addEventListener("click",()=> 
// newques())
// reviewbutton.addEventListener("click",() =>
// newques(),
// review++,

// )
// document.getElementById("reviewbutton").textContent = `Review: ${review}`;
start = () => {
    score = 0;
    quesCount = 0;
    availquest = [...questions];
    console.log(availquest);
    newques();
};
newques = () => {
    if (quesCount < maxques) {
    quesCount++;
    const quesindex = Math.floor(Math.random() * availquest.length);
    currques = availquest[quesindex];
  question.querySelector("h2").textContent = `${quesCount}. ${currques.question}`;
    choices.forEach((choice, index) => {
        const label = choice.querySelector(".option");
        const option = choice.querySelector(".value");
        label.textContent = String.fromCharCode(65 + index); // A, B, C, D
        option.textContent = currques["choosen" + (index +1)];
    });
    availquest.splice(quesindex, 1);
    accans = true;
} else {
    return window.location.assign("/end.html")
}
};
document.getElementById("next").addEventListener("click",() =>
newques(),
starttime())



// fetch API
fetch("https://opentdb.com/api.php?amount=20&category=21&difficulty=medium&type=multiple")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data.results);
        questions = data.results.map(data => {
            const questdisp = {
                question: data.question,
                answer: data.correct_answer,
            };

            const choices = [...data.incorrect_answers];
            questdisp.answer = Math.floor(Math.random() * 3) + 1;
            choices.splice(questdisp.answer - 1, 0, data.correct_answer);
            for (let i = 1; i <= 4; i++) {
                questdisp["choosen" + i] = choices[i - 1];
            }

            return questdisp;
        });
        start();
    })
    .catch(error => {
        console.error(error);
    });






