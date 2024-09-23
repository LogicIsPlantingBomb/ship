import React from 'react';

function SatelliteImages() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Satellite Images of Oil Spills</h1>
      <p>Here you can display the satellite images related to the oil spills.</p>
      {/* You can add image elements or other components here to display the satellite images */}
      <img src="path_to_your_satellite_image.jpg" alt="Satellite Image" className="w-full h-auto" />
    </div>
  );
}

export default SatelliteImages;

