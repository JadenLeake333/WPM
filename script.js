const car = document.getElementsByClassName("car")[0]
const finish = document.getElementsByClassName("finish")[0]
var prompt = document.getElementsByClassName("prompt")[0].innerHTML
var start = document.getElementsByClassName("start")[0]
// Clear any inputs
document.getElementById("userInput").value = ""

var userInput = document.getElementById("userInput")

var accuracy = document.getElementById("acc")
var wpm = document.getElementById("wpm")


var previousInput = userInput.value.length

car.style.left = 0
var letterIndex = 0
var interval = 0
var misses = 0
var seconds = 0
var charsTyped = 0

var finishPosition = finish.x

async function getQuote() {
    let quote = await fetch("https://api.quotable.io/random")
    let quoteContent = await quote.json()

    prompt = await quoteContent.content
    document.getElementsByClassName("prompt")[0].innerHTML = await prompt
    interval = Math.round(finishPosition / prompt.length)
}

getQuote()

const moveCar = () =>{
    var userText = userInput.value

    if (userText[letterIndex] === prompt[letterIndex] && userText === prompt.substring(0,userText.length)) {
        prompt[letterIndex].color = "red"

        var left = parseInt(car.style.left);
        car.style.position = "relative"
        car.style.left = (left+interval)+"px"
        letterIndex++
        charsTyped++
        
    }else{
        misses++
    }

    let minutes = seconds / 60
    if (userText === prompt) {
        alert("Your WPM was " +  Math.round(((charsTyped / 5) / minutes)))
        window.location.href = window.location
    }
    accuracy.innerHTML = Math.round(Math.abs((misses-prompt.length)/prompt.length * 100))
    wpm.innerHTML = Math.round(((charsTyped / 5) / minutes))
}

function startTimer(){
    let minutes = seconds / 60
    timex = setTimeout(function(){
        seconds++
        userInput.removeAttribute("disabled")
        userInput.focus()
        start.setAttribute("disabled","")
        document.getElementById("time").innerHTML = seconds
        wpm.innerHTML = Math.round(((charsTyped / 5) / minutes))
        startTimer()
    },1000)
}
