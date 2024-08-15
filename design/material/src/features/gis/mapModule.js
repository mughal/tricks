import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export function addMap(citiesData) {
    const mapContainer = document.createElement('div');
    mapContainer.style.height = '100%';
    mapContainer.style.width = '100%';

    const map = L.map(mapContainer).setView([30.3753, 69.3451], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    citiesData.forEach(city => {
        const marker = L.marker([city.lat, city.lng]).addTo(map);
        marker.bindPopup(`<b>${city.name}</b><br>Devices: ${city.devices}`).openPopup();
    });

    return mapContainer;
}
