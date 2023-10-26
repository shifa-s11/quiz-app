const username = localStorage.getItem("username");
if (username) {
    document.getElementById("username").textContent = username;
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
let attempt = 0;
const maxques = 12;
let unattempt = maxques;
let review = 0;
//choices and score
let selchoice = null; 
choices.forEach(choice => {
    choice.addEventListener("click", event => {
        if (!accans) return;
        accans = false;
        const sel = event.target;
        selchoice = sel;
        sel.style.backgroundColor = "blue"; 
        setTimeout(() => {
            selchoice.style.backgroundColor = "#efe9e9";
                },2000 )
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
    localStorage.setItem("score",score)
    return window.location.assign("end.html")
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
    return window.location.assign("end.html")
}
};
document.getElementById("next").addEventListener("click",() =>
newques(),
)
starttime();

//timer
let time = 5*60;
const timer = document.getElementById("timer");
function timedisp (){
const min = Math.floor(time / 60);
const sec = (time % 60);
timer.textContent = `Time Left: 0${min}:${sec}`;
}
const timerInterval = setInterval(() => {
    if (time <= 0) {
       timer.textContent = "TIME'S UP"
    } else {
        time--;
        timedisp();
    }
}, 1000);
timedisp();


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
// STATUS
const container = document.getElementById("container")
const statbutton = document.getElementById("statbutton");
const status1 = document.getElementById('status1');
let show = true;

function status2(){
    if(show){
        status1.style.display = "flex";
        container.style.display = "grid";
        show = false;
    }
    else{
        container.style.display ="block"
        status1.style.display = "none";
        show = true;
    }
}
statbutton.addEventListener("click",() =>{
    status2()
})



