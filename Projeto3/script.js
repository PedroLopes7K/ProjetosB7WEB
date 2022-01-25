// previnir que o formulario seja enviado
document.querySelector('.busca').addEventListener('submit', async event => {
  event.preventDefault()

  // pegando a informaçao doq foi digitado
  let input = document.querySelector('#searchInput').value

  // se esta diferente de vazio
  if (input !== '') {
    showWarning('Carregando...')
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=255ae897d019416462a876685d311856&units=metric&lang=pt_br`

    let results = await fetch(url)
    let json = await results.json()

    if (json.cod === 200) {
      showinfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempICON: json.weather[0].icon,
        windspeed: json.wind.speed,
        windangle: json.wind.deg
      })
    } else {
      clearInfo()
      showWarning('Nao encontramos esta localizaçao')
    }
  } else if (input == '') {
    // eu fiz aqui
    clearInfo()
    showWarning('Digite a localizaçao desejada')
  }
})

let resultado = document.querySelector('.resultado') // eu fiz aqui

function showinfo(json) {
  showWarning('')
  //document.querySelector('.resultado').style.display = 'block'
  resultado.style.display = 'block'

  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
  document.querySelector(
    '.ventoInfo'
  ).innerHTML = `${json.windspeed}  <span>km/h</span> `

  document
    .querySelector('.temp img')
    .setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${json.tempICON}@2x.png`
    )

  document.querySelector('.ventoPonto').style.transform = `rotate(${
    json.windangle - 90
  }deg)`
}

function clearInfo() {
  showWarning('')
  // document.querySelector('.resultado').style.display = 'none'
  resultado.style.display = 'none'
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg
}
