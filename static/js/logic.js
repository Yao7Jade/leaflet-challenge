


// Create a map object.
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';


// 请求数据
d3.json(url).then(function(data) {
//打印数据
console.log(data);
//
let features = data.features;


function getColor(depth){
if (depth < 10){
return '#bce672';
}

if (depth < 30){
return '#eaff56';
}

if(depth < 50){
return '#fff143';
}

if(depth < 70){
return '#ffa631';
}

if(depth < 90){
return '#ff7500';
}

return '#f00056';
}



function getSize(mag){
//if (depth < 10){
//return ''
return 25000 * Math.sqrt(mag +2);
}



for (let i = 0; i < features.length; i++) {
  let earthquake = features[i];
  let coordinates = earthquake.geometry.coordinates;
  let location = [coordinates[1], coordinates[0]];
  let depth = coordinates[2];

  let place = earthquake.properties.place;
  let mag = earthquake.properties.mag;

  L.circle(location,
   {
   weight : 1,
    fillOpacity: 0.75,
    color: "white",
    fillColor: getColor(depth),
    // Adjust the radius.
    radius: getSize(mag)
  })
    .bindPopup(`<h1>${place}</h1> <br> <h3> magnitudes ${mag} </h3> <br> <h3> depth ${depth} </h3> `)
    .addTo(myMap);
}

 const legend = L.control.Legend({
               position: "bottomright",
            collapsed: false,
            symbolWidth: 50,
            opacity: 1,
			title:"color bar",
            column: 2,
            legends: [
            {
                label: "-10-10",
                type: "rectangle",
                color: "#bce672",
                fillColor: "#bce672",
                weight: 2
            },
            {
                label: "10-30",
                type: "rectangle",
                color: "#eaff56",
                fillColor: "#eaff56",
                weight: 2
            },
            {
                label: "30-50",
                type: "rectangle",
                color: '#fff143',
                fillColor: '#fff143',
                weight: 2
            },
            {
                label: "50-70",
                type: "rectangle",
                color: "#ffa631",
                fillColor: "#ffa631",
                weight: 2
            },
            {
                label: "70-90",
                type: "rectangle",
                color: "#ff7500",
                fillColor: "#ff7500",
                weight: 2
            },
            {
                label: "90+",
                type: "rectangle",
                color: '#f00056',
                fillColor: '#f00056',
                weight: 2
            }

            ]
        })
        .addTo(myMap);


}


);




// bottomleft





//for (let i = 0; i < countries.length; i++) {
//
//  // Conditionals for country gdp_pc
//  let color = "";
//  if (countries[i].gdp_pc > 100000) {
//    color = "yellow";
//  }
//  else if (countries[i].gdp_pc > 75000) {
//    color = "blue";
//  }
//  else if (countries[i].gdp_pc > 50000) {
//    color = "green";
//  }
//  else {
//    color = "violet";
//  }
//
//  // Add circles to the map.
//  L.circle(countries[i].location, {
//    fillOpacity: 0.75,
//    color: "white",
//    fillColor: color,
//    // Adjust the radius.
//    radius: Math.sqrt(countries[i].gdp_pc) * 500
//  }).bindPopup(`<h1>${countries[i].name}</h1> <hr> <h3>GDP Per Capita (USD): ${countries[i].gdp_pc}</h3>`).addTo(myMap);
//}



//// An array containing each city's name, location, and population
//let cities = [{
//  location: [40.7128, -74.0059],
//  name: "New York",
//  population: 8550405
//},
//{
//  location: [41.8781, -87.6298],
//  name: "Chicago",
//  population: 2720546
//},
//{
//  location: [29.7604, -95.3698],
//  name: "Houston",
//  population: 2296224
//},
//{
//  location: [34.0522, -118.2437],
//  name: "Los Angeles",
//  population: 3971883
//},
//{
//  location: [41.2524, -95.9980],
//  name: "Omaha",
//  population: 446599
//}
//];
//
//// Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
//for (let i = 0; i < cities.length; i++) {
//  let city = cities[i];
//  L.marker(city.location)
//    .bindPopup(`<h1>${city.name}</h1> <hr> <h3>Population ${city.population.toLocaleString()}</h3>`)
//    .addTo(myMap);
//}
