const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const numCorrectText = document.getElementById("numCorrect");
const progressBar = document.getElementById("progressBar");
const loaderElement = document.getElementById("loader");
const gameElement = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let numCorrect = 0;
let questionCounter = 0;
let availableQuesions = [];

const CORRECT_BONUS = 1;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const numQuestions = parseInt(urlParams.get('numQuestions'));
const NUM_QUESTIONS =  numQuestions || 10;

let questions = [];
fetch("https://opentdb.com/api.php?amount="+NUM_QUESTIONS+"&difficulty=easy&type=multiple")
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map( loadedQuestion => {
          const formattedQuestion = {
            question: loadedQuestion.question
          };
          const answerChoices = [...loadedQuestion.incorrect_answers];
          formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
          answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer); 

          answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
          });

          return formattedQuestion;
        }); 
        startGame();
    })
    .catch((error) => {
        console.error("Error loading questions: ", error);
    });


startGame = () => {
  questionCounter = 0;
  numCorrect = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  loaderElement.classList.add("hidden");  //  Hide loader
  gameElement.classList.remove("hidden");     //  Show game
};



getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= NUM_QUESTIONS) {
    let finalPercent =  ((numCorrect/NUM_QUESTIONS) * 100).toFixed(1);
    localStorage.setItem('finalPercent', (finalPercent));
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${NUM_QUESTIONS}`;
  questionProgress = questionCounter/NUM_QUESTIONS;
  progressBar.style.width = `${questionProgress*100}%`;
  
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = parseInt(choice.dataset["number"])-10;
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};


choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = parseInt(selectedChoice.dataset["number"]);

    const correctAnswer = parseInt(currentQuestion.answer);
    const correctElement = document.querySelector('[data-number="'+(correctAnswer+10)+'"]');

    // alert("Pick: " + selectedAnswer + " || " + "Correct: " + correctAnswer);

    const classToApply =
      (selectedAnswer-10) == currentQuestion.answer ? "correct" : "incorrect";
    
    if (classToApply === "correct") {
      incrementCorrect(CORRECT_BONUS);
    }  else {
      setTimeout(() => {
        correctElement.classList.add("correct-light");
      }, 500);  
    }

    selectedChoice.parentElement.classList.add(classToApply);
    
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      correctElement.classList.remove("correct-light");
      getNewQuestion();
    }, 1000);
  });
});


incrementCorrect = num => {
  numCorrect += num;
  numCorrectText.innerText = numCorrect;
};
