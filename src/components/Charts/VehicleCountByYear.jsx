import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VehicleCountByYear = ({ data }) => {
  const minYear = 2011; 

 
  const filteredData = data.filter(vehicle => {
    const year = vehicle["Model Year"];
    return year && year >= minYear; 
  });

  const vehicleCountByYear = filteredData.reduce((acc, vehicle) => {
    const year = vehicle["Model Year"];
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  
  const labels = Object.keys(vehicleCountByYear).sort(); 
  const counts = labels.map(year => vehicleCountByYear[year]); 


  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Number of Vehicles',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full h-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default VehicleCountByYear;
