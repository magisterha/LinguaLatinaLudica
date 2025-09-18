const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

// --- BANCO DE PREGUNTAS EN CHINO TRADICIONAL (繁體中文) ---
const questions = [
    {
        question: '"Amare" 是什麼意思？',
        answers: [
            { text: '愛', correct: true },
            { text: '恨', correct: false },
            { text: '走路', correct: false },
            { text: '吃', correct: false }
        ]
    },
    {
        question: '"Canis" 是什麼意思？',
        answers: [
            { text: '貓', correct: false },
            { text: '馬', correct: false },
            { text: '狗', correct: true },
            { text: '獅子', correct: false }
        ]
    },
    {
        question: '"Aqua" 是什麼意思？',
        answers: [
            { text: '火', correct: false },
            { text: '水', correct: true },
            { text: '土', correct: false },
            { text: '空氣', correct: false }
        ]
    },
    {
        question: '"Magister" 是什麼意思？',
        answers: [
            { text: '學生', correct: false },
            { text: '士兵', correct: false },
            { text: '國王', correct: false },
            { text: '老師', correct: true }
        ]
    },
    {
        question: '"Lupus" 是什麼意思？',
        answers: [
            { text: '獅子', correct: false },
            { text: '熊', correct: false },
            { text: '狼', correct: true },
            { text: '老鷹', correct: false }
        ]
    },
    {
        question: '"Domus" 是什麼意思？',
        answers: [
            { text: '房子', correct: true },
            { text: '學校', correct: false },
            { text: '寺廟', correct: false },
            { text: '城市', correct: false }
        ]
    },
    {
        question: '"Puella" 是什麼意思？',
        answers: [
            { text: '男孩', correct: false },
            { text: '女人', correct: false },
            { text: '男人', correct: false },
            { text: '女孩', correct: true }
        ]
    },
    {
        question: '"Sol" 是什麼意思？',
        answers: [
            { text: '月亮', correct: false },
            { text: '星星', correct: false },
            { text: '太陽', correct: true },
            { text: '天空', correct: false }
        ]
    },
    {
        question: '"Vinum" 是什麼意思？',
        answers: [
            { text: '水', correct: false },
            { text: '麵包', correct: false },
            { text: '葡萄酒', correct: true },
            { text: '牛奶', correct: false }
        ]
    },
    {
        question: '"Bellum" 是什麼意思？',
        answers: [
            { text: '和平', correct: false },
            { text: '愛', correct: false },
            { text: '勝利', correct: false },
            { text: '戰爭', correct: true }
        ]
    }
];

// Listeners para los botones
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    resultContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (shuffledQuestions.length > currentQuestionIndex) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    
    if (correct) {
        score++;
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    scoreElement.innerText = `${score} / ${questions.length}`;
}
