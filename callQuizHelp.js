// define the global variable to process the AJAX request
var xhr; 

function callQuizHelp() {
	alert('Loading the HELP file for the Quiz App');
	xhr = new XMLHttpRequest();
	var filename = "guide_quiz.html"
	xhr.open("GET", filename, true);
	xhr.onreadystatechange = processDivChange;
	xhr.send();
}

function processDivChange() {
	// while waiting response from server
	if (xhr.readyState < 4) {
		document.getElementById('help').innerHTML = "Loading...";
	}
	// 4 = Response from server has been completely loaded
	else if (xhr.readyState === 4) { 
		if (xhr.status == 200 && xhr.status < 300) {
		// http status between 200 to 299 are all successful
		document.getElementById('help').innerHTML = xhr.responseText;
		}
	}
}