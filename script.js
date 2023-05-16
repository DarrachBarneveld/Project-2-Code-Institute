import {
  QueenslandQuestions,
  NorthernTerritoryQuestions,
} from "./questions.js";

const question = document.getElementById("question");
const questionContainer = document.querySelector(".question-container");
const quizBtn = document.getElementById("quizbtn");
const answers = document.getElementById("answers");

let correctAnswers = 0;
let chosenQuestions = [];

if (url[0] === "/northernterritory") {
  chosenQuestions = NorthernTerritoryQuestions;
} else {
  chosenQuestions = QueenslandQuestions;
}

function startQuiz() {
  quizBtn.remove();

  nextQuestion(0);
}

async function nextQuestion(i) {
  if (chosenQuestions.length <= i) {
    await delayTimer(500);
    endQuiz();
    return;
  }

  question.textContent = chosenQuestions[i].question;

  const currentAnswers = chosenQuestions[i].answers;

  const html = `  <button class="btn">${currentAnswers[0]}</button>
    <button class="btn">${currentAnswers[1]}</button>
    <button class="btn">${currentAnswers[2]}</button>
    <button class="btn">${currentAnswers[3]}</button>`;
  answers.innerHTML = html;

  const answerBtns = Array.from(answers.querySelectorAll(".btn"));

  answerBtns.forEach((button) => {
    button.addEventListener("click", (e) => checkAnswer(e, i));
  });
}

async function checkAnswer(e, i) {
  const answer = e.target.textContent;

  if (answer === chosenQuestions[i].correct) {
    e.target.style.background = "green";
    correctAnswers++;

    await delayTimer(500);
    nextQuestion(i + 1);
  } else {
    e.target.style.background = "red";
    await delayTimer(500);
    nextQuestion(i + 1);
  }
}

function endQuiz() {
  let html;

  if (correctAnswers === 0) {
    html = `<h3>Better luck next time</h3>`;
    questionContainer.innerHTML = html;

    return;
  }
  if (correctAnswers === 1) {
    html = `
      <h3>You Won!</h3>
      <div class="badge-container">
      <img
        class="badge"
        src="assets/images/${chosenQuestions[0].badge}.jpg"
        alt="picture of a ${chosenQuestions[0].badge}"
      />
    </div>`;
  }
  if (correctAnswers === 2) {
    html = `
      <h3>You Won!</h3>
      <div class="badge-container">
      <img
        class="badge"
        src="assets/images/${chosenQuestions[0].badge}.jpg"
        alt="picture of a ${chosenQuestions[0].badge}"
      />
      <img
        class="badge"
        src="assets/images/${chosenQuestions[1].badge}.jpg"
        alt="picture of a ${chosenQuestions[1].badge}"
      />
    </div>`;
  }
  if (correctAnswers === 3) {
    html = `
      <h3>You Won!</h3>
      <div class="badge-container">
      <img
        class="badge"
        src="assets/images/${chosenQuestions[0].badge}.jpg"
        alt="picture of a ${chosenQuestions[0].badge}"
      />
      <img
        class="badge"
        src="assets/images/${chosenQuestions[1].badge}.jpg"
        alt="picture of a ${chosenQuestions[1].badge}"
      />
      <img
        class="badge"
        src="assets/images/${chosenQuestions[2].badge}.jpg"
        alt="picture of a ${chosenQuestions[2].badge}"
      />
    </div>`;
  }

  questionContainer.innerHTML = html;
}

async function checkAnswer(e, i) {
  const answer = e.target.textContent;

  if (answer === chosenQuestions[i].correct) {
    e.target.style.background = "green";
    correctAnswers++;

    await delayTimer(500);
    nextQuestion(i + 1);
  } else {
    e.target.style.background = "red";
    await delayTimer(500);
    nextQuestion(i + 1);
  }
}

// HELPER FUNCTIONS

function delayTimer(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

quizBtn.addEventListener("click", startQuiz);
