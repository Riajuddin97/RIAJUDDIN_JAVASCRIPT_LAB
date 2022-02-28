function question(questionText, choices, answer) {
    this.questionText = questionText;
    this.choices = choices;
    this.answer = answer;
};

quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

quiz.prototype.getQuestionByIndex = function () {
    /*var question1 = this.questions[this.questionIndex]
    */
    return this.questions[this.questionIndex]
}

quiz.prototype.checkOptionWithAnwer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++
}


function quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
};

question.prototype.isCorrectAnswer = function (answer) {
    return this.answer === answer;
};

//question choices
var questions = [
    new question("The World Largest desert is ?", ["Thar", "Sahara", "Kalahari", "Sonoram"], "Sahara"),
    new question("Country that has the highest in Barley Production ?", ["China", "India", "Pakisthan", "Russia"], "Russia"),
    new question("The largest river in India is ?", ["Yamuna", "Ganga", "Kaveri", "Bramaputra"], "Ganga"),
    new question("The hottest planet in the solar system ?", ["Earth", "Mars", "Venus", "Jupiter"], "Venus"),
    new question("One People, One State, One leader was the policy of ?", ["Hitler", "Stalin", "Lenin", "Mussolin"], "Hitler")
]

var jsQuiz = new quiz(questions);

function loadQuestions() {
    if (jsQuiz.isEnded()) {
        showScores();
    }
    else {
        //displaying Questions
        var element = document.getElementById('question')
        element.innerHTML = jsQuiz.getQuestionByIndex().questionText;

        var choices = jsQuiz.getQuestionByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            document.getElementById('choice' + i).innerHTML = choices[i];
            handleOptionButton('btn' + i, choices[i])
        }
    }
    showProgress()
};


function showProgress() {
    var currentQuestionNumber = jsQuiz.questionIndex + 1;
    var element = document.getElementById('progress');
    element.innerHTML = "Question " + currentQuestionNumber + " of " + jsQuiz.questions.length;
};

//function for adding and calculating total scores
function showScores() {

    var quizOver = "<h1> Quiz Results </h1>";
    quizOver += "<h2 id='score'> Your score is " + jsQuiz.score + " ans your percentage is - " + ((jsQuiz.score / questions.length) * 100) + " % <h2>";
    var element = document.getElementById('quiz')
    element.innerHTML = quizOver;
};

function handleOptionButton(id, choice) {
    document.getElementById(id).onclick = function () {
        jsQuiz.checkOptionWithAnwer(choice);
        loadQuestions();
    };

};
loadQuestions();
