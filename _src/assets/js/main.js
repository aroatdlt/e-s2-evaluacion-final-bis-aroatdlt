'use strict';

const button = document.querySelector('.button');
const cardList = document.querySelector('.card__list');
const defaultInput = document.querySelector('#number__four');
const inputs = document.querySelectorAll('input');
let imageCard = '';
let selectedInput = '';
let lastSelectedInput;
let selectedCard = '';

//Checked inputs default and the last one checked
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

//Delete all the contain when you choose another number of cards
function resetGame() {
  const cardItems = document.querySelectorAll('.card__image');
  for (const item of cardItems) {
    item.remove(item);
  }
}

//Begin the game when you choose one option of number of cards
function handleBeginGame() {
  resetGame();
  const inputs = document.querySelectorAll('input');

  //Pick up input value
  for (const input of inputs) {
    if (input.checked) {
      selectedInput = input.value;
    }
  }

  //Ask to server the number of cards which you want to play and print in html
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

      //Add listeners to all printed reverse cards
      const reverseCards = document.querySelectorAll('.pokemon__card--reverse');
      for (let i = 0; i < reverseCards.length; i++) {
        reverseCards[i].addEventListener('click', handleSelectedCard);
      }
      const forwardCards = document.querySelectorAll('.pokemon__card--forward');
      for (let i = 0; i < forwardCards.length; i++) {
        forwardCards[i].addEventListener('click', resetCardReverse);
      }
    });

  //Storage the number of cards that you play
  localStorage.setItem('numberCards', (selectedInput));

  //When you click one card, it will be disappear and we can see pokemon card
  function handleSelectedCard(event) {
    selectedCard = event.currentTarget;
    selectedCard.classList.toggle('hidden');
  }

  //When you click again, appear reverse card
  function resetCardReverse(event) {
    const pokemonCard = event.currentTarget;
    selectedCard = pokemonCard.nextSibling;
    selectedCard.classList.remove('hidden');
  }
}

button.addEventListener('click', handleBeginGame);
