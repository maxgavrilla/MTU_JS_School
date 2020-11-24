let resultGame = {};
let count = 0;
let minutes = 1;
let seconds = 59;
let timeString = "0";
let timerId;
let elemSquare = document.querySelectorAll("div > span");
let elemContainer = document.getElementById("container-square");
let buttonStartStopGame = document.getElementById("buttonStartStopGame");
let buttonResetGame = document.getElementById("buttonResetGame");
let pointsView = document.getElementById("points");
let timeMinutesView = document.getElementById("timeMinutes");
let timeSecondsView = document.getElementById("timeSeconds");
let modalLabel = document.getElementById("exampleModalLabel");
let modalButton = document.getElementById("modalButtonSave");
let modalInput = document.getElementById("modalInputName");
let labelInput = document.getElementById("labelInput");
let resultTable = document.getElementById("resultTableData");
elemContainer.addEventListener("click", function(e){onClickRedToWhite(e)}, false);
buttonStartStopGame.addEventListener("click", function(e){startStopGameButton(e)}, false);
buttonResetGame.addEventListener("click", resetGame, false);
modalButton.addEventListener("click", saveName, false);

function startStopGameButton(e) {
    if (e.target.innerHTML === 'Start Game') {
        e.target.innerHTML = 'Pause Game';
        e.target.classList.remove("btn-primary");
        e.target.classList.add("btn-danger");
        startGame();    
    } else {
        e.target.classList.remove("btn-danger");
        e.target.classList.add("btn-primary"); 
        e.target.innerHTML = 'Start Game';
        pauseGame();
    }
}

function startGame() {
    if(minutes > 0){
        timeMinutesView.innerHTML = timeString + minutes;
        randomWhiteToRed(10);
        buttonResetGame.classList.remove("disabled");
    }
    timerId = setInterval(timeLeft, 1000);
}

function pauseGame() {
    clearInterval(timerId);
}

function resetGame() {
    clearInterval(timerId);
    for(let j = 0;  j < elemSquare.length; j++) {
        elemSquare[j].classList.remove("square_red");
    }
    buttonStartStopGame.classList.remove("btn-danger");
    buttonStartStopGame.classList.add("btn-primary");
    buttonResetGame.classList.add("disabled");
    buttonStartStopGame.innerHTML = 'Start Game';
    count = 0;
    minutes = 1;
    seconds = 59;
    pointsView.innerHTML = "0";
    timeMinutesView.innerHTML = "00";
    timeSecondsView.innerHTML = "00";
    modalInput.value = "";
    addDataToTableScore();
}

function timeLeft(){   
    minutes --; 
    if(minutes >= 0){
        timeMinutesView.innerHTML = timeString + minutes;
        timeSecondsView.innerHTML = seconds;
    } else {
        seconds --;
        if(seconds >= 0) {
            if(seconds < 10) {
                timeSecondsView.innerHTML = timeString + seconds;
            } else {
                timeSecondsView.innerHTML = seconds;
            }
        } else {
            clearInterval(timerId);
            modalLabel.innerHTML = "Your Score: " + count;
            $('#myModal').modal();
        }
    }
}

function saveName() {
    if(modalInput.value === "" || modalInput.value === " " || modalInput.value === null) {
        modalInput.classList.add("border-danger");
        labelInput.classList.add("text-danger");
    } else {
        resultGame[modalInput.value] = count;
        $('#myModal').modal('hide');
        resetGame();
    }
}

function randomWhiteToRed(quantityEqual) {
    if(quantityEqual != 0){
        let countTemp = 0;
        while (countTemp <= quantityEqual) {
            let targetElem = elemSquare[Math.floor(Math.random() * elemSquare.length)];
            if (targetElem.className != 'square_red') {
                targetElem.classList.add("square_red");
                countTemp ++;
            }
        }
    }     
}

function onClickRedToWhite(e) {
    if (e.target.tagName === "SPAN" && e.target.className == "square square_red" && buttonStartStopGame.innerHTML === 'Pause Game') {
        e.target.classList.remove("square_red");
        count++;
        pointsView.innerHTML = count;
        let randomAddEqual = Math.floor(Math.random() * 3);
        randomWhiteToRed(randomAddEqual);
    }       
}

function addDataToTableScore () {
    let stringLi = "";
    for (let x in resultGame) {
        stringLi += '<li class="list-group-item d-flex justify-content-between lh-condensed">'+
                            '<div>' +
                                '<h6 class="my-0">'+ x +'</h6>' +
                            '</div>' +
                            '<span class="text-muted">' + resultGame [x] + '</span>' +
                        '</li>';
        resultTable.innerHTML =  stringLi;
    }            
}