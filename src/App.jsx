import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, Polygon, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SatelliteImages from './satellite-images';
import ShipDetails from './ShipDetails';
import ShipDamageModel from './ShipDamageModel';
import DamageShipList from './DamageShipList'; // Import DamagedShipList

function App() {
  const shipRoute = [
    [13.0827, 80.2707], // Chennai
    [12.5, 82.5],       // Ocean waypoint 1
    [11.5, 85.0],       // Ocean waypoint 2
    [11.6234, 92.7265], // Port Blair
  ];

  const [currentPosition, setCurrentPosition] = useState(shipRoute[0]);
  const [movingForward, setMovingForward] = useState(true);
  const totalTime = 500000;  // Time to travel the route in milliseconds
  const updateInterval = 200; // Update position every 200 ms
  const numberOfSteps = Math.floor(totalTime / updateInterval);
  const stepsPerSegment = numberOfSteps / (shipRoute.length - 1);  // Steps per segment

  const interpolate = (start, end, progress) => {
    return [
      start[0] + (end[0] - start[0]) * progress,
      start[1] + (end[1] - start[1]) * progress,
    ];
  };

  useEffect(() => {
    let step = 0;

    const moveShip = () => {
      const route = movingForward ? shipRoute : shipRoute.slice().reverse();
      const segmentIndex = Math.floor(step / stepsPerSegment);
      const progressInSegment = (step % stepsPerSegment) / stepsPerSegment;

      if (segmentIndex < route.length - 1) {
        const start = route[segmentIndex];
        const end = route[segmentIndex + 1];

        const position = interpolate(start, end, progressInSegment);

        setCurrentPosition(position);
        step++;

        setTimeout(moveShip, updateInterval);
      } else {
        setMovingForward(!movingForward);
        step = 0;
        moveShip();
      }
    };

    moveShip();

    return () => clearTimeout(moveShip);
  }, [movingForward]);

  const oilSpillAreas = [
    [
      [12.5, 81.0],
      [12.7, 81.6],
      [12.65, 81.55],
      [12.60, 81.45],
      [12.58, 81.25],
      [12.55, 81.1],
    ],
    [
      [11.2, 92.0],
      [11.4, 92.35],
      [11.35, 92.3],
      [11.3, 92.15],
      [11.22, 92.1],
      [11.1, 92.08],
    ],
  ];

  const shipCondition = {
    status: 'Condition in Good but some damages',
    oilLeakage: 'oil leakage detected',
    damage: 'damage reported',
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <nav className="bg-gradient-to-r from-zinc-900 to-indigo-600 p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img src="https://img.freepik.com/free-vector/hand-drawn-illustrated-container-ship_23-2149163917.jpg?t=st=1727358102~exp=1727361702~hmac=2f0bfba2bebc16668a38b77787aa06fd675c0c28b0eb2b897c45944f11c88729&w=826" alt="Logo" className="h-8 w-8 mr-2" />
              <span className="text-white text-2xl font-bold">Ship Tracker</span>
            </div>
            <div className="space-x-4">
              <Link to="/" className="text-white hover:text-gray-300 focus:text-gray-300 transition">Home</Link>
              <Link to="/satellite-images" className="text-white hover:text-gray-300 focus:text-gray-300 transition">Satellite Images</Link>
              <Link to="/damaged-ships" className="text-white hover:text-gray-300 focus:text-gray-300 transition">Damaged Ships</Link>
            </div>
          </div>
        </nav>

        <div className="flex-1 flex justify-center items-center">
          <Routes>
            <Route 
              path="/" 
              element={
                <MapContainer center={[11.5, 82.5]} zoom={5} style={{ height: "90vh", width: "100%", border: '2px solid black' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />

                  <Polyline positions={shipRoute} color="blue" dashArray="4" weight={3} />

                  <CircleMarker 
                    center={currentPosition} 
                    radius={6} 
                    color="red" 
                    fillColor="red" 
                    fillOpacity={1}
                  >
                    <Popup>
                      Current Ship Position
                      <br />
                      Status: {shipCondition.status}
                      <br />
                      Oil Leakage: {shipCondition.oilLeakage}
                      <br />
                      Damage: {shipCondition.damage}
                      <br />
                      <Link to="/ship-details">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded mt-2">View Details</button>
                      </Link>
                    </Popup>
                  </CircleMarker>

                  <Marker position={[13.0827, 80.2707]}>
                    <Popup>Chennai</Popup>
                  </Marker>
                  <Marker position={[11.6234, 92.7265]}>
                    <Popup>Port Blair</Popup>
                  </Marker>

                  {oilSpillAreas.map((spill, index) => (
                    <Polygon key={index} positions={spill} color="darkgrey" fillColor="darkgrey" fillOpacity={0.5} />
                  ))}
                </MapContainer>
              } 
            />
            <Route path="/satellite-images" element={<SatelliteImages />} />
            <Route path="/ship-details" element={<ShipDetails />} />
            <Route path="/ShipDamageModel" element={<ShipDamageModel />} />
            <Route path="/damaged-ships" element={<DamageShipList />} /> {/* DamagedShipList route */}
          </Routes>
        </div>

        <div className="p-4 flex justify-center space-x-4">
          <Link to="/satellite-images">
            <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition">View Satellite Images</button>
          </Link>
          <Link to="/damaged-ships">
            <button className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition">View Damaged Ships</button> {/* New button */}
          </Link>
        </div>
      </div>
    </Router>
  );
}

export default App;

