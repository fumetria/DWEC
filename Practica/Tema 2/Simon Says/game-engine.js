document.addEventListener("DOMContentLoaded", () => {
    let userSequence = [];
    let cpuSequence = [];
    let userTurn = false;
    let level = 0;
    let score = 0;
    let boardBtns = 4;

    const start = document.getElementById("game-start");
    const gameContainer = document.getElementById("game-container");
    const board = document.getElementById("board");
    const roundIndex = document.getElementById("round-indicator");
    const scoreIndex = document.getElementById("score-indicator");

    function transitionSection(hidden, show) {
        hidden.classList.add("hidden");
        show.classList.remove("hidden");
    }

    function newRound() {
        userTurn = false;
        userSequence = [];
        level++;
        roundIndex.innerText = level;
        let cpuInput = Math.ceil(Math.random() * boardBtns);
        cpuSequence.push(cpuInput);
        displayCpuSequence();
        userTurn = true;

    }
    function displayCpuSequence() {
        for (let i = 0; i < cpuSequence.length; i++) {
            const btnSelected = document.getElementById(cpuSequence[i]);
            setTimeout(() => {
                btnSelected.classList.add("cpu-selected");
                setTimeout(() => {
                    btnSelected.classList.remove("cpu-selected");
                }, 700);
            }, 1000 * i);
        }
    }
    function checkUserInput(userClick) {
        if (userSequence[userSequence.length - 1] != cpuSequence[userSequence.length - 1]) {
            console.log("You lose!");
            userClick.classList.add("wrong-selected");
            setTimeout(() => {
                userClick.classList.remove("wrong-selected");
            }, 700);
            setTimeout(newGame, 2000);
        } else {
            userClick.classList.add("user-selected");
            setTimeout(() => {
                userClick.classList.remove("user-selected");
            }, 700);
            score += 100;
            scoreIndex.innerText = score;
            if (userSequence.length == cpuSequence.length) {
                setTimeout(newRound, 1000);
            }
        }
    }
    function newGame() {
        userSequence = [];
        cpuSequence = [];
        level = 0;
        roundIndex.innerText = level;
        scoreIndex.innerText = score;
        newRound();
    }
    start.addEventListener("click", () => {
        transitionSection(start, gameContainer);
        newGame();
    })

    board.addEventListener("click", (event) => {
        if (!userTurn) {
            return;
        }
        if (event.target.id != "board") {
            let userClick = document.getElementById(event.target.id);
            userSequence.push(event.target.id);
            checkUserInput(userClick);
        }
    })
})


