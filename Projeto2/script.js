let digitalElement = document.querySelector('.digital');
let segundosElement = document.querySelector(".p_s");
let minutosElement = document.querySelector('.p_m');
let horasElement = document.querySelector('.p_h');



function updateClock() {
    let agora = new Date(); // ' agora' esta recebendo uma funçao do javascript que pega horas minutos e segundos
    let hora = agora.getHours();
    let minutos = agora.getMinutes();
    let segundos = agora.getSeconds();


    digitalElement.innerHTML = `${fixZero(hora)}:${fixZero(minutos)}:${fixZero(segundos)}`;  // usando template string com funçao

     let AnguloSeg = ( ( 360 / 60 ) * segundos) - 90;
     let AnguloMin = ((360 / 60 ) * minutos) - 90 ;
     let AnguloHora = ((360 / 12) * hora) - 90 ;

     segundosElement.style.transform =`rotate(${AnguloSeg}deg)`; // pegando funcao rotate do css e aplicando os valores com os angulos definidos acima
     minutosElement.style.transform = `rotate(${AnguloMin}deg)`;
     horasElement.style.transform = `rotate(${AnguloHora}deg)`;

}
// fixa um zero quando o tempo e menor que 10 para n aparecer so um numero
function fixZero(time) {
//  time e menor que 10, se sim ?  emprima 0 do time se nao : apenas time
    return time < 10 ? `0${time}` : time;

  /*  if(time < 10 ) {
        return '0'+time;
    } else {
        return time;
    }*/
}
setInterval(updateClock,1000); // executando o relogio de 1 em 1 segundo
updateClock(); // estara sempre usando essa funçao, sem esperar um segundo 
