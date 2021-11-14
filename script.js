// initial date
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player = '';
let warning = '';
let playing = false;
let numberX = 0;
let numberO = 0;

reset();

//events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach((item)=>{
    item.addEventListener('click', itemClick);
});

//functions
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePlayer();
    }

    let value = event.target.innerHTML
    if(value == 'x'){
        event.target.style.color = '#e9d8a6';
    }else if(value == 'o'){
        event.target.style.color = '#f1faee';
    }
}


function reset(){
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';
    for(let i in square){
        square[i] = '';
    }
    playing = true;
    document.querySelector('.area').style.display = 'grid'
    document.querySelector('.aviso--gigante').innerHTML = '';
    
    renderSquare();
    renderInfo();

}

function renderSquare(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
};

function renderInfo(){
    if(player === 'x'){
       document.querySelector('.infocorpo--x').style.transform = 'scale(1.2)'
       document.querySelector('.infocorpo--o').style.transform = 'scale(1)'
       document.querySelector('.infocorpo--x').style.backgroundColor = '#a8dadc'
       document.querySelector('.infocorpo--o').style.backgroundColor = '#fff'
    }else if(player === 'o') {
        document.querySelector('.infocorpo--o').style.transform = 'scale(1.2)'
        document.querySelector('.infocorpo--x').style.transform = 'scale(1)'
        document.querySelector('.infocorpo--o').style.backgroundColor = '#a8dadc'
        document.querySelector('.infocorpo--x').style.backgroundColor = '#fff'
        
    }
}

function togglePlayer(){
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame(){
    if(checkWinnerFor('x')){
        document.querySelector('.area').style.display = 'none'
        document.querySelector('.aviso--gigante').innerHTML = 'X <br/ >Vencedor!!'
        numberX++;
        document.querySelector('.quantidade--x').innerHTML = numberX;
        playing = false;
    }else if(checkWinnerFor('o')){
        document.querySelector('.area').style.display = 'none'
        document.querySelector('.aviso--gigante').innerHTML = 'O <br/ >Vencedor!!'
        numberO++;
        document.querySelector('.quantidade--o').innerHTML = numberO;
        playing = false;
    }else if(isFull()){
        document.querySelector('.area').style.display = 'none'
        document.querySelector('.aviso--gigante').innerHTML = 'Empate!!'
        playing = false;
    }
}

function checkWinnerFor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos){
        let pArray = pos[w].split(',');
        let hasWon = pArray.every((option)=>{
            if(square[option] === player){
                return true;
            }else {
                return false;
            }
        });

        if(hasWon){
            return true;
        }
    }

    return false;
}

function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }
    return true;
}
