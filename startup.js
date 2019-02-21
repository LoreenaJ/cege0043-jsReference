function trackAndCircle(){
	alert('Tracking location and Drawing shapes');
	trackLocation();
	addShapes();
	getEarthquakes();
}

function startup(){
	document.addEventListener('DOMContentLoaded',function(){
		zoomOnMap();
	},false)
	document.addEventListener('DOMContentLoaded',function(){
		trackAndCircle();
	},false);
}