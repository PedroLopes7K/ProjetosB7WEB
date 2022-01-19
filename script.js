document.body.addEventListener('keyup', (event)=>{ //pegando o body html e adicionando um evento que observa a açao keyup
     playSound(event.code.toLowerCase()); //tolowercase transforma as letras em minusculo

}); 

document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value;

    if(song !== '') {
        let songArray = song.split('');
        playComposition(songArray);
    }
});

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElemento = document.querySelector(`div[data-key= "${sound}"]`);
    if(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if(keyElemento) {
        keyElemento.classList.add('active');

        setTimeout(()=>{
            keyElemento.classList.remove('active');
        }, 300);
    }

}

function playComposition(songArray) {
    let wait = 0


    for(let songItem of songArray) {
        setTimeout(() => {
            playSound(`key${songItem}`);

        }, wait);
       wait += 250;
    }
}