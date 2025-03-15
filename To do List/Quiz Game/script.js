// script.js
const questions = [
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Florida", correct: false },
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreValueElement = document.getElementById("scoreValue");
const nextBtn = document.getElementById("nextBtn");

// Start the quiz
loadQuestion();

function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.addEventListener("click", () => selectAnswer(answer.correct, button));
        answersElement.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    answersElement.innerHTML = "";
}

function selectAnswer(isCorrect, button) {
    if (isCorrect) {
        button.classList.add("correct");
        score++;
        scoreValueElement.textContent = score;
    } else {
        button.classList.add("incorrect");
    }

    // Disable all buttons after selection
    Array.from(answersElement.children).forEach(btn => {
        btn.disabled = true;
        if (questions[currentQuestionIndex].answers.find(ans => ans.text === btn.textContent && ans.correct)) {
            btn.classList.add("correct"); // Highlight the correct answer
        }
    });

    // Show the Next button
    nextBtn.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionElement.textContent = "Quiz Finished!";
        answersElement.innerHTML = `<p>Your final score is ${score} out of ${questions.length}!</p>`;
        nextBtn.style.display = "none";
    }
}