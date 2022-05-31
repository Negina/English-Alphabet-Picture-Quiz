'use strict'

var gQuests = [
    {
        id: 0,
        audio: 'audio/unit_1/ant.mp3',
        opts: ['img/unit_1/apple.png', 'img/unit_1/ant.png', 'img/unit_1/cat.png', 'img/unit_1/ball.png'],
        answerIdx: 1,
  //      img: 'img/unit_1/ant.png'
    },
    {
        id: 1,
        audio: 'audio/unit_1/apple.mp3',
        opts: ['img/unit_1/apple.png', 'img/unit_1/ant.png', 'img/unit_1/cat.png', 'img/unit_1/ball.png'],
        answerIdx: 0,
    }

];

var isGameOn;
var gCurrQuest;
var gInterval;
var gTime;
var gScore = 0;
var gCorrectAnswers = 0;
var gameQuests;

function getHomeMenu() {
    isGameOn = false;
    document.querySelector(".container").style.display = "none";
    document.querySelector(".menu").style.display = "block";
    document.querySelector(".score").innerHTML = "SCORE: " + gScore;
}

function init() {
    gameQuests = gQuests.slice(0);
    gScore = 0;
    gCorrectAnswers = 0;
    isGameOn = true;
    gTime = 0;
    gInterval = setInterval(function () {
        gTime++;
    }, 1000);
    getRndQuest();
    renderQuest();
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".container").style.display = "block";
}

function renderQuest() {
    document.querySelector("h2").innerHTML = gCurrQuest.name;
    document.querySelector('.audio').innerHTML = '<audio controls autoplay src=' + gCurrQuest.audio + '>';
    for (var i = 0; i < gCurrQuest.opts.length; i++) {
        document.querySelector('.q' + i).innerHTML = '<img width="80%" height="80%" src=' + gCurrQuest.opts[i] + '>';
    }
}

function getRndQuest() {
    var rndQuestIdx = getRandomInt(0, gameQuests.length);
    gCurrQuest = gameQuests[rndQuestIdx];
    gameQuests.splice(rndQuestIdx, 1);
    renderQuest();
    return gameQuests;
}

function checkAnswer(id) {
    var quests = document.querySelectorAll('.quest');
    if (!isGameOn) { return };
    isGameOn = false;
    if (gCurrQuest.answerIdx !== id) {
        for (var i = 0; i < quests.length; i++) {
            quests[i].style.borderColor = 'red';
            quests[i].style.color = 'red';
            quests[gCurrQuest.answerIdx].style.borderColor = 'green';
            quests[gCurrQuest.answerIdx].style.color = 'green';
        }
        gScore -= 4;
    } else {
        quests[gCurrQuest.answerIdx].style.borderColor = 'green';
        quests[gCurrQuest.answerIdx].style.color = 'green';
        gScore += 10;
        gCorrectAnswers++;
        if (gCorrectAnswers % 3 === 0) {
            gScore += 3;
        }
    }
    setTimeout(function () {
        for (var i = 0; i < quests.length; i++) {
            quests[i].style.borderColor = 'white';
            quests[i].style.color = 'white';
        }
        getRndQuest();
        isGameOn = true;
        if (gameQuests.length === 0) {
            clearInterval(gInterval);
            gScore -= gTime;
            getHomeMenu();
        }
    }, 1000);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
