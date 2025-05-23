const usernameInput = document.getElementById('usernameInput');
const saveScoreButton = document.getElementById('saveScoreButton');
const finalPercentText = document.getElementById('finalPercentText');

const finalPercent = localStorage.getItem('finalPercent'); 
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES=5;

if (finalPercent) {
    finalPercentText.innerText = `Final Percent: ${finalPercent}%`;
}

usernameInput.addEventListener('keyup', () => {
    saveScoreButton.disabled = !(usernameInput.value.length >= 3);
});

saveHighScore = (e) => {
    e.preventDefault();

    alert('Scores are saved locally only.');

    const score = {
        name: usernameInput.value,
        score: finalPercent,
        date:  new Date().toISOString().split('T')[0]
    }
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores)); 
    window.location.assign("highscores.html");  // Redirect to highscores page

}