let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const drawSound = new Audio('moyemoye.mp3');
const winSound = new Audio('winsound.mp3');
const tingSound = new Audio('ting.mp3');
let turnO = true; // PlayerX , PlayerO
let gameEnded = false; // Variable to track if the game has ended

// array of array
const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    gameEnded = false; // Reset the gameEnded 
    enableBoxes();
    drawSound.pause(); // Pause the song when press btn for newgame
    msgcontainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameEnded) { // Check if the game has ended
            if (turnO) {
                // playerO
                box.innerText = "O";
                turnO = false;
            } else {
                // playerX
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            tingSound.play();

            checkWinner(); // fun
            checkDraw(); // new check for draw
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    gameEnded = true; // Set gameEnded to true
    setTimeout(() => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgcontainer.classList.remove("hide");
        disableBoxes();
        document.querySelector(".Game").classList.add("hide");
        document.querySelector("#reset-btn").classList.add("hide"); // Hide the reset button
        document.querySelector(".heading").classList.add("hide"); // Hide the reset button


    }, 1000); // 1000 milliseconds (1 second) delay
};

const showDraw = () => {
    gameEnded = true; // Set gameEnded to true
    setTimeout(() => {
        msg.innerText = "It's a draw!";
        msgcontainer.classList.remove("hide");
        disableBoxes();
        document.querySelector(".Game").classList.add("hide"); // Hide the game table
        document.querySelector("#reset-btn").classList.add("hide"); // Hide the reset button
        document.querySelector(".heading").classList.add("hide"); // Hide the reset button

    }, 1000); // 1000 milliseconds (1 second) delay
};

// Add this function to reset the game elements
const resetGameElements = () => {
    document.querySelector(".Game").classList.remove("hide"); // Show the game table
    document.querySelector("#reset-btn").classList.remove("hide"); // Show the reset button
    document.querySelector(".heading").classList.remove("hide"); // Hide the reset button

};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                winSound.play();
                showWinner(pos1Val); // fun
            }
        }
    }
};

const checkDraw = () => {
    // Check if all boxes are filled
    if (Array.from(boxes).every((box) => box.innerText !== "")) {
        // Check if there is no winner
        let winnerFound = false;
        for (let pattern of winpatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    winnerFound = true;
                    break;
                }
            }
        }

        // If no winner is found, it's a draw
        if (winnerFound == false) {
            drawSound.play();
            showDraw();
        }
    }
};

newGamebtn.addEventListener("click", () => {
    resetGame();
    resetGameElements(); // Call the function to show the game elements
});
resetbtn.addEventListener("click", () => {
    resetGame();
    resetGameElements(); // Call the function to show the game elements
});
