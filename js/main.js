'use strict'
var gQuests = [];
var gCurrQuestIdx;

function initGame() {
    closeModal();
    gQuests = createQuests();
    gCurrQuestIdx = 0;
    renderQuest();
}

function createQuests() {
    var quests = [
        { id: 1, opts: [], correctOptIndex: 1 },
        { id: 2, opts: [], correctOptIndex: 0 },
        { id: 3, opts: [], correctOptIndex: 0 }
    ];
    fillOpts(quests);
    return quests;
}

function renderQuest() {
    var strHtml = '';
    var currQuest = gQuests[gCurrQuestIdx];
    var elImg = document.querySelector('.pics');
    elImg.style.backgroundImage = `url(img/${currQuest.id}.png)`;
    for (var i = 0; i < currQuest.opts.length; i++) {
        strHtml += `<div class="opts" data-opt="${i}"
                onclick="checkAnswer(this)">`;
        strHtml += currQuest.opts[i];
        strHtml += '</div>';
    }
    var elOpts = document.querySelector('.options');
    elOpts.innerHTML = strHtml;
}

function fillOpts(quests) {
    var currOpts = quests[0].opts;
    currOpts.push('A black and white puppy is having fun.');
    currOpts.push('A brown and white puppy is having fun.');
    currOpts = quests[1].opts;
    currOpts.push('A studious boy is reading a red book.');
    currOpts.push('A silly boy is writing on a red book.');
    currOpts = quests[2].opts;
    currOpts.push('Three kids are in their wooden bunk beds.');
    currOpts.push('Four kids are in their wooden bunk beds.');
}

function checkAnswer(elOpt) {
    var optIdx = +elOpt.dataset.opt;
    var currQuest = gQuests[gCurrQuestIdx];
    if (optIdx !== currQuest.correctOptIndex) return;
    if (gCurrQuestIdx === gQuests.length - 1) showVictory();
    else {
        gCurrQuestIdx++;
        renderQuest();
    }
}

function showVictory() {
    var elModal = document.querySelector('.modal');
    var elH3 = document.querySelector('.modal h3');
    elH3.innerText = 'You Are Victorious!';
    elModal.style.display = 'block';
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

function handleKey(ev) {
    if (ev.key === 'Escape') closeModal();
    if (ev.key === 'Enter') initGame();
}