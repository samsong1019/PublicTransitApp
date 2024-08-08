import React from 'react'; 
import { MapContainer, TileLayer, Marker, Popup, TileLayer } from 'react-leaflet'; // react-leaflet components
import 'leaflet/dist/leaflet.css'; //Importing the Leaflet css file for styling
import L from 'leaflet'; //map functionality

// delete dafault icon urls to avoid loading issues
delete L.Icon.Default.prototype._getIconUrl;

//custom icon urls (can change later)
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


//MapComponent function
const MapComponent = ({ center, stations }) => {
    return (
        <MapContainer center = {center} zoom = {13} style = {{ height: "100vh", width: "100%" }}>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //OSM tiles url
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // attribution for OSM
            />  
            {stations.map((station, index) => (
                <Marker key={index} position={station.position}> //places a marker for each station
                    <Popup>{station.name}</Popup> //Popup to display station name
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent; 