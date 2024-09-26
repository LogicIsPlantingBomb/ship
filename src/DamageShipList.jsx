import React from 'react';
import { Link } from 'react-router-dom';

const damagedShips = [
  { id: 1, name: 'Ship A', condition: 'Minor Damage', origin: 'Chennai', destination: 'Port Blair', arrivalTime: '2024-09-20 14:00' },
  { id: 2, name: 'Ship B', condition: 'Severe Damage', origin: 'Kolkata', destination: 'Mumbai', arrivalTime: '2024-09-21 09:30' },
  { id: 3, name: 'Ship C', condition: 'Total Loss', origin: 'Goa', destination: 'Chennai', arrivalTime: '2024-09-22 16:45' },
  { id: 4, name: 'Ship D', condition: 'Minor Damage', origin: 'Mumbai', destination: 'Kolkata', arrivalTime: '2024-09-23 11:15' },
  { id: 5, name: 'Ship E', condition: 'Severe Damage', origin: 'Cochin', destination: 'Lakshadweep', arrivalTime: '2024-09-24 08:20' },
  { id: 6, name: 'Ship F', condition: 'Total Loss', origin: 'Chennai', destination: 'Dubai', arrivalTime: '2024-09-25 05:50' },
  { id: 7, name: 'Ship G', condition: 'Minor Damage', origin: 'Visakhapatnam', destination: 'Kolkata', arrivalTime: '2024-09-26 10:30' },
  { id: 8, name: 'Ship H', condition: 'Severe Damage', origin: 'Mumbai', destination: 'Cochin', arrivalTime: '2024-09-27 15:00' },
  { id: 9, name: 'Ship I', condition: 'Total Loss', origin: 'Port Blair', destination: 'Andaman Islands', arrivalTime: '2024-09-28 12:00' },
  { id: 10, name: 'Ship J', condition: 'Minor Damage', origin: 'Kolkata', destination: 'Chennai', arrivalTime: '2024-09-29 13:15' },
  { id: 11, name: 'Ship K', condition: 'Moderate Damage', origin: 'Ahmedabad', destination: 'Surat', arrivalTime: '2024-09-30 09:00' },
  { id: 12, name: 'Ship L', condition: 'Minor Damage', origin: 'Pune', destination: 'Goa', arrivalTime: '2024-09-30 17:30' },
  { id: 13, name: 'Ship M', condition: 'Severe Damage', origin: 'Mumbai', destination: 'Navi Mumbai', arrivalTime: '2024-09-30 11:00' },
  { id: 14, name: 'Ship N', condition: 'Total Loss', origin: 'Chennai', destination: 'Kolkata', arrivalTime: '2024-09-30 16:00' },
];

const DamagedShipList = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Damaged Ships</h1>
      <ul className="space-y-2">
        {damagedShips.map(ship => (
          <li key={ship.id} className="flex justify-between items-center bg-gray-200 p-2 rounded">
            <span>{ship.name} - {ship.condition}</span>
            <span className="text-gray-600">
              From: {ship.origin} To: {ship.destination} Arrival: {ship.arrivalTime}
            </span>
            <Link to="/">
              <button className="bg-blue-500 text-white px-2 py-1 rounded">View on Map</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/">
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Back to Map</button>
      </Link>
    </div>
  );
};

export default DamagedShipList;

