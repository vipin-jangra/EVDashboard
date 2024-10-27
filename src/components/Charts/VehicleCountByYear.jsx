import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VehicleCountByYear = ({ data }) => {
  const minYear = 2011; // Set minimum year

  // Prepare data for the bar chart
  const filteredData = data.filter(vehicle => {
    const year = vehicle["Model Year"];
    return year && year >= minYear; // Filter out vehicles without a Model Year and those before minYear
  });

  const vehicleCountByYear = filteredData.reduce((acc, vehicle) => {
    const year = vehicle["Model Year"];
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // Create arrays for labels and counts
  const labels = Object.keys(vehicleCountByYear).sort(); // Sort labels to ensure correct year order
  const counts = labels.map(year => vehicleCountByYear[year]); // Align counts with sorted labels

  // Find max number of vehicles and corresponding year
  const maxCount = Math.max(...counts);
  const maxYear = labels[counts.indexOf(maxCount)];

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
          display: false, // Disable grid lines for the x-axis
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
