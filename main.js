const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
    {
      question: 'Who was the first legion to embrace chaos?',
      answers: [
        { text: 'Wordbearers', correct: true },
        { text: 'Sons of Horus', correct: false },
        { text: "Ultramarines", correct: false},
        {text: "Emperor's Children", correct: false},
      ]
    },
    {
      question: "What is Slaanesh's holy number?",
      answers: [
        { text: '8', correct: false },
        { text: '6', correct: true },
        { text: '7', correct: false},
        { text: '9', correct: false }
      ]
    },
    {
      question: 'Who was the first to yell "Death to the False Emperor!"',
      answers: [
        { text: 'Horus', correct: false },
        { text: 'Sevatar', correct: true },
        { text: 'Magnus', correct: false },
        { text: 'Loken', correct: false }
      ]
    },
    {
      question: 'What are the daemons called by people?',
      answers: [
        { text: 'Daemons', correct: false },
        { text: 'Neverborn', correct: true },
        { text: 'Unliving', correct: false},
        { text: 'Nevermore', correct: false}
      ]
    }
  ]

