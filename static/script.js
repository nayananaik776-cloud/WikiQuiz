const questions = [
    {
        question: "Which country is associated with ISRO?",
        options: ["India", "France", "Japan", "Brazil"],
        answer: "India"
    },
    {
        question: "What does ISRO stand for?",
        options: [
            "Indian Space Research Organisation",
            "International Space Research Organisation",
            "Indian Science Research Organisation",
            "International Science Research Organisation"
        ],
        answer: "Indian Space Research Organisation"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    }
];

let currentQuestion = 0;
let score = 0;
let answerSelected = false;

function startQuiz() {
    const topic = document.getElementById("topicInput").value;
    const difficulty = document.getElementById("difficulty").value;

    console.log("Selected topic:", topic);
    console.log("Selected difficulty:", difficulty);

    if (topic.trim() === "") {
        alert("Please enter a topic!");
        return;
    }

    document.querySelector(".search-box").style.display = "none";
    document.getElementById("quizSection").style.display = "block";
    document.getElementById("resultSection").style.display = "none";

    currentQuestion = 0;
    score = 0;
    answerSelected = false;

    showQuestion();
}

function showQuestion() {
    const questionData = questions[currentQuestion];

    document.getElementById("question").textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length +
        ": " + questionData.question;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";

    const options = document.querySelectorAll(".option");

    answerSelected = false;

    options.forEach(function(button, index) {
        button.textContent = questionData.options[index];
        button.disabled = false;
        button.style.background = "";
        button.style.color = "";

        button.onclick = function() {
            selectAnswer(this);
        };
    });
}

function selectAnswer(button) {
    if (answerSelected) {
        return;
    }

    answerSelected = true;

    const selectedAnswer = button.textContent;

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
        button.style.background = "#b8e6c1";
        button.style.color = "#155724";
    } else {
        button.style.background = "#f5b5b5";
        button.style.color = "#721c24";
    }

    document.querySelectorAll(".option").forEach(function(option) {
        option.disabled = true;
    });
}

document.getElementById("nextBtn").onclick = function() {

    if (!answerSelected) {
        alert("Please select an answer first!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("resultSection").style.display = "block";

    document.getElementById("score").textContent =
        score + " / " + questions.length;

    const percentage =
        Math.round((score / questions.length) * 100);

    document.getElementById("percentage").textContent =
        percentage + "%";

    let message = "";

    if (percentage >= 80) {
        message = "Excellent! 🎉";
    } else if (percentage >= 50) {
        message = "Good job! 👍";
    } else {
        message = "Keep learning and try again! 📚";
    }

    document.getElementById("message").textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answerSelected = false;

    document.getElementById("resultSection").style.display = "none";
    document.getElementById("quizSection").style.display = "none";
    document.querySelector(".search-box").style.display = "flex";

    document.getElementById("topicInput").value = "";
}