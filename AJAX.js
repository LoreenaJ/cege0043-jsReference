// define the global variable to process the AJAX request
var xhrNode; 

function callDivNodeJSChange() {
	xhrNode = new XMLHttpRequest();
	var url = 'http://developer.cege.ucl.ac.uk/' + httpPortNumber;
	xhrNode.open("GET", url, true);
	xhrNode.onreadystatechange = processDivNodeJSChange;
	try {
		xhrNode.setRequestHeader("Content-Type", "application/x-www-formurlencoded");
	}
	catch (e) {
	// this only works in internet explorer
	}
	xhrNode.send();
}

function processDivNodeJSChange() {
	// while waiting response from server
	if (xhrNode.readyState < 4) {
		document.getElementById('ajaxtest').innerHTML = "Loading...";
	}
	// 4 = Response from server has been completely loaded
	else if (xhrNode.readyState === 4) { 
		if (xhrNode.status == 200 && xhrNode.status < 300) {
		// http status between 200 to 299 are all successful
		document.getElementById('ajaxtest').innerHTML = xhrNode.responseText;
		}
	}
}