var client;
var earthquakes;
var earthquakelayer;
var httpPortNumber = '30282';

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
	client.open('GET','http://developer.cege.ucl.ac.uk:'+httpPortNumber+'/getGeoJSON/formdata/geom/'+httpPortNumber,true);
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
	earthquakelayer = L.geoJson(earthquakejson,{
		// use point to layer to create the points
		pointToLayer: function (feature, latlng){
		// in this case, we build an HTML DIV string
		// using the values in the data
			var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h2>" + feature.properties.name + "</h2><br>";
			htmlString = htmlString + "<h3>"+feature.properties.surname + "</h3><br>";
			htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_1'/>"+feature.properties.module+"<br>";
			htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_2'/>"+feature.properties.language+"<br>";
			htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_3'/>"+feature.properties.lecturetime+"<br>";
			htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_4'/>"+feature.properties.port_id+"<br>";
			htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
			// now include a hidden element with the answer
			// in this case the answer is alwasy the first choice
			// for the assignment this will of course vary - you can use feature.properties.correct_answer
			htmlString = htmlString + "<div id=answer" + feature.properties.id +
			" hidden>1</div>";
			htmlString = htmlString + "</div>";
			return L.marker(latlng).bindPopup(htmlString);
		},
	}).addTo(mymap);
	mymap.fitBounds(earthquakelayer.getBounds());
}