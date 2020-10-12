var colors = {
    RED: 0,
    BLUE: 1,
    NEUTRAL: 2,
    ASSASSIN: 3,
    DEFAULT: 4,
};

var colorNames = ["Red", "Blue", "Neutral", "Assassin", "Default"];
var cssColors = ["Red", "Blue", "Wheat", "DimGray", "Salmon"];
var numOfWords = 25;

var displayAnswers = false;
var wordList = [];
var answerList = [];
var clickedWords = [];
var wordsMap = {};
var currentTurn;
var numOfBlueLeft;
var numOfRedLeft;
var toggleAnswerClickCount = 0;
var randLimit = 132;
var gameState = {};
var listOfCells = {};

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBgXlrAvl1RrykkvfJ9Q31NU7Ce5iiB5aM",
    authDomain: "sportsnames-91c48.firebaseapp.com",
    databaseURL: "https://sportsnames-91c48.firebaseio.com",
    projectId: "sportsnames-91c48",
    storageBucket: "sportsnames-91c48.appspot.com",
    messagingSenderId: "823331979828",
    appId: "1:823331979828:web:96cffb2fb9bd44b0d68061"
  };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var myDatabase = firebase.database();
    // myDatabase.ref("wordList").on('value', ss=>{
    //     console.log(ss.val());
    // })
    
// <!-- Load the updateText on first load for now -->
window.onload = function() {
    // generateGame();

    wordList = [];

    myDatabase.ref("answerList").once('value').then(function(ss){
        answerList[0] = ss.val()[0];
        answerList[1] = ss.val()[1];
        answerList[2] = ss.val()[2];
        answerList[3] = ss.val()[3];
        answerList[4] = ss.val()[4];
        answerList[5] = ss.val()[5];
        answerList[6] = ss.val()[6];
        answerList[7] = ss.val()[7];
        answerList[8] = ss.val()[8];
        answerList[9] = ss.val()[9];
        answerList[10] = ss.val()[10];
        answerList[11] = ss.val()[11];
        answerList[12] = ss.val()[12];
        answerList[13] = ss.val()[13];
        answerList[14] = ss.val()[14];
        answerList[15] = ss.val()[15];
        answerList[16] = ss.val()[16];
        answerList[17] = ss.val()[17];
        answerList[18] = ss.val()[18];
        answerList[19] = ss.val()[19];
        answerList[20] = ss.val()[20];
        answerList[21] = ss.val()[21];
        answerList[22] = ss.val()[22];
        answerList[23] = ss.val()[23];
        answerList[24] = ss.val()[24];
        myDatabase.ref("wordList").once('value').then(function(ss){
            wordList[0] = ss.val()[0];
            wordList[1] = ss.val()[1];
            wordList[2] = ss.val()[2];
            wordList[3] = ss.val()[3];
            wordList[4] = ss.val()[4];
            wordList[5] = ss.val()[5];
            wordList[6] = ss.val()[6];
            wordList[7] = ss.val()[7];
            wordList[8] = ss.val()[8];
            wordList[9] = ss.val()[9];
            wordList[10] = ss.val()[10];
            wordList[11] = ss.val()[11];
            wordList[12] = ss.val()[12];
            wordList[13] = ss.val()[13];
            wordList[14] = ss.val()[14];
            wordList[15] = ss.val()[15];
            wordList[16] = ss.val()[16];
            wordList[17] = ss.val()[17];
            wordList[18] = ss.val()[18];
            wordList[19] = ss.val()[19];
            wordList[20] = ss.val()[20];
            wordList[21] = ss.val()[21];
            wordList[22] = ss.val()[22];
            wordList[23] = ss.val()[23];
            wordList[24] = ss.val()[24];
            loadBoard(wordList,answerList);
            myDatabase.ref("test").once('value').then(function(ss){
                for(var i = 0; i < 25; i++){
                    var name = document.getElementById("elem" + i).innerHTML
                    if(ss.val()["elem" + i] == "y"){
                        document.getElementById("elem" + i).style.backgroundColor = cssColors[wordsMap[name]]
                    }
                }
            })

        })

    })


    for(var i = 0; i < numOfWords; ++i) {
        wordsMap[wordList[i]] = answerList[i];
    }
    


    myDatabase.ref("test").on('value', function(ss){


        

        for(var i = 0; i < 25; i++){
            var name = document.getElementById("elem" + i).innerHTML
            if(ss.val()["elem" + i] == "y"){
                document.getElementById("elem" + i).style.backgroundColor = cssColors[wordsMap[name]]
            }
        }
    })

    var turn;
    var bleft;
    var rleft;

    myDatabase.ref("currentTurn").on('value', ss=>{
        console.log(ss.val());

        turn = ss.val()['currentTurn'];
        currentTurn = turn;
        document.getElementById("gameStatus").innerHTML = `Start Color: ` + cssColors[turn];

    })

        // myDatabase.ref("wordList").on('value', ss=>{
    //     console.log(ss.val());
    // })

    myDatabase.ref("numOfBlueLeft").on('value', ss=>{
        bleft= ss.val()['left'];
        document.getElementById("colorsLeft").innerHTML = ` Number of Blue Left: ` + bleft + ` Number of Red Left ` + rleft;
    })

    myDatabase.ref("numOfRedLeft").on('value', ss=>{
        rleft= ss.val()['left'];
        document.getElementById("colorsLeft").innerHTML = ` Number of Blue Left: ` + bleft + ` Number of Red Left: ` + rleft;
    })

};

function restart() {
    var updates = {};

    var updateWordList = {};

    var updateAnswerList = {};


    var newWords = chooseNewWords("nfl")

    var newAnswers = getAnswerList()[0];

    for(var i = 0; i<25; i++){
        updates["elem" + i] = "n"
    }

    for(var i = 0; i <25; i++){
        updateWordList[i] = newWords[i]
    }

    for(var i = 0; i <25; i++){
        updateAnswerList[i] = newAnswers[i]
    }


    firebase.database().ref("test").update(updates)

    firebase.database().ref("wordList").update(updateWordList)

    firebase.database().ref("answerList").update(updateAnswerList)

    // generate new word list

    // generate new answer list
    
    // set all of test to "n"

    //loadGame()
    loadBoard(newWords,updateAnswerList);
}

function loadNbaGame(){
    var updates = {};

    var updateWordList = {};

    var updateAnswerList = {};


    var newWords = chooseNewWords("nba")

    var newAnswers = getAnswerList()[0];

    for(var i = 0; i<25; i++){
        updates["elem" + i] = "n"
    }

    for(var i = 0; i <25; i++){
        updateWordList[i] = newWords[i]
    }

    for(var i = 0; i <25; i++){
        updateAnswerList[i] = newAnswers[i]
    }


    firebase.database().ref("test").update(updates)

    firebase.database().ref("wordList").update(updateWordList)

    firebase.database().ref("answerList").update(updateAnswerList)

    // generate new word list

    // generate new answer list
    
    // set all of test to "n"

    //loadGame()
    loadBoard(newWords,updateAnswerList);
}

function loadNflGame(){
    var Table = document.getElementById("Table");
    Table.innerHTML = "";
    generateNewGame("nfl");

}

function generateNewGame(gamemode){
    wordList = [];
    answerList = [];
    wordsMap = {};
    wordList = chooseNewWords(gamemode);
    
    var answers = getAnswerList();
    answerList = answers[0];
    currentTurn = answers[1];
    

    document.getElementById("gameStatus").innerHTML = `<b>Current Turn:</b> <span style='color:` + cssColors[currentTurn] + `'>` + colorNames[currentTurn] + `<span>` + `<p style = 'color: Blue'> Number of Blue Left: ` + gameState['numOfBlueLeft'] + `<p>` + `<p style = 'color: Red'> Number of Red Left: ` + numOfRedLeft + `<p>` ;
    makeBoard();
}

function chooseNewWords(gamemode){
    var wordArray = [];
    var usedIndexes = [];
    
    if(gamemode == "nba"){
        var masterArrayClone = nbaPlayersList.slice(0);
    }

    if(gamemode == "nfl"){
        var masterArrayClone = nflPlayersList.slice(0);
    }
    
    for(i = 0; i < numOfWords; i++){
        temp_index = getRandomInt(randLimit)
        if(! usedIndexes.includes(temp_index)){
            wordArray[i] = masterArrayClone[temp_index];
            usedIndexes.push(temp_index)
        }
        else{
            var valid = false;
            while(!valid){
                temp_index = getRandomInt(randLimit)
                if(! usedIndexes.includes(temp_index)){
                    wordArray[i] = masterArrayClone[temp_index];
                    usedIndexes.push(temp_index)
                    valid = true;
                }
            }
        }

    }
    return wordArray;
}

function generateGame() {
    wordList = [];
    answerList = [];
    wordsMap = {};
    wordList = chooseWords();
    
    var answers = getAnswerList();
    answerList = answers[0];
    currentTurn = answers[1];
        myDatabase.ref("wordList").set({
            '0': wordList[0],
            '1': wordList[1],
            '2': wordList[2],
            '3': wordList[3],
            '4': wordList[4],
            '5': wordList[5],
            '6': wordList[6],
            '7': wordList[7],
            '8': wordList[8],
            '9': wordList[9],
            '10': wordList[10],
            '11': wordList[11],
            '12': wordList[12],
            '13': wordList[13],
            '14': wordList[14],
            '15': wordList[15],
            '16': wordList[16],
            '17': wordList[17],
            '18': wordList[18],
            '19': wordList[19],
            '20': wordList[20],
            '21': wordList[21],
            '22': wordList[22],
            '23': wordList[23],
            '24': wordList[24]
        })

        myDatabase.ref("answerList").set({
            '0': answerList[0],
            '1': answerList[1],
            '2': answerList[2],
            '3': answerList[3],
            '4': answerList[4],
            '5': answerList[5],
            '6': answerList[6],
            '7': answerList[7],
            '8': answerList[8],
            '9': answerList[9],
            '10': answerList[10],
            '11': answerList[11],
            '12': answerList[12],
            '13': answerList[13],
            '14': answerList[14],
            '15': answerList[15],
            '16': answerList[16],
            '17': answerList[17],
            '18': answerList[18],
            '19': answerList[19],
            '20': answerList[20],
            '21': answerList[21],
            '22': answerList[22],
            '23': answerList[23],
            '24': answerList[24]
        })

        myDatabase.ref("answerList").set({
            '0': answerList[0],
            '1': answerList[1],
            '2': answerList[2],
            '3': answerList[3],
            '4': answerList[4],
            '5': answerList[5],
            '6': answerList[6],
            '7': answerList[7],
            '8': answerList[8],
            '9': answerList[9],
            '10': answerList[10],
            '11': answerList[11],
            '12': answerList[12],
            '13': answerList[13],
            '14': answerList[14],
            '15': answerList[15],
            '16': answerList[16],
            '17': answerList[17],
            '18': answerList[18],
            '19': answerList[19],
            '20': answerList[20],
            '21': answerList[21],
            '22': answerList[22],
            '23': answerList[23],
            '24': answerList[24]
        })
    
    

    gameState["wordList"] = wordList;
    gameState["answerList"] = answerList;
    gameState["wordsMap"] = wordsMap;
    gameState["clickedWords"] = clickedWords;
    gameState["currentTurn"] = currentTurn;
 
    

    document.getElementById("gameStatus").innerHTML = `<b>Current Turn:</b> <span style='color:` + cssColors[currentTurn] + `'>` + colorNames[currentTurn] + `<span>` + `<p style = 'color: Blue'> Number of Blue Left: ` + gameState['numOfBlueLeft'] + `<p>` + `<p style = 'color: Red'> Number of Red Left: ` + numOfRedLeft + `<p>` ;
    makeBoard();
}

//fisher-yates shuffle algo 
function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function chooseWords() {
    var wordArray = [];
    var usedIndexes = [];
    
    var masterArrayClone = nflPlayersList.slice(0);

    
    for(i = 0; i < numOfWords; i++){
        temp_index = getRandomInt(132)
        if(! usedIndexes.includes(temp_index)){
            wordArray[i] = masterArrayClone[temp_index];
            usedIndexes.push(temp_index)
        }
        else{
            var valid = false;
            while(!valid){
                temp_index = getRandomInt(132)
                if(! usedIndexes.includes(temp_index)){
                    wordArray[i] = masterArrayClone[temp_index];
                    usedIndexes.push(temp_index)
                    valid = true;
                }
            }
        }
    }
    return wordArray;
}

function getAnswerList() {
    var startColor;
    if(Math.random() >= .5) {
        startColor = colors.RED
    } else {
        startColor = colors.BLUE
    }
    answerList[0] = startColor;
    answerList[1] = colors.ASSASSIN 
    for(var i = 2; i <9; i++){
        answerList[i] = colors.NEUTRAL
    }
    for(var i = 9; i <17; i++){
        answerList[i] = colors.RED
    }
    for(var i = 17; i <25; i++){
        answerList[i] = colors.BLUE
    }
    gameState['numOfRedLeft'] = 8
    gameState['numOfBlueLeft'] = 8


    if(startColor == colors.RED){
        numOfRedLeft +=1;
        gameState['numOfRedLeft'] +=1;
    }
    else{
        numOfBlueLeft +=1;
        gameState['numOfBlueLeft'] +=1
    }

    console.log();

    shuffleArray(answerList);


    myDatabase.ref("numOfRedLeft").set({
        'left': gameState['numOfRedLeft']
    })

    myDatabase.ref("numOfBlueLeft").set({
        'left': gameState['numOfBlueLeft']
    })

    myDatabase.ref("currentTurn").set({
        'currentTurn': startColor
    })

    // document.getElementById("gameStatus").innerHTML = `<b>Current Turn:</b> <span style='color:` + cssColors[currentTurn] + `'>` + colorNames[currentTurn] + `<span>` + `<p style = 'color: Blue'> Number of Blue Left: ` + gameState['numOfBlueLeft'] + `<p>` + `<p style = 'color: Red'> Number of Red Left: ` + numOfRedLeft + `<p>` ;

    return [answerList, startColor];
}

function makeBoard() {
    var table = document.getElementById('Table')
    var row
    
    for(var i = 0; i < numOfWords; ++i) {
        if((i % 5) == 0) {
            row = table.insertRow();
        }
        var data = row.insertCell();
        var word = gameState['wordList'][i];
        data.innerHTML = word;
        data.style.backgroundColor = cssColors[colors.DEFAULT];

        gameState['wordsMap'][word] = gameState['answerList'][i];
        data.onclick = function () {
            renderClick(this);
        };
    }
}

function loadBoard(words, answers) {
    var table = document.getElementById('Table')
    var row
    
    for(var i = 0; i < numOfWords; ++i) {
        tempId = "elem" + i;
        var word = words[i];
        document.getElementById(tempId).innerHTML = word

        document.getElementById(tempId).style.backgroundColor = cssColors[colors.DEFAULT];

        words[word] = answers[i];
        wordsMap[word] = answers[i];
    }
}

function renderClick2(event){
    var k = event.id;
    var updates = {};
    updates[k] = "y"
    var currRed;
    var currBlue;
    var newRed;
    var newBlue;
    var bupdates = {};
    var rupdates = {};

    var myWords = []
    var myMap = {}

    for(var i = 0; i < 25; i++){
        myWords[i] = wordList[i];
    }

    for(var i = 0; i <25; i++){
        myMap[myWords[i]] = answerList[i];
    }

    var secondToLastChar = k.charAt(k.length-2);

    var colorClicked;

    if(isNaN(secondToLastChar)){
        colorClicked = myMap[myWords[k.charAt(k.length-1)]];

    }else{
        colorClicked = myMap[myWords[secondToLastChar+k.charAt(k.length-1)]]
    }



    if(colorClicked == 1){
        myDatabase.ref("numOfBlueLeft").once('value').then(function(ss){
            currBlue = ss.val()['left'];
            newBlue = currBlue -1;
            bupdates['left'] = newBlue;
            myDatabase.ref("numOfBlueLeft").update(bupdates);
        })
    }
    else if(colorClicked == 0){
        myDatabase.ref("numOfRedLeft").once('value').then(function(ss){
            currRed = ss.val()['left'];
            newRed = currRed -1;
            rupdates['left'] = newRed;
            myDatabase.ref("numOfRedLeft").update(rupdates)
        })
    }else if(colorClicked == 3){
        document.getElementById("colorsLeft").innerHTML = ` Game Over You Clicked the Bomb`
        alert("Game Over You Clicked the Bomb - Click New Game")
    }





    // myDatabase.ref("numOfBlueLeft").update(bupdates);

    // myDatabase.ref("numOfRedLeft").update(rupdates)


    firebase.database().ref("test").update(updates)

    // var key = myDatabase.ref("test").push().getKey();
    // myDatabase.ref("test").child(key).child("name").setValue(player)
}

function renderClick(cell, word, words){
    console.log(word);
    // myDatabase.ref("test").set(
    //     word
    // ).then(console.log(myDatabase.ref("test").once('value').then(function(ss){
    //     console.log(ss.val())
    // })))

    if(cell.style.backgroundColor == "red"){
        gameState['numOfRedLeft'] -= 1;
    }
    else if(cell.style.backgroundColor == "blue"){
        gameState['numOfBlueLeft'] -=1;
    }
    if(currentTurn == 0){
        if(cell.style.backgroundColor == "blue" || cell.style.backgroundColor == "wheat"){
            currentTurn = 1;
            document.getElementById("gameStatus").innerHTML = `<b>Current Turn:</b> <span style='color:` + cssColors[currentTurn] + `'>` + colorNames[currentTurn] + `<span>` + `<p style = 'color: Blue'> Number of Blue Left: ` + gameState['numOfBlueLeft'] + `<p>` + `<p style = 'color: Red'> Number of Red Left: ` + gameState['numOfRedLeft'] + `<p>` ;
        }
        else if(cell.style.backgroundColor == "dimgray"){
            document.getElementById("gameStatus").innerHTML = `<b>Current Turn:</b> <span style='color:` + cssColors[currentTurn] + `'>` + colorNames[currentTurn] + `<span>` + `<p> YOU LOST <p>` ;
        }else{
            document.getElementById("gameStatus").innerHTML = `<b>Current Turn:</b> <span style='color:` + cssColors[currentTurn] + `'>` + colorNames[currentTurn] + `<span>` + `<p style = 'color: Blue'> Number of Blue Left: ` + gameState['numOfBlueLeft'] + `<p>` + `<p style = 'color: Red'> Number of Red Left: ` + gameState['numOfRedLeft'] + `<p>` ;
        }
    }
    else if(currentTurn == 1){
        if(cell.style.backgroundColor == "red" || cell.style.backgroundColor == "wheat"){
            currentTurn = 0;
            document.getElementById("gameStatus").innerHTML = `<b>Current Turn:</b> <span style='color:` + cssColors[currentTurn] + `'>` + colorNames[currentTurn] + `<span>` + `<p style = 'color: Blue'> Number of Blue Left: ` + gameState['numOfBlueLeft'] + `<p>` + `<p style = 'color: Red'> Number of Red Left: ` + gameState['numOfRedLeft'] + `<p>` ;
        }
        else if(cell.style.backgroundColor == "dimgray"){
            document.getElementById("gameStatus").innerHTML = `<b>Current Turn:</b> <span style='color:` + cssColors[currentTurn] + `'>` + colorNames[currentTurn] + `<span>` + `<p> YOU LOST <p>` ;
        }else{
            document.getElementById("gameStatus").innerHTML = `<b>Current Turn:</b> <span style='color:` + cssColors[currentTurn] + `'>` + colorNames[currentTurn] + `<span>` + `<p style = 'color: Blue'> Number of Blue Left: ` + gameState['numOfBlueLeft'] + `<p>` + `<p style = 'color: Red'> Number of Red Left: ` + gameState['numOfRedLeft'] + `<p>` ;
        }
    }
}

function toggleAnswers() {

    if(toggleAnswerClickCount > 1){
        var button = document.getElementById('AnswersButton');
        button.style.display = "none";
    }

    displayAnswers = !displayAnswers;

    if(displayAnswers == true){
        myDatabase.ref("test").once('value').then(function(ss){
            for(var i = 0; i < 25; i++){
                var name = document.getElementById("elem" + i).innerHTML
                document.getElementById("elem" + i).style.backgroundColor = cssColors[wordsMap[name]]
            }
        })
    }else{
        myDatabase.ref("test").once('value').then(function(ss){
            for(var i = 0; i < 25; i++){
                var name = document.getElementById("elem" + i).innerHTML
                if(ss.val()["elem" + i] == "y"){
                    document.getElementById("elem" + i).style.backgroundColor = cssColors[wordsMap[name]]
                }
                else {
                    document.getElementById("elem" + i).style.backgroundColor = cssColors[colors.DEFAULT]
                }
            }
        })

    }
}