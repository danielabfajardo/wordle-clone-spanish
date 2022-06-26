const lettersPattern = /[ñA-Za-z]/;
let currentGuessCount = 1;
let currentGuess = document.querySelector('#guess' + currentGuessCount);
const words = ['tinta','abeja','acoso','caliz','calvo','oruga','hueso','zurdo','busto','queso','guiño'];
let solution =  words[Math.floor(Math.random()*words.length)];
let gameDone = false;

//move on to the next row after guess submitted
const updateCurrentGuess = () => {
	currentGuessCount++;
	checkWin();
	currentGuess = document.querySelector('#guess' + currentGuessCount);
};

//detect virtual keyboard click (letter, del, enter)
document.querySelectorAll("button").forEach(button => {
	button.addEventListener('click', (e) => {
		if(gameDone) {e.currentTarget.removeEventListener(e.type, button);}
		// If buttonpress is string of length 1, and is a letter
		let buttonpress = e.target.innerText.toLowerCase();
		if(buttonpress.length == 1 && lettersPattern.test(buttonpress) && currentGuess.dataset.letters.length < 5) {
			updateLetters(buttonpress);
		// If backspace
		} else if(buttonpress == 'del' && currentGuess.dataset.letters != "") {
			deleteFromLetters();
		// If entera
		} else if(buttonpress == 'enter' && currentGuess.dataset.letters.length == 5) {
			//Check letter to solution
			for(let i=0; i<5; i++) {	
				setTimeout(() => {
					compareLetters(i);
				}, i*300);
			}
			setTimeout(() => {
				updateCurrentGuess();
			}, 1600);
		}
	});
});

//detect keypress (letter, backspace, other)
document.addEventListener('keydown', (e) => {
	if(gameDone) {e.currentTarget.removeEventListener(e.type);}
	// If keypress is string of length 1, and is a letter
	let keypress = e.key;
	if(keypress.length == 1 && lettersPattern.test(e.key) && currentGuess.dataset.letters.length < 5) {
		updateLetters(keypress);
	// If backspace
	} else if(e.key == 'Backspace' && currentGuess.dataset.letters != "") {
		deleteFromLetters();
	// If enter
	} else if(e.key == 'Enter' && lettersPattern.test(e.key) && currentGuess.dataset.letters.length == 5) {
		//Check letter to solution
		for(let i=0; i<5; i++) {	
			setTimeout(() => {
				compareLetters(i);
			}, i*300);
		}
		setTimeout(() => {
			updateCurrentGuess();
		}, 1600);
	}
});

//check if answer is correct
const checkWin = () => {
	if(solution == currentGuess.dataset.letters) {
		alert("GANASTEEEEEEEE!");
		gameDone = true;
	} else if(currentGuessCount == 7) {
		alert('La respuesta era: ' + solution);
	} 
};

//compare solution to submitted word
const compareLetters = (position) => {
	let guessedWord = currentGuess.dataset.letters.charAt([position]);
	let solutionWord = solution.charAt(position);
	let currentTile = currentGuess.querySelector('#guessTile' + (position+1));
	let buttonLetter = document.getElementById(guessedWord).innerText;
	currentTile.classList.remove('blink');
	currentTile.classList.add("flip-in");
	if(solutionWord == guessedWord) {
		setTimeout(() => {
			currentTile.classList.add("correct");
		}, 250);
		if(buttonLetter == guessedWord.toUpperCase()) {
			document.getElementById(guessedWord).classList.add("correct");
		}
	} else if(solution.includes(guessedWord)) {
		setTimeout(() => {
			currentTile.classList.add("present");
		}, 250);
	} else {
		setTimeout(() => {
			currentTile.classList.add("absent");
		}, 250);
		if(buttonLetter == guessedWord.toUpperCase()) {
			document.getElementById(guessedWord).classList.add("absent");
		}
	} 
	currentTile.classList.remove("flip-in");
	setTimeout(() => {
		currentTile.classList.add("flip-out");
	}, 250);
	currentTile.classList.remove("flip-out");
};

//update "letters"
const updateLetters = (letter) => {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters + letter;
	let currentTile = newLetters.length;
	currentGuess.dataset.letters = newLetters;
	updateTiles(currentTile, letter);
};

//update tile markup
const updateTiles = (tileNumber, letter) => {
	let currentTile = currentGuess.querySelector('#guessTile' + tileNumber);
	currentTile.dataset.letter = letter;
	currentTile.innerText = letter;
	currentTile.classList.add('blink');
	currentTile.classList.add('has-letter');
};

//delete last letter from letters
const deleteFromLetters = () => {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters.slice(0, -1);
	currentGuess.dataset.letters = newLetters;
	deleteFromTiles(oldLetters.length);
};

//delete last letter from tiles
const deleteFromTiles = (tileNumber) => {
	let currentTile = currentGuess.querySelector('#guessTile' + tileNumber);
	currentTile.innerText = '';
	currentTile.dataset.letter = '';
	currentTile.classList.remove('blink');
	currentTile.classList.remove('has-letter');
};