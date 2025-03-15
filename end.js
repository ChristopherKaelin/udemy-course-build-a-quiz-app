const usernameInput = document.getElementById('usernameInput');
const saveScoreButton = document.getElementById('saveScoreButton');
const finalScoreText = document.getElementById('finalScoreText');

const finalScore = localStorage.getItem('finalScore'); 
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES=5;

if (finalScore) {
    finalScoreText.innerText = `Final Score: ${finalScore}`;
}

usernameInput.addEventListener('keyup', () => {
    saveScoreButton.disabled = !(usernameInput.value.length >= 3);
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        name: usernameInput.value,
        score: finalScore,
        date:  new Date().toISOString().split('T')[0]
    }
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores)); 
    window.location.assign("/");  // Redirect to highscores page

}