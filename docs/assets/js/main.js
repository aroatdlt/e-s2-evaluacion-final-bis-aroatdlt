"use strict";const button=document.querySelector(".button"),cardList=document.querySelector(".card__list"),defaultInput=document.querySelector("#number__four"),inputs=document.querySelectorAll("input");let lastSelectedInput,imageCard="",selectedInput="",selectedCard="";if(localStorage.getItem("numberCards")){lastSelectedInput=localStorage.getItem("numberCards");for(const e of inputs)lastSelectedInput===e.value&&e.setAttribute("checked",!0)}else defaultInput.setAttribute("checked",!0);function resetGame(){const e=document.querySelectorAll(".card__image");for(const t of e)t.remove(t)}function handleBeginGame(){resetGame();const e=document.querySelectorAll("input");for(const t of e)t.checked&&(selectedInput=t.value);function t(e){(selectedCard=e.currentTarget).classList.toggle("hidden")}function c(e){const t=e.currentTarget;(selectedCard=t.nextSibling).classList.remove("hidden")}fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${selectedInput}.json`).then(e=>e.json()).then(e=>{for(let t=0;t<e.length;t++){imageCard=e[t].image;const c=document.createElement("li");c.className="card__image";const r=document.createElement("img");r.src=`${imageCard}`,r.setAttribute("alt","Carta delantera Pokemon"),r.className="pokemon__card--forward";const a=document.createElement("img");a.src="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB.",a.setAttribute("alt","Carta trasera Adalab"),a.className="pokemon__card--reverse",c.append(r,a),cardList.appendChild(c)}const r=document.querySelectorAll(".pokemon__card--reverse");for(let e=0;e<r.length;e++)r[e].addEventListener("click",t);const a=document.querySelectorAll(".pokemon__card--forward");for(let e=0;e<a.length;e++)a[e].addEventListener("click",c)}),localStorage.setItem("numberCards",selectedInput)}button.addEventListener("click",handleBeginGame);