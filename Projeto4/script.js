// DADOS INICIAIS
let quadrados = {
  a1: '',
  a2: '',
  a3: '',
  b1: '',
  b2: '',
  b3: '',
  c1: '',
  c2: '',
  c3: ''
}
let player = ''
let warning = ''
let playing = false

reset()

// EVENTOS
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemclick)
})

//FUNÇOES
function itemclick(event) {
  let item = event.target.getAttribute('data-item')
  if (playing && quadrados[item] === '') {
    quadrados[item] = player
    preencherQuadrado()
    alternaPlayer()
  }
}

function reset() {
  warning = ''
  // numero aleatorio ou 1  ou 0
  let random = Math.floor(Math.random() * 2)
  // player = (random === 0 ) ? 'x' : 'O'
  if (random === 0) {
    player = 'X'
  } else {
    player = 'O'
  }

  for (let i in quadrados) {
    quadrados[i] = ''
  }

  preencherQuadrado()
  preencherInfos()

  playing = true
}

function preencherQuadrado() {
  for (let i in quadrados) {
    let item = document.querySelector(`div[data-item=${i}]`)
    item.innerHTML = quadrados[i]
  }
  checarGame()
}

function preencherInfos() {
  document.querySelector('.vez').innerHTML = player
  document.querySelector('.resultado').innerHTML = warning
}

function alternaPlayer() {
  if (player === 'X') {
    player = 'O'
  } else {
    player = 'X'
  }
  preencherInfos()
}

function checarGame() {
  if (checkWinerFor('X')) {
    warning = 'O Player "X" Venceu!'
    playing = false
  } else if (checkWinerFor('O')) {
    warning = 'O Player "O" Venceu!'
    playing = false
  } else if (isFull()) {
    warning = 'Deu Empate'
    playing = false
  }
}

function checkWinerFor(p) {
  let possibilidades = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
  ]

  for (let w in possibilidades) {
    let pArray = possibilidades[w].split(',')
    let hasWon = pArray.every(option => quadrados[option] === p)
    if (hasWon) return true
  }
  return false

  // for (let w in possibilidades) {
  //   let pArray = possibilidades[w].split(',')
  //   pArray.every(op => {
  //     if (quadrados[op] === p) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   })
  // }
}

function isFull() {
  for (let i in quadrados) {
    if (quadrados[i] === '') {
      return false
    }
  }
  return true
}
