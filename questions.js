/*----------------------- I am GOING INSANE WHILE DOING THIS HOMEWORK >:()--------------*/


var containerQuestionEl = document.getElementById("question-part");
var questionEl = document.getElementById("choices")
var answerbuttonsEl = document.getElementById("answer-btn")
var timerEl = document.querySelector("#timer");
var containerStartEl = document.getElementById("container");
var containerEndEl = document.getElementById("end-container")
var btnStartEl = document.querySelector("#start-quiz");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
var arrayShuffledQuestions = '0';
var QuestionIndex = 0


var questions = [
  {
    q: 'Arrays in Javascript can be used to store __________.',
    a: '4. all of the above',
    choices: [{ choice: '1. numbers' }, { choice: '2. booleans' }, { choice: '3. strings' }, { choice: '4. all of the above' }]
  },
  {
    q: 'Inside which HTML element do we put the javascript?',
    a: '3. <script>',
    choices: [{ choice: '1. <h1>' }, { choice: '2. <js>' }, { choice: '3. <script>' }, { choice: '4. <head>' }]
  },
  {
    q: 'In the code -- setinterval(time(),1000) -- what is time()?',
    a: '1. callback function',
    choices: [{ choice: '1. callback function' }, { choice: '2. undefined' }, { choice: '3. variable' }, { choice: '4. all of the above' }]
  },
  {
    q: 'What syntax would call a function?',
    a: '4. function()',
    choices: [{ choice: '1. var function' }, { choice: '2. function' }, { choice: '3. call function' }, { choice: '4. function()' }]
  },
  {
    q: 'When did javascript first appear?',
    a: '1. 1995',
    choices: [{ choice: '1. 1995' }, { choice: '2. Roaring twenties' }, { choice: '3. 2005' }, { choice: '4. 2000' }]
  },
  {
    q: 'What does DOM stand for?',
    a: '2. Document Object Model',
    choices: [{ choice: '1. Do Overnight Modules' }, { choice: '2. Document Object Model' }, { choice: '3. Divas Obviously Model' }, { choice: '4. Do Oo Mo' }]
  },
  {
    q: 'What is getItem commonly used for?',
    a: '2. local storage',
    choices: [{ choice: '1. adding drama' }, { choice: '2. local storage' }, { choice: '3. online shopping' }, { choice: '4. naming a variable' }]
  },
];

var startGame = function () {
  containerStartEl.classList.add('hide');
  containerStartEl.classList.remove('visible');
  containerQuestionEl.classList.remove('hide');
  containerQuestionEl.classList.add('visible');
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

/* -----------------------Retry from high score page ----------------------*/

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

