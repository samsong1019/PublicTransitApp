// import DropDown from './DropDown.jsx'
// import Footer from './Footer.jsx'
import React, { useState, useEffect } from 'react'; // hoooks for state and side effects
import axios from 'axios'; // http requests
import MapComponent from './MapComponent';

//main app components

const App = () => {
  //(latitude, longitude)
  const [currentPosition, setCurrentPosition] = useState([51.505, -0.09]); //default coordinates
  // holds list of nearby staions
  const [stations, setStations] = useState([]);

  //useEFFECT to get users current position on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords; //get lat and long
      setCurrentPosition([latitude, longitude]); //update stae with current positon
      fetchNearbyStations(latitude, longitude); // fetch nearby staions
    })
  }, []); //empty dependecy array means this runs once on mount

//function to fetch nearby stations using nominatim api
const fetchNearbyStations = async (lat, lon) => {
  const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
    params: {
      format: 'json', // request response in json format
      q: 'bus stop', //query for bus stops
      lat,// lat param
      lon, //long param
      radius: 5000 // 5000 km search radius
    }
  });

  //map response data to station objects
  const stationData = response.data.map(station => ({
    name: station.display_name,
    position: [station.lat, station.lon]
  }));
  setStations(stationData); // update with stations data
};

//render componet
return (
  <div>
    <h1>Public Transit App</h1>
    <MapComponent center={currentPosition} station={stations} />
  </div>
);

}; 



export default App
// function App() {
//   return(
//     <>
//     <DropDown/>
//     <Footer/>
//     </>
//   );
// }