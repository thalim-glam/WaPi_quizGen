var containerQuestionEl = document.getElementById("question-part");
var questionEl = document.getElementById("choices");
var answerbuttonsEl = document.getElementById("answer-btn");
var timerEl = document.querySelector("#timer");
var containerStartEl = document.getElementById("container");
var containerEndEl = document.getElementById("end-container");
var btnStartEl = document.querySelector("#start-quiz");
var btnGoBackEl = document.querySelector("#go-back");
var gameover = "";
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
var arrayShuffledQuestions = '0';
var QuestionIndex = 0;
var containerScoreEl = document.getElementById("score");
var containerHighScoresEl = document.getElementById("high-score-container");
var ViewHighScoreEl = document.getElementById("high-score");
var listHighScoreEl = document.getElementById("high-score-list");
var formInitials = document.getElementById("initial-form");
var btnClearScoresEl = document.querySelector("#clear-high-score");
var timeleft = 0;
var score = 0;
var HighScores = [];


var questions = [
  {
    q: 'How many columns are allowed in a bootstrap grid system? ',
    a: '[D] 12',
    choices: [{ choice: '[A] 10' }, { choice: '[B] 4' }, { choice: '[C] 8' }, { choice: '[D] 12' }]
  },
  {
    q: 'Inside which HTML element do we put the javascript?',
    a: '[C] <script>',
    choices: [{ choice: '[A] <header>' }, { choice: '[B] <link href=>' }, { choice: '[C] <script>' }, { choice: '[D] <head>' }]
  },
  {
    q: 'Which of the following is the correct syntax of creating a standard navigation tab?',
    a: '[A] <ul class="nav nav-tabs">',
    choices: [{ choice: '[A] <ul class="nav nav-tabs">' }, { choice: '[B] <ul class="navigation tabs">' }, { choice: '[C] <ul class="nav tab">' }, { choice: '[D] <ul class="navigation nav-tabs">' }]
  },
  {
    q: 'What syntax would call a function?',
    a: '[D] function()',
    choices: [{ choice: '[A] var function' }, { choice: '[B] function syntax' }, { choice: '[C] call function' }, { choice: '[D] function()' }]
  },
  {
    q: 'When did javascript first appear?',
    a: '[A] 1995',
    choices: [{ choice: '[A] 1995' }, { choice: '[B] 1959' }, { choice: '[C] 2005' }, { choice: '[D] 1985' }]
  },
  {
    q: 'What does DOM stand for?',
    a: '[B] Document Object Model',
    choices: [{ choice: '[A] Do Overnight Modules' }, { choice: '[B] Document Object Model' }, { choice: '[C] Device Obviously Model' }, { choice: '[D] Document Oriented Module' }]
  },
  {
    q: 'What is getItem commonly used for? ',
    a: '[B] Local storage',
    choices: [{ choice: '[A] Get more Information' }, { choice: '[B] Local storage' }, { choice: '[C] Get Items' }, { choice: '[D] Assign a variable' }]
  },
  {
    q: 'Which of the following class in Bootstrap is used to create a dropdown menu? ',
    a: '[B] .dropdown',
    choices: [{ choice: '[A] .select-list' }, { choice: '[B] .dropdown' }, { choice: '[C] .select' }, { choice: '[D] None of the above' }]
  },
  {
    q: ' The "function" and " var" are known as: ',
    a: '[C] Declaration statements',
    choices: [{ choice: '[A] Keywords ' }, { choice: '[B] Data types ' }, { choice: '[C] Declaration statements' }, { choice: '[D] Prototypes ' }]
  },
  {
    q: 'Which one of the following is the correct way for calling the JavaScript code? ',
    a: '[B] Function/Method',
    choices: [{ choice: '[A] Triggering Event' }, { choice: '[B] Function/Method' }, { choice: '[C] Preprocessor' }, { choice: '[D] "None of the above" ' }]
  },
  {
    q: ' Which one of the following symbol is used for creating comments in the javascript: ',
    a: '[A] /* Comment*/',
    choices: [{ choice: '[A] /* Comment*/' }, { choice: '[B] * Comment *' }, { choice: '[C] /Comment/' }, { choice: '[D] $Comment' }]
  },
];

/*------------------------------When the start button clicked the quiz starts here--------------------*/
var startGame = function () {
  containerStartEl.classList.add('hide');
  containerStartEl.classList.remove('show');
  containerQuestionEl.classList.remove('hide');
  containerQuestionEl.classList.add('show');
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
}

/*-------------------------------------- Setting next question to display -------------------------*/
var setQuestion = function () {
  resetAnswers()
  displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

/*-------------------------------------  Set timer  -------------------------------------*/
var setTime = function () {
  timeleft = 30;

  var timercheck = setInterval(function () {
    timerEl.innerText = timeleft;
    timeleft--

    if (gameover) {
      clearInterval(timercheck)
    }

    if (timeleft < 0) {
      showScore()
      timerEl.innerText = 0
      clearInterval(timercheck)
    }

  }, 1000)
}

/* ------------------------------this will remove the answer ----------- */
var resetAnswers = function () {
  while (answerbuttonsEl.firstChild) {
    answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
  };
}

/* ----------------------- Retry from high score page ----------------------*/
var renderStartPage = function () {
  containerHighScoresEl.classList.add("hide")
  containerHighScoresEl.classList.remove("show")
  containerStartEl.classList.remove("hide")
  containerStartEl.classList.add("show")
  containerScoreEl.removeChild(containerScoreEl.lastChild)
  QuestionIndex = 0
  gameover = ""
  timerEl.textContent = 0
  score = 0

  if (correctEl.className = "show") {
    correctEl.classList.remove("show");
    correctEl.classList.add("hide")
  }
  if (wrongEl.className = "show") {
    wrongEl.classList.remove("show");
    wrongEl.classList.add("hide");
  }
}

var displayQuestion = function (index) {
  questionEl.innerText = index.q;
  for (var i = 0; i < index.choices.length; i++) {
    var answerbutton = document.createElement('button')
    answerbutton.innerText = index.choices[i].choice
    answerbutton.classList.add('btn')
    answerbutton.classList.add('answerbtn')
    answerbutton.addEventListener("click", answerCheck)
    answerbuttonsEl.appendChild(answerbutton)
  }
};
var answerCorrect = function () {
  if (correctEl.className = "hide") {
    correctEl.classList.remove("hide")
    correctEl.classList.add("banner")
    wrongEl.classList.remove("banner")
    wrongEl.classList.add("hide")
  }
}

var answerWrong = function () {
  if (wrongEl.className = "hide") {
    wrongEl.classList.remove("hide")
    wrongEl.classList.add("banner")
    correctEl.classList.remove("banner")
    correctEl.classList.add("hide")
  }
}

var answerCheck = function (event) {
  var selectedanswer = event.target;
  if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText) {
    answerCorrect()
    score = score + 7
  }

  else {
    answerWrong()
    score = score - 1;
    timeleft = timeleft - 3;
  };
  QuestionIndex++
  if (arrayShuffledQuestions.length > QuestionIndex + 1) {
    setQuestion()
  }
  else {
    gameover = "true";
    showScore();
  }
}

/* ---------------------------------- Show Score--------------------------*/
var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("Your final score is " + score + "!");
  containerScoreEl.appendChild(scoreDisplay);
}

/* --------------------------------------------- High Score --------------------------*/
var createHighScore = function (event) {
  event.preventDefault();
  var initial = document.querySelector("#initial").value;
  if (!initial) {
    alert("Ooopsss ! You forgot to Enter your intial !");
    //return;
  }

  //var HighScores = [];
  var currentScore = {
    initial: initial,
    score: score
  }

  formInitials.reset();

  /*------------------------ Pushing value to the HighScore array-------------*/
  HighScores.push(currentScore);
  HighScores.sort((a, b) => { return b.score - a.score });

  /*--------------------------- clear visibile list -----------------------*/
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
  }

  /*----------------------- Creating List element -------------------------------------*/
  for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerHTML = HighScores[i].initial + " : " + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
  }
  saveHighScore();
  displayHighScores();
}

var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores))
}

/* --------------------------------- load values/ called on page load ------------------*/
var loadHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores")
  if (!LoadedHighScores) {
    return false;
  }

  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a, b) => { return b.score - a.score })

  for (var i = 0; i < LoadedHighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "score-list";
    //-------------------------------------
    highscoreEl.innerText = LoadedHighScores[i].initial + " : " + LoadedHighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);

    HighScores.push(LoadedHighScores[i]);
  }
}

/*-------------------------------------display high score screen from link or when intiials entered------*/
var displayHighScores = function () {

  containerHighScoresEl.classList.remove("hide");
  containerHighScoresEl.classList.add("show");
  gameover = "true"

  if (containerEndEl.className = "show") {
    containerEndEl.classList.remove("show");
    containerEndEl.classList.add("hide");
  }
  if (containerStartEl.className = "show") {
    containerStartEl.classList.remove("show");
    containerStartEl.classList.add("hide");
  }

  if (containerQuestionEl.className = "show") {
    containerQuestionEl.classList.remove("show");
    containerQuestionEl.classList.add("hide");
  }

  if (correctEl.className = "show") {
    correctEl.classList.remove("show");
    correctEl.classList.add("hide");
  }

  if (wrongEl.className = "show") {
    wrongEl.classList.remove("show");
    wrongEl.classList.add("hide");
  }

}
/*-----------------------------------clears high scores----------------------*/
var clearScores = function () {
  HighScores = [];

  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }

  localStorage.clear(HighScores);

}

loadHighScore()

/*-------------------- Button Clicks ----------------------- */
btnStartEl.addEventListener("click", startGame);                           //Start
btnGoBackEl.addEventListener("click", renderStartPage);                    //Retry
btnClearScoresEl.addEventListener("click", clearScores);                   //Clear Score
ViewHighScoreEl.addEventListener("click", displayHighScores);              //High Score
formInitials.addEventListener("submit", createHighScore);                  //Clear Initial