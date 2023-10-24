const username = localStorage.getItem("username");
if (username) {
    document.getElementById("username").textContent = username;
}

const choices = Array.from(document.getElementsByClassName("choice"));
const question = document.getElementById("ques");
const optionLabels = Array.from(document.querySelectorAll(".choice .option")); // Added option labels
let currques = {};
let accans = true;
let score = 0;
let quesCount = 0;
let availquest = [];
let questions = [];

const corr_point = 4;
const incorr_point = -1;
const unattemted = 0;
const maxques = 12;
const review = 0;
document.getElementById("submit").addEventListener("click", () => {
    accans = true;
    choices.forEach(choice =>{
        choice.addEventListener("click",event =>{
            if(!accans) return;
            accans = false;
            const selchoice = event.target;
            const selans = selchoice.dataset["number"];
      
    if(selans==currques.answer){
        score += 4;
    }
    else{
        score -= 1;
    } 
});document.getElementById("score").textContent = `Total Score: ${score}`;})

})
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
} else {
    return window.location.assign("/end.html")
}
};
document.getElementById("next").addEventListener("click",() =>
newques())


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






