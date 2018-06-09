$(document).ready(function(){

var map_eur = new Datamap({
	element: document.getElementById("cvmap-eur"),
	scope: 'world',
	aspectRatio: 1,
	responsive: true,
	//Zoom in on Africa
	setProjection: function(element) {
	var projection = d3.geo.mercator()
	  .center([7, 51])
	  //.rotate([4.4, 0])
	  .scale(700)
	  .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
	var path = d3.geo.path()
	  .projection(projection);

	return {path: path, projection: projection};
	},
	geographyConfig: {
		popupTemplate: function(geography, data){
			return '<div class="hoverinfo"><strong>' + data.name + '</strong></div>'
		},
		highlightFillColor: '#4e68ff',
		highlightBorderColor: '#4e68ff'
	},
	fills: {
		defaultFill: "#d5e1df",
		country : "#9aa9ff",
		target : '#ff4e68',
		conference : '#4e68ff'
	},
	data: {
		"DEU" : {name: "Germany", fillKey : "country"},
		"FRA" : {name: "France", fillKey : "country"},
		"GBR" : {name: "United Kingdom", fillKey : "country"},
		"CZE" : {name: "Czech Republich", fillKey : "country"}
	}
});

map_eur.bubbles([
	{org: 'Max Planck Institute', position: "PhD Candidate (Computational Biology)", city: "Munich, Germany", table: 'table_muc', latitude: 48.105, longitude: 11.459, radius: 5, fillKey: 'target'},
	{org: 'Aix-Marseille University', position: "Research Intern", city: "Marseille, France", table: 'table_mrs', latitude: 43.231, longitude: 5.437, radius: 5, fillKey: 'target'},
	{org: 'University of Edinburgh', position: "MSc in Bioinformatics", city: "Edinburgh, United Kingdom", table: 'table_edi', latitude: 55.943, longitude: -3.185, radius: 5, fillKey: 'target'},
	{org: 'European Conference on Computational Biology', position: "Conference Presentation", city: "Prague, Czech Republic", table: 'table_prg', latitude: 50.057, longitude: 14.421, radius: 5, fillKey: 'conference'}
], {
 popupTemplate: function(geo, data) {

 	//open the popup
 	if (!($('#'+data.table).hasClass("hide"))){
 		$('#'+data.table).collapse('show')
 	}
 	//scroll to the element        
	$('#cv_doc').scrollTo("#"+data.table, 100, {offset: -200, 'axis':'y'});	

	return "<div class='hoverinfo' style='text-align: center; white-space: nowrap;'><strong>" + data.position + "</strong><br>"  + data.org+ "<br>" + data.city + "</div>";
 },
	borderWidth: 1,
	fillOpacity: 0.75,
	highlightFillColor: '#ff4e68',
	highlightBorderColor: '#ff4e68'
});

var map_asia = new Datamap({
	element: document.getElementById("cvmap-asia"),
	scope: 'world',
	aspectRatio: 1,
	responsive: true,
	setProjection: function(element) {
	var projection = d3.geo.mercator()
	  .center([109, 35])
	  //.rotate([4.4, 0])
	  .scale(270)
	  .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
	var path = d3.geo.path()
	  .projection(projection);

	return {path: path, projection: projection};
	},
	geographyConfig: {
		popupTemplate: function(geography, data){
			return '<div class="hoverinfo"><strong>' + data.name + '</strong></div>'
		},
		highlightFillColor: '#4e68ff',
		highlightBorderColor: '#4e68ff'
	},
	fills: {
		defaultFill: "#d5e1df",
		country : "#9aa9ff",
		target : '#ff4e68',
		conference : '#4e68ff'
	},
	data: {
		"CHN" : {name: "China", fillKey : "country"},
		"JPN" : {name: "Japan", fillKey : "country"}
	}
});

map_asia.bubbles([
	{org: 'The Chinese University of Hong Kong', position: "MPhil in Medicine/Research Assistant", city: "Hong Kong", table: 'table_hkg', latitude: 22.416, longitude: 114.211, radius: 5, fillKey: 'target'},
	{org: 'Nanjing University', position: "Exchange Student", city: "Nanjing, China", table: 'table_nj',latitude: 32.026, longitude: 118.583, radius: 5, fillKey: 'target'},
	{org: 'Asia Pacific Bioinformatics Conference ', position: "Conference Presentation", city: "Yokohama, Japan", table: 'table_jpn', latitude: 35.457, longitude: 139.578, radius: 5, fillKey: 'conference'}
], {
 popupTemplate: function(geo, data) {

 	//scroll to the element        
	$('#cv_doc').scrollTo("#"+data.table, 100, {offset: -200, 'axis':'y'});	
 	//open the popup
 	//if ($('#'+data.table).attr('aria-expanded') == undefined || $('#'+data.table).attr('aria-expanded') == "false"){
 	if (!($('#'+data.table).hasClass("hide"))){
		// $('.collapse_table').each(function(){
		// 	if ($(this).hasClass("show") && this.id != data.table){
		// 		$(this).collapse('hide')
		// 	}	
		// })

 		$('#'+data.table).collapse('show')
 	}
	
	return "<div class='hoverinfo' style='text-align: center; white-space: nowrap;'><strong>" + data.position + "</strong><br>"  + data.org+ "<br>" + data.city + "</div>";
 },
	borderWidth: 1,
	fillOpacity: 1,
	highlightFillColor: '#ff4e68',
	highlightBorderColor: '#ff4e68'
});

var colors = d3.scale.category10();
var currentOpacity = 1 

d3.selectAll('.bubbles').selectAll('circle').attr("r",5)

window.setInterval(function() {

	currentOpacity = currentOpacity == 1 ? 0.25 : 1;
	d3.selectAll('.bubbles').selectAll('circle')
	.transition()
		.duration(1000)
		.style("opacity", function(d){return currentOpacity})

}, 1200);


window.addEventListener('resize', function() {
    map_eur.resize();
    map_asia.resize();
	var cvheight=document.getElementById('cvmap-eur').offsetHeight + document.getElementById('cvmap-caption-eur').offsetHeight;
	document.getElementById('cv_doc').style.height=cvheight+'px';
});

var cvheight=document.getElementById('cvmap-eur').offsetHeight + document.getElementById('cvmap-caption-eur').offsetHeight;
document.getElementById('cv_doc').style.height=cvheight+'px';

})