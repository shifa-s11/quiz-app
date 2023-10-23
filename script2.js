const username = localStorage.getItem("username");
if (username) {
    document.getElementById("username").textContent = username;
}

const choices = Array.from(document.getElementsByClassName("choice"));
const question = document.getElementById("ques");
let currques = {};
let accans = true;
let score = 0;
let quesCount = 0;
let availquest = [];
let questions = [];

const corr_point = 4;
const incorr_point = -1;
const maxques = 12;

start = () => {
    score = 0;
    quesCount = 0;
    availquest = [...questions];
    console.log(availquest);
    newques();
};

newques = () => {
    quesCount++;
    const quesindex = Math.floor(Math.random() * availquest.length);
    currques = availquest[quesindex];
    question.querySelector("h2").textContent = currques.question;
    choices.forEach(choice => {
        const number = choice.querySelector(".value").getAttribute("data-number");
        choice.querySelector(".value").textContent = currques['choosen' + number];
    });
};

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
            };

            const choices = [...data.incorrect_answers];
            questdisp.answer = Math.floor(Math.random() * 3) + 1;
            choices.splice(questdisp.answer - 1, 0, data.correct_answer);
            choices.forEach((choosen, index) => {
                questdisp["choosen" + (index + 1)] = choosen;
            });

            return questdisp;
        });
        start();
    })
    .catch(error => {
        console.error(error);
    });






