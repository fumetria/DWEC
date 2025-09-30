document.addEventListener("DOMContentLoaded", () => {
    let userSequence = [];
    let cpuSequence = [];
    let userTurn = false;
    let level = 0;
    let score = 0;
    let boardBtns = 4;
    let date = "";

    const apiUrl = 'https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/scores';

    const start = document.getElementById("game-start");
    const gameContainer = document.getElementById("game-container");
    const board = document.getElementById("board");
    const roundIndex = document.getElementById("round-indicator");
    const scoreIndex = document.getElementById("score-indicator");

    function transitionSection(hidden, show) {
        hidden.classList.add("hidden");
        show.classList.remove("hidden");
    }

    function showButtons(...buttonsIds) {
        buttonsIds.forEach((buttonId) => document.getElementById(buttonId).classList.remove("hidden"));
        boardBtns += buttonsIds.length;
    }

    function newScore(date, userName, level, userScore) {
        let newScore = {
            date: date,
            userName: userName,
            level: level,
            score: userScore,
        };
        return newScore;
    }

    function getDate() {
        const date = Date.now();
        const today = new Date(date);

        let day = today.getDate().toString();
        if (day.length < 2) {
            day = "0" + day;
        }
        let month = (today.getMonth() + 1).toString();
        if (month.length < 2) {
            month = "0" + month;
        }
        let year = today.getFullYear();
        let hours = today.getHours();
        let minutes = today.getMinutes().toString();
        if (minutes.length < 2) {
            minutes = "0" + minutes;
        }

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    async function createNewScore(score) {
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(score)
        }).then(res => {
            if (res.ok) {
                console.log('Puntuación eviada!');
                return;
            }
        }).catch(error => {
            console.log('Algo salió mal...')
        })
    }

    function newRound() {
        userTurn = false;
        userSequence = [];
        level++;
        let btnAnimation = 700;
        let nextBtnAnimation = 1000;
        if (level === 10) {
            btnAnimation = 500;
            nextBtnAnimation = 800;
        }
        if (level === 15) {
            showButtons("5", "6");
        }
        if (level === 20) {
            showButtons("7", "8");
        }
        roundIndex.innerText = level;
        let cpuInput = Math.ceil(Math.random() * boardBtns);
        cpuSequence.push(cpuInput);
        console.log(cpuSequence);
        displayCpuSequence(btnAnimation, nextBtnAnimation);
        userTurn = true;

    }
    function displayCpuSequence(btnA, nextBtn) {
        for (let i = 0; i < cpuSequence.length; i++) {
            const btnSelected = document.getElementById(cpuSequence[i]);
            setTimeout(() => {
                btnSelected.classList.add("cpu-selected");
                setTimeout(() => {
                    btnSelected.classList.remove("cpu-selected");
                }, btnA);
            }, nextBtn * i);
        }
    }
    function checkUserInput(userClick) {
        let userScore = "";
        if (userSequence[userSequence.length - 1] != cpuSequence[userSequence.length - 1]) {
            console.log("You lose!");
            userClick.classList.add("wrong-selected");
            setTimeout(() => {
                userClick.classList.remove("wrong-selected");
            }, 700);
            date = getDate();
            userScore = newScore(date, userName = "TestUSer", level, score);
            createNewScore(userScore);
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
        score = 0;
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


