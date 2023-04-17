let footerElem = document.getElementById('footerstart')


let startButton = document.createElement('input')
startButton.setAttribute("class", "startButton")
startButton.setAttribute("type", "button")
startButton.setAttribute("value", "Starta")
startButton.onclick = function () {
  window.location.href = "game.html";
}


footerElem.appendChild(startButton)