const highScoreList = document.getElementById('highScoreList');
const highScores = JSON.parse(localStorage.getItem('highScores'))|| [];

if (highScores.length == 0){
    highScoreList.innerHTML = '<h4>There are no high scores currently saved locally.</h4>';
} else {
    highScoreList.innerHTML = 
    highScores.map(highScore => {
        return  '<div class="highScore list">' +
                    '<div class="hsName">'  + highScore.name  + '</div>' +
                    '<div class="hsScore">' + highScore.score + '%</div>' +
                    '<div class="hsDate">'  + highScore.date  + '</div> ' +
                '</div>';
    }).join("\n");
}
