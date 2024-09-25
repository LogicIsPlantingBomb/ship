import React from 'react';
import { Link } from 'react-router-dom';
import ShipDamageModel from './ShipDamageModel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const ShipDetails = () => {
  // Hardcoded ship data
  const shipData = {
    name: 'SS Example',
    totalLoad: '50,000 tons',
    currentLoad: '45,000 tons',
    damageComponents: ['Minor hull damage on starboard side'],
    alternateRoutes: [
      {
        description: 'Detour around storm system',
        date: '2024-09-15',
        nearOilSpill: false
      },
      {
        description: 'Route adjustment due to port congestion',
        date: '2024-09-18',
        nearOilSpill: true
      }
    ],
    currentStatus: 'En route to Port Blair',
    estimatedArrival: '2024-09-27 14:00 UTC'
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ship Details: {shipData.name}</h1>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <p className="font-bold">Total Load Capacity:</p>
          <p>{shipData.totalLoad}</p>
        </div>
        
        <div className="mb-4">
          <p className="font-bold">Current Load:</p>
          <p>{shipData.currentLoad}</p>
        </div>
        
        <div className="mb-4">
          <p className="font-bold">Damage Components:</p>
          {shipData.damageComponents.length > 0 ? (
            <ul className="list-disc pl-5">
              {shipData.damageComponents.map((damage, index) => (
                <li key={index}>{damage}</li>
              ))}
            </ul>
          ) : (
            <p>No damage reported</p>
          )}
        </div>
        
        <div className="mb-4">
          <p className="font-bold">Alternate Routes Taken:</p>
          {shipData.alternateRoutes.length > 0 ? (
            <ul className="list-disc pl-5">
              {shipData.alternateRoutes.map((route, index) => (
                <li key={index} className={route.nearOilSpill ? 'text-red-500' : ''}>
                  {route.description} (Date: {route.date})
                  {route.nearOilSpill && ' - Near oil spill area'}
                </li>
              ))}
            </ul>
          ) : (
            <p>No alternate routes taken</p>
          )}
        </div>
        
        <div className="mb-4">
          <p className="font-bold">Current Status:</p>
          <p>{shipData.currentStatus}</p>
        </div>
        
        <div className="mb-4">
          <p className="font-bold">Estimated Arrival:</p>
          <p>{shipData.estimatedArrival}</p>
        </div>
      </div>

      {/* Satellite Monitoring Video or Thermal Map */}
      <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">Satellite Monitoring (Thermal View)</h2>

        {/* Simulating Thermal View */}
        <div className="thermal-container">
          <video className="thermal-video w-full rounded shadow-md" controls>
            <source src="/path-to-your-video/satellite-monitoring.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <Link to="/">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Back to Map</button>
      </Link>
	  <div>
      <Link to="/ShipDamageModel">
        <button  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">View Damage</button>
      </Link>
    </div>
    </div>
  );
};

export default ShipDetails;

