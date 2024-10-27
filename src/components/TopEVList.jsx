import React, { useEffect, useState } from 'react';

const TopEVList = ({ evData = [] }) => {
  const [topVehicles, setTopVehicles] = useState([]);

  useEffect(() => {
    if (!Array.isArray(evData) || evData.length === 0) return;


    const vehicleRanges = evData.map(vehicle => ({
      make: vehicle.Make,
      model: vehicle.Model,
      range: parseInt(vehicle["Electric Range"], 10) || 0,
      year: parseInt(vehicle["Model Year"]),
    }));

    console.log(vehicleRanges)

    const rangeMap = {};

    vehicleRanges.forEach(({ make, model, range }) => {
      const key = `${make} ${model}`;
      if (!rangeMap[key] || rangeMap[key].range < range) {
        rangeMap[key] = { make, model, range };
      }
    });

    
    const sortedVehicles = Object.values(rangeMap)
      .sort((a, b) => b.range - a.range)
      .slice(0, 10); 
    setTopVehicles(sortedVehicles);
  }, [evData]);

  return (
    <div className="p-6 relative bg-white rounded-lg shadow-lg max-h-64 overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Top 10 EVs for Range</h2>
      <ul className="space-y-3">
        {topVehicles.map((vehicle, index) => (
            <React.Fragment key={index}>
            <li className="flex">
              <div>
                <p className="text-sm">{`${vehicle.make} ${vehicle.model}`}</p>
                <p className="text-xs text-gray-600">{`Max Range: ${vehicle.range} miles`}</p>
              </div>
            </li>
            <hr className="my-2" />
          </React.Fragment>
          
        ))}
      </ul>
    </div>
  );
};

export default TopEVList;
