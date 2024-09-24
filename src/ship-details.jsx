// src/ship-details.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

function ShipDetails() {
  const { shipId } = useParams();  // Get the ship ID from the URL params

  // Placeholder ship details data (You can replace this with actual data)
  const shipsData = {
    1: { name: 'Ship 1', status: 'In transit', speed: '25 knots', lastPort: 'Mumbai', nextPort: 'Sri Lanka' },
    2: { name: 'Ship 2', status: 'Docked', speed: '0 knots', lastPort: 'Chennai', nextPort: 'Port Blair' },
    3: { name: 'Ship 3', status: 'In transit', speed: '30 knots', lastPort: 'Port Blair', nextPort: 'Thailand' },
    4: { name: 'Ship 4', status: 'In transit', speed: '28 knots', lastPort: 'Thailand', nextPort: 'Port Blair' },
    5: { name: 'Ship 5', status: 'In transit', speed: '22 knots', lastPort: 'Kolkata', nextPort: 'Myanmar' },
    6: { name: 'Ship 6', status: 'In transit', speed: '24 knots', lastPort: 'Pune', nextPort: 'Malaysia' },
    7: { name: 'Ship 7', status: 'In transit', speed: '27 knots', lastPort: 'Nigeria', nextPort: 'India' }
  };

  const shipDetails = shipsData[shipId];

  return (
    <div className="p-4">
      {shipDetails ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{shipDetails.name} Details</h1>
          <p><strong>Status:</strong> {shipDetails.status}</p>
          <p><strong>Speed:</strong> {shipDetails.speed}</p>
          <p><strong>Last Port:</strong> {shipDetails.lastPort}</p>
          <p><strong>Next Port:</strong> {shipDetails.nextPort}</p>
        </div>
      ) : (
        <p>Ship details not found for ID {shipId}</p>
      )}
      <br />
      <a href="/" className="text-blue-500">Go back to map</a>
    </div>
  );
}

export default ShipDetails;

