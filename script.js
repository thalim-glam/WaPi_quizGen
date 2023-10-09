var startbtn = document.querySelector("#start");
var questionEl = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var startScreen = document.querySelector("#startScreen");

function startQuiz() {
  startScreen.setAttribute(document.getElementById("class").style.display = "none";);
  questionEl.removeAttribute("class");
}
startbtn.onclick = startQuiz;