"use strict";const button=document.querySelector(".button"),cardList=document.querySelector(".card__list"),defaultInput=document.querySelector("#number__four"),inputs=document.querySelectorAll("input");let lastSelectedInput,imageCard="",selectedInput="";if(localStorage.getItem("numberCards")){lastSelectedInput=localStorage.getItem("numberCards");for(const e of inputs)lastSelectedInput===e.value&&e.setAttribute("checked",!0)}else defaultInput.setAttribute("checked",!0);function resetGame(){const e=document.querySelectorAll(".card__image");for(const t of e)t.remove(t)}function handleBeginGame(){resetGame();const e=document.querySelectorAll("input");for(const t of e)t.checked&&(selectedInput=t.value);function t(e){e.target.classList.toggle("hidden")}fetch(`https://raw.githubusercontent.com/Adalab/cards-data/master/${selectedInput}.json`).then(e=>e.json()).then(e=>{for(let t=0;t<e.length;t++){imageCard=e[t].image;const a=document.createElement("li");a.className="card__image";const c=document.createElement("img");c.src=`${imageCard}`,c.setAttribute("alt","Carta delantera Pokemon"),c.className="pokemon__card--forward";const r=document.createElement("img");r.src="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB.",r.setAttribute("alt","Carta trasera Adalab"),r.className="pokemon__card--reverse",a.append(c,r),cardList.appendChild(a)}const a=document.querySelectorAll(".pokemon__card--reverse");for(let e=0;e<a.length;e++)a[e].addEventListener("click",t)}),localStorage.setItem("numberCards",selectedInput)}button.addEventListener("click",handleBeginGame);