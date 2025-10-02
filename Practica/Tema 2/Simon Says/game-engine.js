document.addEventListener("DOMContentLoaded", () => {
    let userSequence = [];
    let cpuSequence = [];
    let userTurn = false;
    let level = 0;
    let score = 0;
    let boardBtns = 4;
    let date = "";
    let USERNAME = "";

    const apiUrl = 'https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/scores';

    const start = document.getElementById("game-start");
    const starBtn = document.getElementById("start-btn");
    const scoreBoard = document.getElementById("score-board");
    const scoreBtn = document.getElementById("score-btn");
    const scoreData = document.getElementById("score-data");
    const gameContainer = document.getElementById("game-container");
    const board = document.getElementById("board");
    const roundIndex = document.getElementById("round-indicator");
    const scoreIndex = document.getElementById("score-indicator");
    const scoreBack = document.getElementById("score-back-btn");
    const endGameSection = document.getElementById("end-game");
    const scoreDisplay = document.getElementById("score-display");
    const newBtn = document.getElementById("new-btn");
    const homeBtn = document.getElementById('home-btn');
    const correctSound = new Audio('./sounds/correct.mp3');
    const incorrectSound = new Audio('./sounds/incorrect.mp3');
    const userNameSection = document.getElementById('user-name');
    const userNameInput = document.getElementById('name');
    const nameBtn = document.getElementById('btn-name');
    const userIndex = document.getElementById('player-name');

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
        if (level === 4) {
            //Mas velocidad en la secuencia de la CPU
            btnAnimation = 500;
            nextBtnAnimation = 800;
        }
        if (level === 6) {
            //Mostramos 2 botones más
            showButtons("5", "6");
        }
        if (level === 8) {
            showButtons("7", "8");
        }
        roundIndex.innerText = level;
        let cpuInput = Math.ceil(Math.random() * boardBtns);
        cpuSequence.push(cpuInput);
        // console.log(cpuSequence);
        const endSecuence = cpuSequence.length * 1000;
        displayCpuSequence(btnAnimation, nextBtnAnimation);
        setTimeout(() => {
            userTurn = true;
        }, endSecuence);

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
            incorrectSound.play();
            userClick.classList.add("wrong-selected");
            setTimeout(() => {
                userClick.classList.remove("wrong-selected");
            }, 700);
            date = getDate();
            userScore = newScore(date, USERNAME, level, score);
            createNewScore(userScore);
            setTimeout(() => {
                transitionSection(gameContainer, endGameSection);
                scoreDisplay.innerText = score;
            }, 2000);
        } else {
            correctSound.play();
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
    function newGame(username) {
        userSequence = [];
        cpuSequence = [];
        level = 0;
        score = 0;
        roundIndex.innerText = level;
        scoreIndex.innerText = score;
        userIndex.innerText = username;
        newRound();
    }

    async function showScores() {
        const scores = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).catch(err => {
            return { error: "Error al obtener datos" };
        });

        if (scores.error) {
            scoreData.innerHTML = `
            <tr><td colspan=4 class="error-msg">${scores.error}</td><tr>`;
        }
        scores.forEach((score) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${score.date}</td>
            <td>${score.userName}</td>
            <td>${score.level}</td>
            <td>${score.score}</td>
            `;
            scoreData.appendChild(tr);
        })
    }
    starBtn.addEventListener("click", () => {
        transitionSection(start, userNameSection);
    })

    nameBtn.addEventListener("click", () => {
        transitionSection(userNameSection, gameContainer);
        USERNAME = userNameInput.value;
        newGame(USERNAME);
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

    scoreBtn.addEventListener("click", () => {
        transitionSection(start, scoreBoard);
        showScores();
    }
    );

    scoreBack.addEventListener("click", () => {
        transitionSection(scoreBoard, start);
        scoreData.innerHTML = '';
    })

    newBtn.addEventListener("click", () => {
        transitionSection(endGameSection, gameContainer);
        newGame();
    })

    homeBtn.addEventListener("click", () => {
        transitionSection(endGameSection, start);
    })
})


