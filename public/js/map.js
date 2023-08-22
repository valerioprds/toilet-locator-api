mapboxgl.accessToken =
	"pk.eyJ1IjoidmFsZXJpb3ByZHMiLCJhIjoiY2xsaTM4MjFnMWlqMzNrcWh0d3J5aDNrZSJ9.p24UkToBjTKbmbq0MYedBQ";
const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/streets-v11",
	zoom: 14.5,
	center: [2.1699341966931276, 41.38730104377958],
});

// fetch toilets from API

async function getToilets() {
	const res = await fetch("/api/v1/toilets");
	const data = await res.json();

	const toilets = data.data.map((toilet) => {
		return {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [
					toilet.location.coordinates[0],
					toilet.location.coordinates[1],
				],
			},
			properties: {
				toiletId: toilet.toiletId,
				icon: "toilet",
			},
		};
	});

	loadMap(toilets);
}

// load map with toilets
function loadMap(toilets) {
	map.on("load", function () {
		map.addLayer({
			id: "points",
			type: "symbol",
			source: {
				type: "geojson",
				data: {
					type: "FeatureCollection",
					features: toilets,
				},
			},
			layout: {
				"icon-image": "{icon}-15",
				"icon-size": 2,
				"text-field": "{toiletId}",
				"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
				"text-offset": [0, 0.9],
				"text-anchor": "top",
			},
		});
	});
}

getToilets();
