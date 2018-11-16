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
	var	alienAmnt = 20;

	createAliens(alienAmnt);


	//show living aliens amount
	document.getElementById('living-aliens').innerHTML = alienAmnt;

	//show dead aliens amount
	document.getElementById('dead-aliens').innerHTML = 0;

	
	countdown(seconds);	
}

function countdown(seconds) {
	seconds = seconds - 1;

	if (seconds < 0) {
		clearTimeout(timerId); //stop setTimeout function execution
		return false;
	}

	document.getElementById('watch').innerHTML = seconds;

	timerId = setTimeout("countdown("+seconds+")", 1000);

}

function createAliens(alienAmnt) {
	for(var i = 0; i < alienAmnt; i++) {
		var alien = document.createElement("img");
		alien.src = 'img/small-alien1.png';
		alien.style.margin = '10px';

		//adiciona cada elemento alien como sendo um filho da div scenary
		document.getElementById('scenary').appendChild(alien);
	}

}