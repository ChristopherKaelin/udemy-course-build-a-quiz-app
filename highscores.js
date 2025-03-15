const highScoreList = document.getElementById('highScoreList');
const highScores = JSON.parse(localStorage.getItem('highScores'))|| [];

highScoreList.innerHTML = 
    highScores.map(scores => {
        return  '<li class="highScore">'+
                '<span class="hsName">' + scores.name + '</span>'+
                '<span class="hsScore">' + scores.score + '</span>'+
                '<span class=hsDate>' + scores.date + '</span>'+
                '</li>';
    }).join("\n");
