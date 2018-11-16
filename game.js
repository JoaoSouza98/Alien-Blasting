var timerId = null // <-- variable that storage the timeout funcion call

function startGame() {
	var url = window.location.search; //pega soh o que esta a partir do sinal de interrogacao

	var level = url.replace("?", "");

	var seconds = 0;

	switch(level) {
    //1 easy -> 120 seconds
    case "1":
        seconds = 120;
        break;
    //2 medium -> 60 seconds
    case "2":
        seconds = 60;
        break;
    //3 hard -> 30 seconds
    case "3":
        seconds = 30;
        break;
	}


	//inserting seconds on span
	document.getElementById('watch').innerHTML = seconds;

	//aliens amount
	var	alienAmnt = 80;

	createAliens(alienAmnt);


	//show living aliens amount
	document.getElementById('living-aliens').innerHTML = alienAmnt;

	//show dead aliens amount
	document.getElementById('dead-aliens').innerHTML = 0;

	
	countdown(seconds + 1);	
}

function countdown(seconds) {
	seconds = seconds - 1;

	if (seconds < 0) {
		clearTimeout(timerId); //stop setTimeout function execution
		gameOver();
		return false;
	}

	document.getElementById('watch').innerHTML = seconds;

	timerId = setTimeout("countdown("+seconds+")", 1000);

}

function gameOver() {
	var msg = "GAME OVER. You couldn't stop the alien invasion."
	alert(msg);
}

function createAliens(alienAmnt) {
	for(var i = 0; i < alienAmnt; i++) {
		var alien = document.createElement("img");
		alien.src = 'img/small-alien1.png';
		alien.style.margin = '10px';
		alien.id = 'a' + i;
		alien.onclick = function() { blast(this); }

		//adiciona cada elemento alien como sendo um filho da div scenary
		document.getElementById('scenary').appendChild(alien);
	}

}

function blast(e) {
	var idAlien = e.id;

	document.getElementById(idAlien).setAttribute("onclick", "");
	document.getElementById(idAlien).src = 'img/small-alien2.png';

	score(-1);
}

function score(action) {
	var livingAliens = document.getElementById('living-aliens').innerHTML;
	var deadAliens = document.getElementById('dead-aliens').innerHTML;

	livingAliens = parseInt(livingAliens);
	deadAliens = parseInt(deadAliens);

	livingAliens = livingAliens + action;
	deadAliens = deadAliens - action;

	document.getElementById('living-aliens').innerHTML = livingAliens;
	document.getElementById('dead-aliens').innerHTML = deadAliens

	gameStatus(livingAliens);
}

function gameStatus(livingAliens) {
	if (livingAliens == 0) {
		alert('Congratulations, you stop the alien menace... for now.');
		stopGame();
	}
}

function stopGame() {
	clearTimeout(timerId);
}

function removeAlienEvents() {
    var i = 1; //counter to get alien by id
    
    //scroll throught the elements by their id's and only stop the loop when there are no match for the id
    while(document.getElementById('b'+i)) {
        //removes the onclick event from the element
        document.getElementById('b'+i).onclick = '';
        i++; //increment i
    }
}