mapboxgl.accessToken = 'pk.eyJ1Ijoib3dlbmluZXNvbiIsImEiOiJjbGhjbHpubGIxMnZ0M2RxZnY2YWg1a2V6In0.x18e-QSkddzixrAA0L9EPQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-2.2433625, 53.4785294], // starting position [lng, lat]
    zoom: 11 // starting zoom
});

map.on('load', () => {
    map.addSource('bridges', {
        type: 'geojson',
        data: 'bridges.geojson'
    });

    map.addLayer({
        'id': 'bridges',
        'type': 'line',
        'source': 'bridges',
        'paint': {
            'line-color': '#c23232',
            'line-width': 4
        },
    });

    map.on('click', 'bridges', (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties['@id'];
         
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
         
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
        });
         
        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'bridges', () => {
        map.getCanvas().style.cursor = 'pointer';
        });
         
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'bridges', () => {
        map.getCanvas().style.cursor = '';
        });
})