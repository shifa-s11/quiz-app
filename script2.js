const username = localStorage.getItem("username");
username && (
    document.getElementById("username").textContent = username
)

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
let attempt = 0;
const maxques = 12;
let unattempt = maxques;
let review = 0;
//choices and score
let selectedChoices = {};
let selchoice = null; 
choices.forEach(choice => { 
    choice.addEventListener("click", event => {
        if (!accans || selectedChoices[quesCount]) return;
        if (selchoice) {
            selchoice.style.backgroundColor = "#efe9e9";
        }
        accans = false;
        const sel = event.target;
        selchoice = sel;
        sel.style.backgroundColor = "blue"; 
    });
});
//submit
document.getElementById("submit").addEventListener("click", () => {
     {
        const selans = selchoice.dataset["number"];
        if (selans == currques.answer) {
            selchoice.style.backgroundColor = "green";
            score += 4;
        } else {
            selchoice.style.backgroundColor = "red";
            score -= 1;
        }
    }
 setTimeout(() => {
selchoice.style.backgroundColor = "#efe9e9";
newques()
    },2000 )
        selectedChoice = null;
        document.getElementById("score").textContent = score;
        localStorage.setItem("score", score);
attempt++;
unattempt--;
        document.getElementById("attempt").textContent = `Attempted :${attempt} `
    document.getElementById("unattempt").textContent = `Unattempted :${unattempt} `
    const quesnum = document.querySelector(`[id="${quesCount}"]`);
    quesnum.style.backgroundColor = "green";
    }
);
// counts
 const reviewbutton = document.getElementById("review")
reviewbutton.addEventListener("click",() =>{
review ++;
unattempt --;
document.getElementById("reviewbutton").textContent = `Marked for review :${review} `;
const quesnum = document.querySelector(`[id="${quesCount}"]`);
quesnum.style.backgroundColor = "purple";
setTimeout(() => {
    newques()
        },2000 )
})
//end
const end = document.getElementById("end");
end.addEventListener("click",() =>{
    addScore(username, score);
    return window.location.assign("end.html")
})
function endtest(){
end.click();
    }      
const timeLimit = 5*1000*60; 
function starttime() {
     setTimeout(() => {
       endtest();
    }, timeLimit);
}
// ques display
const next = document.getElementById("next")

next.addEventListener("click",() =>
newques(),
)
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
    const questionElement = document.querySelector("h2");
    questionElement.textContent = `${quesCount}. ${currques.question}`;
    questionElement.id = `ques${quesCount}`;
    choices.forEach((choice, index) => {
        const label = choice.querySelector(".option");
        const option = choice.querySelector(".value");

        label.textContent = String.fromCharCode(65 + index); // A, B, C, D
        option.textContent = currques["choosen" + (index +1)];
    });
    availquest.splice(quesindex, 1);
    accans = true;
    if(quesCount==maxques){
        next.style.display = "none";
    }
}
else {
    return window.location.assign("end.html")
}

};


//timer
let time = 5*60;
const timer = document.getElementById("timer");
function timedisp (){
const min = Math.floor(time / 60);
const sec = (time % 60);
if(sec<10){
    timer.textContent = `Time Left: 0${min}:0${sec}`;
}
else{
timer.textContent = `Time Left: 0${min}:${sec}`;
}if(time<30){
    timer.style.color = "red"
}
}
function alertwindow () {
    window.alert(`Hurry Up!! \n Test is going to end soon`)
}
setTimeout(() =>{
    alertwindow()
},270000)


// STATUS
const container = document.getElementById("container")
const statbutton = document.getElementById("statbutton");
const status1 = document.getElementById('status1');
const icon = document.getElementById("icon");
let show = true;

statbutton.addEventListener("click",() =>{
        status1.style.display = "flex";
        container.style.display = "grid";
        icon.style.display = "block"
        statbutton.style.display = "none"
    })
    icon.addEventListener("click",() =>{
        container.style.display ="block"
        status1.style.display = "none";
        icon.style.display = "none"
        statbutton.style.display = "block" 
    })
// high Scores
function save(highScores) {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
function addScore(username, score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ name: username, score: score });
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(3);
    save(highScores);
}
// navigate
const progress = document.getElementById("progress");
for (let i = 1; i <= 12; i++) {
    let span = document.createElement("span");
    span.id = i;
    span.className = "span";
    span.textContent = i;
    progress.appendChild(span);
}
const Spans = Array.from(progress.querySelectorAll(".span"));
Spans.forEach((span, index) => {
  span.addEventListener("click", () => {
    if (index < questions.length) {
      quesCount = index;
      newques();
    }
  });
});
// fetch API
document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");
    loader.style.display = "flex";
  
fetch("https://opentdb.com/api.php?amount=20&category=21&difficulty=medium&type=multiple")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data.results);
        questions = data.results.map((data,index) => {
            const questdisp = {
                id : index+1,
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
        loader.style.display = "none";
        starttime();
        const timerInterval = setInterval(() => {
            if (time <= 1) {
               timer.textContent = "TIME'S UP";
            }  else {
                time--;
                timedisp();
            }
        }, 1000);

    }
    )
    .catch(error => {
        console.error(error);
    });})

  