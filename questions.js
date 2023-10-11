var quizContainer = document.getElementById('choices');
var resultContainer = document.getElementById('answer-btn');
var submitButton = document.getElementById('submit');
var retryButton = document.getElementById('retry');
var showAnswerButton = document.getElementById('showAnswer');

var quizData = [
  {
    question: 'How many sides are there in a Triangle?',
    options: ['0', '1', '2', '3'],
    answer: '3',
  },
  {
    question: 'How many sides are there in a Circle?',
    options: ['0', '1', '2', '3'],
    answer: '0',
  },
  {
    question: 'How many sides are there in a Square?',
    options: ['1', '2', '3', '4'],
    answer: '4',
  },
  {
    question: 'How many sides are there in a Rectangle?',
    options: ['1', '2', '3', '4'],
    answer: '4',
  },
  {
    question: 'How many sides are there in a Pentagon?',
    options: ['1', '2', '3', 'none of the above'],
    answer: 'none of the above',
  },
  {
    question: 'Which shape has four sides?',
    options: ['Square', 'Triangle', 'Rectanlge', 'Both 1 and 3'],
    answer: 'Both 1 and 3',
  },
  {
    question: 'How many sides are there in a Oval?',
    options: ['1', '2', '3', 'none of the above'],
    answer: 'none of the above',
  },
  {
    question: 'Which shape has no sides?',
    options: ['Square', 'Triangle', 'Oval', 'Both 1 and 3'],
    answer: 'Oval',
  },
  {
    question: 'Which shape has four sides?',
    options: ['Circle', 'Triangle', 'Rectanlge', 'None of the above'],
    answer: 'Rectangle',
  },
  {
    question: 'Who is the best in the universe?',
    options: ['Square', 'Triangle', 'Rectanlge', 'You'],
    answer: 'You',
  },
];

var currentQuestion = 0;
var score = 0;
var incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();