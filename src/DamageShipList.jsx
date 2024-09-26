import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const damagedShips = [
  { id: 1, name: 'Ship 41234', condition: 'Minor Damage', origin: 'Chennai', destination: 'Port Blair', arrivalTime: '2024-09-20 14:00' },
  { id: 2, name: 'Ship 54421', condition: 'Severe Damage', origin: 'Kolkata', destination: 'Mumbai', arrivalTime: '2024-09-21 09:30' },
  { id: 3, name: 'Ship 76012', condition: 'Total Loss', origin: 'Goa', destination: 'Chennai', arrivalTime: '2024-09-22 16:45' },
  { id: 4, name: 'Ship 87530', condition: 'Minor Damage', origin: 'Mumbai', destination: 'Kolkata', arrivalTime: '2024-09-23 11:15' },
  { id: 5, name: 'Ship 78523', condition: 'Severe Damage', origin: 'Cochin', destination: 'Lakshadweep', arrivalTime: '2024-09-24 08:20' },
    { id: 6, name: 'Ship 81254', condition: 'Total Loss', origin: 'Chennai', destination: 'Dubai', arrivalTime: '2024-09-25 05:50' },
  { id: 7, name: 'Ship 25345', condition: 'Minor Damage', origin: 'Visakhapatnam', destination: 'Kolkata', arrivalTime: '2024-09-26 10:30' },
  { id: 8, name: 'Ship 62134', condition: 'Severe Damage', origin: 'Mumbai', destination: 'Cochin', arrivalTime: '2024-09-27 15:00' },
  { id: 9, name: 'Ship 52345', condition: 'Total Loss', origin: 'Port Blair', destination: 'Andaman Islands', arrivalTime: '2024-09-28 12:00' },
  { id: 10, name: 'Ship 41213', condition: 'Minor Damage', origin: 'Kolkata', destination: 'Chennai', arrivalTime: '2024-09-29 13:15' },
  { id: 11, name: 'Ship 57809', condition: 'Moderate Damage', origin: 'Ahmedabad', destination: 'Surat', arrivalTime: '2024-09-30 09:00' },
  { id: 12, name: 'Ship 65820', condition: 'Minor Damage', origin: 'Pune', destination: 'Goa', arrivalTime: '2024-09-30 17:30' },
  { id: 13, name: 'Ship 57230', condition: 'Severe Damage', origin: 'Mumbai', destination: 'Navi Mumbai', arrivalTime: '2024-09-30 11:00' },
  { id: 14, name: 'Ship 28340', condition: 'Total Loss', origin: 'Chennai', destination: 'Kolkata', arrivalTime: '2024-09-30 16:00' },
];


const DamagedShipList = () => {
  const conditionData = [
    { name: 'Minor Damage', value: damagedShips.filter(ship => ship.condition === 'Minor Damage').length },
    { name: 'Moderate Damage', value: damagedShips.filter(ship => ship.condition === 'Moderate Damage').length },
    { name: 'Severe Damage', value: damagedShips.filter(ship => ship.condition === 'Severe Damage').length },
    { name: 'Total Loss', value: damagedShips.filter(ship => ship.condition === 'Total Loss').length },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="flex-grow overflow-auto w-full px-4 py-6">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Damaged Ships</h1>

        <div className="mb-8 w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Damage Condition Overview</h2>
          <div className="w-full" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conditionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {conditionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <ul className="space-y-4 w-full">
          {damagedShips.map((ship) => (
            <li key={ship.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col mb-2 sm:mb-0">
                <span className="text-xl font-semibold text-gray-800">{ship.name} - {ship.condition}</span>
                <span className="text-gray-600 mt-1">
                  From: {ship.origin} To: {ship.destination}
                </span>
                <span className="text-gray-600">
                  Arrival: {ship.arrivalTime}
                </span>
              </div>
              <Link to="/" className="mt-2 sm:mt-0">
                <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300">View on Map</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 w-full">
        <Link to="/" className="block w-full">
          <button className="w-full bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition-colors duration-300">Back to Map</button>
        </Link>
      </div>
    </div>
  );
};

export default DamagedShipList;
