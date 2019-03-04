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
	alert('Getting the data')
	client = new XMLHttpRequest();
	client.open('GET','http://developer.cege.ucl.ac.uk:30250/getFormData/30250');
	client.onreadystatechange = earthquakeResponse;
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