console.log("Javascript file is gelinkt.")

// VARIABLES
var uitlegTekst = document.getElementById('uitlegtekst');
var piano = document.getElementById('piano');
var huidigeLetter = 0;

// Buttons:
var liedjesButtons = document.querySelector('#liedjesbuttons');
var startButton = document.querySelectorAll('.startbutton');

// Lettervolgordes van de liedjes:
var youAreMySunshine = ["e", "e", "r", "t", "t", "t", "r", "t", "e", "e", "e", "r", "t", "y", "i", "i", "u", "y", "t", "e", "r", "t", "y", "i", "i", "u", "y", "t", "e", "e", "r", "t", "t", "r", "t", "r", "e"];
var littleStar = ["e", "e", "u", "u", "i", "i", "u", "y", "y", "t", "t", "r", "r", "e", "u", "u", "y", "y", "t", "t", "r", "u", "u", "y", "y", "t", "t", "r", "e", "e", "u", "u", "i", "i", "u", "y", "y", "t", "t", "r", "r", "e"];
var vaderJacob = ["e", "r", "t", "e", "e", "r", "t", "e", "t", "y", "u", "t", "y", "u", "u", "i", "u", "y", "t", "e", "u", "i", "u", "y", "t", "e", "e", "t", "e", "e", "t", "e"];

// Variabelen afhankelijk van het gekozen liedje:
var gekozenLiedje;
var pianoToetsDoel;


// FUNCTIONS
// Functie die afgaat als je op een liedjesknop klikt:
function speelLiedje() {
    liedjesButtons.style.visibility = "hidden";
    uitlegTekst.textContent = "Press the keys that are highlighted on the piano.";
    piano.style.opacity = "1";
    piano.style.marginTop = "-50px";
    
    console.log(this.id);

    if (this.id == "sunshinebutton") {
        gekozenLiedje = youAreMySunshine;
    } else if (this.id == "littlestarbutton") {
        gekozenLiedje = littleStar;
    } else if (this.id == "vaderjacobbutton") {
        gekozenLiedje = vaderJacob;
    }

    pianoToetsDoel = document.getElementById(('t' + gekozenLiedje[huidigeLetter]));

    pianoToetsDoel.classList.add('toetsOmAanTeSlaan');
}

// Functie die afgaat wanneer je tijdens het spelen op een toetsenbord-key klikt:
function toetsenIndrukken() {
    if (piano.style.opacity == "1") {
        if (event.key == gekozenLiedje[huidigeLetter]) {
            var aangeklikteToon = new Audio('audio/' + gekozenLiedje[huidigeLetter] + '.mp3');
            aangeklikteToon.play();

            if (huidigeLetter < gekozenLiedje.length - 1) {
                huidigeLetter++;

                pianoToetsDoel.classList.remove('toetsOmAanTeSlaan');
                pianoToetsDoel = document.getElementById(('t' + gekozenLiedje[huidigeLetter]));
                pianoToetsDoel.classList.add('toetsOmAanTeSlaan');

            } else if (huidigeLetter == gekozenLiedje.length - 1) {
                huidigeLetter = 0;

                piano.style.marginTop = "0px";
                piano.style.opacity = "0";
                liedjesButtons.style.visibility = "visible";
                uitlegTekst.textContent = "Good job! Want to try again?";
            }

        } else if (event.key !== gekozenLiedje[huidigeLetter]) {
            new Audio('audio/fout.mp3').play();
        }
    }
}


// EVENTS
for (var i = 0; i < startButton.length; i++) {
    startButton[i].addEventListener('click', speelLiedje);
}

document.addEventListener('keypress', toetsenIndrukken);
