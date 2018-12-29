'use strict';

//Recoger el valor del input seleccionado 
const button = document.querySelector('.button');
const cardList = document.querySelector('.card__list');
const defaultInput = document.querySelector('#number__four');
const inputs = document.querySelectorAll('input');
let imageCard = "";
let selectedInput = "";
let lastSelectedInput;

if (localStorage.getItem('numberCards')) {
    lastSelectedInput = localStorage.getItem('numberCards');
    for (const input of inputs) {
        if (lastSelectedInput === input.value) {
            input.setAttribute('checked', true);
        }
    }
} else {
    defaultInput.setAttribute('checked', true);
}

function resetGame() {
    const cardItems = document.querySelectorAll('.card__image');
    for (const item of cardItems) {
        item.remove(item);
    }
}

function handleBeginGame() {
    resetGame();
    const inputs = document.querySelectorAll('input');


    for (const input of inputs) {
        if (input.checked) {
            selectedInput = input.value;
        }
    }

    //Pedir al servidor el número de cartas que queremos jugar
    fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${selectedInput}.json`)
        .then(response => response.json())
        .then(imageData => {
            for (let i = 0; i < imageData.length; i++) {
                imageCard = imageData[i].image;
                const newCard = document.createElement('li');
                newCard.className = 'card__image';
                const newImage = document.createElement('img');
                newImage.src = `${imageCard}`;
                newImage.setAttribute('alt', 'Carta delantera Pokemon');
                newImage.className = 'pokemon__card--forward';
                const newImageDefault = document.createElement('img');
                newImageDefault.src = `https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB.`;
                newImageDefault.setAttribute('alt', 'Carta trasera Adalab');
                newImageDefault.className = 'pokemon__card--reverse';
                newCard.append(newImage, newImageDefault);
                cardList.appendChild(newCard);
            }
            const forwardCards = document.querySelectorAll('.pokemon__card--forward');
            for (const forwardCard of forwardCards) {
                forwardCard.classList.toggle('hidden');
            }
        })

    localStorage.setItem('numberCards', (selectedInput));

    function handleSelectedCard() {
        const selectedCard = event.currentTarget;

    }
    cardList.addEventListener('click', handleSelectedCard);
};

button.addEventListener('click', handleBeginGame);
