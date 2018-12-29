'use strict';

//Recoger el valor del input seleccionado 
const button = document.querySelector('.button');
const cardList = document.querySelector('.card__list');
let imageCard = "";

function handleBeginGame(){
    const inputs = document.querySelectorAll('input');
    let selectedInput = "";
    for (const input of inputs){
        if (input.checked){
            selectedInput = input.value;
        }
    }
    fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${selectedInput}.json`)
    .then(response => response.json())
    .then(imageData => {
        for (let i = 0; i < imageData.length; i++){
            imageCard = imageData[i].image;
            const newCard = document.createElement('li');
            const newImage = document.createElement('img');
            newImage.src = `${imageCard}`;
            newImage.setAttribute('alt', 'Carta Pokemon');
            newCard.appendChild(newImage);
            cardList.appendChild(newCard);
        }
    })
};


button.addEventListener('click', handleBeginGame);


//Conectarse a la API