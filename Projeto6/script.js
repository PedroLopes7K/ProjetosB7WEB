// dados iniciais
let currentQuestion = 0
let correctANSWERS = 0

showQuestion()

//events
document
  .querySelector('.scoreArea button')
  .addEventListener('click', eventRESET)

// funçoes
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion]

    let porcentagem = Math.floor((currentQuestion / questions.length) * 100)

    document.querySelector('.progress--bar').style.width = `${porcentagem}%`

    document.querySelector('.scoreArea').style.display = 'none'
    document.querySelector('.questionArea').style.display = 'block'

    document.querySelector('.question').innerHTML = q.question

    let optionsHTML = ''

    for (let i in q.options) {
      optionsHTML += `<div data-op="${i}" class='option'><span>${
        parseInt(i) + 1
      }</span> ${q.options[i]}</div>`
    }
    document.querySelector('.options').innerHTML = optionsHTML

    document.querySelectorAll('.options .option').forEach(item => {
      item.addEventListener('click', optionClickEvent)
    })
  } else {
    //acabaram as questoes
    finishQuiz()
  }
}

function optionClickEvent(e) {
  let clickOption = parseInt(e.target.getAttribute('data-op'))

  if (questions[currentQuestion].answer === clickOption) {
    correctANSWERS++
  }
  currentQuestion++
  showQuestion()
}

function finishQuiz() {
  let points = Math.floor((correctANSWERS / questions.length) * 100)

  if (points < 30) {
    document.querySelector('.scoreText1').innerHTML =
      'Estude mais um pouco na proxima vez'
    document.querySelector('.scorePct').style.color = '#FF0000'
  } else if (points >= 30 && points < 70) {
    document.querySelector('.scoreText1').innerHTML = 'Muito BOM'
    document.querySelector('.scorePct').style.color = '#FFFF00'
  } else if (points >= 70) {
    document.querySelector('.scoreText1').innerHTML = 'Parabens'
    document.querySelector('.scorePct').style.color = 'green'
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
  document.querySelector(
    '.scoreText2'
  ).innerHTML = `você respondeu ${questions.length} e acertou ${correctANSWERS} `

  document.querySelector('.scoreArea').style.display = 'block'
  document.querySelector('.questionArea').style.display = 'none'
  document.querySelector('.progress--bar').style.width = '100%'
}

function eventRESET() {
  correctANSWERS = 0
  currentQuestion = 0
  showQuestion()
}
