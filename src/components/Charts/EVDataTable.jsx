import React, { useState } from 'react';

const EVDataTable = ({ data }) => {
  const [filterText, setFilterText] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const [loadingRows, setLoadingRows] = useState({}); // State for loading indicators

  // Group vehicles by Make, ensuring Make is defined
  const groupedData = data.reduce((acc, vehicle) => {
    const make = vehicle.Make;
    if (make) { // Only include vehicles with a valid Make
      if (!acc[make]) {
        acc[make] = [];
      }
      acc[make].push(vehicle);
    }
    return acc;
  }, {});

  const handleToggle = (make) => {
    // If the row is already expanded, close it; otherwise, open it
    setExpandedRows((prev) => ({
      ...prev,
      [make]: !prev[make],
    }));

    // Set loading state for this make
    setLoadingRows((prev) => ({
      ...prev,
      [make]: true,
    }));

    // Simulate a data fetching delay (e.g., for demonstration purposes)
    setTimeout(() => {
      setLoadingRows((prev) => ({
        ...prev,
        [make]: false,
      }));
    }, 1000); // Adjust the time as needed
  };

  const filteredGroupedData = Object.entries(groupedData).filter(([make]) =>
    make.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="overflow-x-auto p-4">
      <input
        type="text"
        placeholder="Search by Make..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="overflow-x-auto max-h-72"> {/* Make outer table scrollable */}
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Make</th>
              <th className="border px-4 py-2">Model Count</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroupedData.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-4">No Results Found</td>
              </tr>
            ) : (
              filteredGroupedData.map(([make, vehicles]) => (
                <React.Fragment key={make}>
                  <tr onClick={() => handleToggle(make)} className="cursor-pointer">
                    <td className="border px-4 py-2 flex items-center">
                      {/* Arrow indicator */}
                      {expandedRows[make] ? (
                        <span className="mr-2">&#9650;</span> // Up Arrow
                      ) : (
                        <span className="mr-2">&#9660;</span> // Down Arrow
                      )}
                      {make}
                    </td>
                    <td className="border px-4 py-2">{vehicles.length}</td>
                  </tr>
                  {expandedRows[make] && (
                    <tr>
                      <td colSpan={2}>
                        <div className="overflow-y-auto max-h-64 border-t">
                          {loadingRows[make] ? (
                            <div className="text-center py-4">Loading...</div> // Loading state
                          ) : (
                            <table className="min-w-full border border-gray-300">
                              <thead>
                                <tr className="bg-gray-200">
                                  <th className="border px-4 py-2">VIN</th>
                                  <th className="border px-4 py-2">County</th>
                                  <th className="border px-4 py-2">Model Year</th>
                                  <th className="border px-4 py-2">Model</th>
                                  <th className="border px-4 py-2">Electric Range</th>
                                </tr>
                              </thead>
                              <tbody>
                                {vehicles.map((vehicle, index) => {
                                  // Check if vehicle is defined and has necessary fields
                                  if (vehicle && vehicle['VIN (1-10)'] && vehicle.County) {
                                    return (
                                      <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="border px-4 py-2">{vehicle['VIN (1-10)']}</td>
                                        <td className="border px-4 py-2">{vehicle.County}</td>
                                        <td className="border px-4 py-2">{vehicle["Model Year"]}</td>
                                        <td className="border px-4 py-2">{vehicle.Model}</td>
                                        <td className="border px-4 py-2">{vehicle["Electric Range"]}</td>
                                      </tr>
                                    );
                                  }
                                  return null; // If vehicle is not valid, return null
                                })}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EVDataTable;
