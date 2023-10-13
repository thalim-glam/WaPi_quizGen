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
var formInitials = document.getElementById("initials-form");
var btnClearScoresEl = document.querySelector("#clear-high-score");
var timeleft = 0;




var questions = [
  {
    q: 'How many columns are allowed in a bootstrap grid system? ',
    a: '4. 12',
    choices: [{ choice: '1. 10' }, { choice: '2. 4' }, { choice: '3. 8' }, { choice: '4. 12' }]
  },
  {
    q: 'Inside which HTML element do we put the javascript?',
    a: '3. <script>',
    choices: [{ choice: '1. <header>' }, { choice: '2. <link href=>' }, { choice: '3. <script>' }, { choice: '4. <head>' }]
  },
  {
    q: 'Which of the following is the correct syntax of creating a standard navigation tab?',
    a: '1. <ul class="nav nav-tabs">',
    choices: [{ choice: '1. <ul class="nav nav-tabs">' }, { choice: '2. <ul class="navigation tabs">' }, { choice: '3. <ul class="nav tab">' }, { choice: '4. <ul class="navigation nav-tabs">' }]
  },
  {
    q: 'What syntax would call a function?',
    a: '4. function()',
    choices: [{ choice: '1. var function' }, { choice: '2. function syntax' }, { choice: '3. call function' }, { choice: '4. function()' }]
  },
  {
    q: 'When did javascript first appear?',
    a: '1. 1995',
    choices: [{ choice: '1. 1995' }, { choice: '2. 1959' }, { choice: '3. 2005' }, { choice: '4. 1985' }]
  },
  {
    q: 'What does DOM stand for?',
    a: '2. Document Object Model',
    choices: [{ choice: '1. Do Overnight Modules' }, { choice: '2. Document Object Model' }, { choice: '3. Device Obviously Model' }, { choice: '4. Document Oriented Module' }]
  },
  {
    q: 'What is getItem commonly used for? ',
    a: '2. Local storage',
    choices: [{ choice: '1. Get more Information' }, { choice: '2. Local storage' }, { choice: '3. Get Items' }, { choice: '4. Assign a variable' }]
  },
  {
    q: 'Which of the following class in Bootstrap is used to create a dropdown menu? ',
    a: '2. ".dropdown" ',
    choices: [{ choice: '1. ".select-list" ' }, { choice: '2. ".dropdown" ' }, { choice: '3. ".select" ' }, { choice: '4. "None of the above" ' }]
  },
  {
    q: ' The "function" and " var" are known as: ',
    a: '3. Declaration statements',
    choices: [{ choice: '1. Keywords ' }, { choice: '2. Data types ' }, { choice: '3. Declaration statements ' }, { choice: '4. Prototypes ' }]
  },
  {
    q: 'Which one of the following is the correct way for calling the JavaScript code? ',
    a: '2. Function/Method ',
    choices: [{ choice: '1. Triggering Event' }, { choice: '2. Function/Method' }, { choice: '3. Preprocessor' }, { choice: '4. "None of the above" ' }]
  },
  {
    q: ' Which one of the following symbol is used for creating comments in the javascript: ',
    a: '3. // ',
    choices: [{ choice: '1. \* */ ' }, { choice: '2. *\* */* ' }, { choice: '3. // ' }, { choice: '4. /-/ ' }]
  },
];

/*----------------------------------- Game Starts here --------------------------------*/
var startGame = function () {
  containerStartEl.classList.add('hide');
  containerStartEl.classList.remove('show');
  containerQuestionEl.classList.remove('hide');
  containerQuestionEl.classList.add('show');
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
}

/*----------------------------- next question for quiz ---------------------------*/
var setQuestion = function () {
  resetAnswers()
  displayQuestion(arrayShuffledQuestions[QuestionIndex])
}


/*----------------------------------Set timer -------------------------------------*/
var setTime = function () {
  timeleft = 50;

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
};


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
/* ------------------------ Show Score--------------------------*/

var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("Your final score is " + score + "!");
  containerScoreEl.appendChild(scoreDisplay);
}

var createHighScore = function (event) {
  event.preventDefault()
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

  var HighScore = {
    initials: initials,
    score: score
  }

  formInitials.reset();

  /* --------------------------------------------- High Score --------------------------*/


  //push and sort scores
  HighScores.push(HighScore);
  HighScores.sort((a, b) => { return b.score - a.score });

  //clear visibile list to resort
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
  }
  //create elements in order of high scores
  for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
  }

  saveHighScore();
  displayHighScores();

}
//save high score
var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores))

}

//load values/ called on page load
var loadHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores")
  if (!LoadedHighScores) {
    return false;
  }

  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a, b) => { return b.score - a.score })


  for (var i = 0; i < LoadedHighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);

    HighScores.push(LoadedHighScores[i]);

  }
}

//display high score screen from link or when intiials entered
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
//clears high scores
var clearScores = function () {
  HighScores = [];

  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }

  localStorage.clear(HighScores);

}

loadHighScore()

/*-------------------- Button Click ----------------------- */
btnStartEl.addEventListener("click", startGame);
btnGoBackEl.addEventListener("click", renderStartPage);
btnClearScoresEl.addEventListener("click", clearScores);
ViewHighScoreEl.addEventListener("click", displayHighScores);
formInitials.addEventListener("submit", createHighScore);