const hands = [...document.querySelectorAll(".select img")];
const button = document.querySelector(".start");
const loader = document.querySelector(".loader");

const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}
const game = {
    playerHand: null,
    aiHand: null,
}

function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = "");
    this.style.boxShadow = "inset 2px 2px 5px rgba(0, 0, 0)"
}

function aiChoice() {
    const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
    return aiHand
}

function checkResult(player, ai) {
    if (player === ai) {
        return "draw"
    } else if ((player === "paper" && ai === "rock") || (player === "rock" && ai === "scissors") ||
        (player === "scissors" && ai === "paper")) {
        return "win"
    } else {
        return "loss"
    }
}

function publishResult(player, ai, result) {
    document.querySelector("[data-summary = \"your-choice\"]").innerHTML = `<img class="choiceImage" src=assets/${player}.png>`
    document.querySelector("[data-summary = \"ai-choice\"]").innerHTML = `<img class="choiceImage" src=assets/${ai}.png>`
    document.querySelector("[data-summary = \"who-win\"]").textContent = result;

    document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;
    if (result === "win") {
        document.querySelector("p.wins span").textContent = ++gameSummary.wins;
        document.querySelector("[data-summary = \"who-win\"]").textContent = "YOU WIN!"
        document.querySelector("[data-summary = \"who-win\"]").style.color = "darkgreen"
    } else if (result === "draw") {
        document.querySelector("p.draws span").textContent = ++gameSummary.draws;
        document.querySelector("[data-summary = \"who-win\"]").textContent = "DRAW"
        document.querySelector("[data-summary = \"who-win\"]").style.color = "black"
    } else {
        document.querySelector("p.losses span").textContent = ++gameSummary.losses;
        document.querySelector("[data-summary = \"who-win\"]").textContent = "YOU LOSE"
        document.querySelector("[data-summary = \"who-win\"]").style.color = "darkred"
    }
}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = "";
    button.classList.remove("hidden");
    loader.classList.add("hidden")
}


function startGame() {
    if (!game.playerHand) return (
        alert("Please select hand!"),
        button.classList.remove("hidden"),
        loader.classList.add("hidden")
)
    game.aiHand = aiChoice()
    const gameResult = checkResult(game.playerHand, game.aiHand);
    console.log(gameResult);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}

const timer = () => {
    setTimeout(() => {
        startGame();
    }, 1000)
}


hands.forEach(hand => hand.addEventListener("click", handSelection));
button.addEventListener("click", () => {
    timer();
    button.classList.add("hidden")
    loader.classList.remove("hidden")
});