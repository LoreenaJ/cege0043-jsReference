var client;
var earthquakes;
var earthquakelayer;

function addShapes(){
		L.marker([51.5,-0.09]).addTo(mymap).bindPopup("<b>Hello World!</b><br/>I am a popup.");

		L.circle([51.508,-0.11],500,{
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(mymap).bindPopup("I am a circle.");
		
		var myPolygon=L.polygon([
			[51.509,-0.08],
			[51.503,-0.06],
			[51.51,-0.047]
			],{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5
			}).addTo(mymap).bindPopup("I am a triangle.");
}

function getFormData(){
	client = new XMLHttpRequest();
	var url = 'http://developer.cege.ucl.ac.uk:'+httpPortNumber+'/getFormData/'+httpPortNumber
	client.open("GET", url, true);
	client.onreadystatechange = earthquakeResponse;
	try {
		client.setRequestHeader("Content-Type", "application/x-www-formurlencoded");
	}
	catch (e) {
	// this only works in internet explorer
	}
	client.send();
}

function earthquakeResponse(){
	if (client.readyState == 4){
		var earthquakedata=client.responseText;
		loadEarthquakelayer(earthquakedata);
	}
}

function loadEarthquakelayer(earthquakedata){
	var earthquakejson = JSON.parse(earthquakedata);
	earthquakes = earthquakejson
	earthquakelayer = L.geoJson(earthquakejson).addTo(mymap);
}