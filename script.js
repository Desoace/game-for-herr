document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.querySelector(".game-area");
    const levelText = document.getElementById("level-text");
    const finalMessage = document.getElementById("final-message");
    const timerElement = document.getElementById("timer");
    const timeLeftElement = document.getElementById("time-left");
    const scoreElement = document.getElementById("score");

    let level = 1;
    let foundItems = 0;
    let score = 0;
    let timeLeft = 30;

    // Start Timer
    timerElement.classList.remove("hidden");
    const timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Try again!");
            location.reload(); // Restart the game
        }
    }, 1000);

    function createElements(className, count) {
        for (let i = 0; i < count; i++) {
            const element = document.createElement("div");
            element.classList.add(className);
            element.style.left = `${Math.random() * 90}%`;
            element.style.top = `${Math.random() * 60}%`;
            element.addEventListener("click", () => {
                element.classList.add("hidden");
                foundItems++;
                score += 10;
                if (checkLevelCompletion(count)) proceedToNextLevel();
            });
            gameArea.appendChild(element);
        }
    }

    function checkLevelCompletion(totalItems) {
        return foundItems === totalItems;
    }

    function proceedToNextLevel() {
        foundItems = 0;
        gameArea.innerHTML = "";
        level++;

        switch (level) {
            case 2:
                levelText.textContent = "Level 2: Pop the balloons!";
                createElements("balloon", 5);
                break;
            case 3:
                levelText.textContent = "Level 3: Catch the moving stars!";
                createElements("star", 6);
                break;
            case 4:
                levelText.textContent = "Level 4: Collect the falling gifts!";
                createElements("gift", 7);
                break;
            case 5:
                levelText.textContent = "Level 5: Catch the butterflies before they disappear!";
                createElements("butterfly", 8);
                break;
            default:
                clearInterval(timer);
                timerElement.classList.add("hidden");
                scoreElement.textContent = score;
                finalMessage.classList.remove("hidden");
                break;
        }
    }

    // Start with Level 1
    createElements("heart", 3);
});
