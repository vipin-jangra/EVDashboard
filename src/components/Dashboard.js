import { useCSVData } from '../context/CSVDataContext';
import { useState } from 'react';
import EVStats from './Stats/EVStats';
import VehicleCountByYear from './Charts/VehicleCountByYear';
import TopEVList from './TopEVList';
import EVMap from './Charts/EVMap';
import EVDataTable from './Charts/EVDataTable';

const Dashboard = () => {
  const { data, loading, error } = useCSVData();
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');

  if (loading) {
    return <div className="text-center">Loading please wait...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  
  const years = Array.from(new Set(data.map(item => item["Model Year"]))).sort();
  const makes = Array.from(new Set(data.map(item => item.Make))).sort();

  
  const filteredData = data.filter(item => {
    const matchesYear = selectedYear ? item["Model Year"] === selectedYear : true;
    const matchesMake = selectedMake ? item.Make === selectedMake : true;
    return matchesYear && matchesMake;
  });

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-4">EV Dashboard</h1>

      
      <div className="mb-4 absolute right-4 top-4 flex gap-2">
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          id="make-select"
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Makes</option>
          {makes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
      </div>

      <EVStats data={filteredData} />

      <div className="flex flex-wrap -mx-2 mt-2 gap-4">
       
        <div className="flex-1 min-w-full md:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.33%-1rem)] h-82 p-2">
          <VehicleCountByYear data={filteredData} />
        </div>

        
        <div className="flex-1 min-w-full md:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.33%-1rem)] p-2">
          <TopEVList evData={filteredData} />
        </div>
      </div>

      <div className="flex flex-wrap -mx-2 mt-2 gap-4">
        
        <div className="flex-1 min-w-full md:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.33%-1rem)] p-2">
          <EVMap locations={filteredData.map(item => item["Vehicle Location"]).filter(Boolean)} />
        </div>

        <div className='flex-1 min-w-full md:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.33%-1rem)] p-2'>
          <EVDataTable data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
