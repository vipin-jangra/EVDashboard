import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, Title, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(Tooltip, Legend, Title, LineElement, PointElement, LinearScale, CategoryScale);

const BatteryRangeChart = ({ evData = [] }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure evData is defined and is an array
    if (!Array.isArray(evData)) {
      console.error('evData is not an array:', evData);
      setLoading(false);
      return;
    }

    // If evData is an empty array, set loading to false
    if (evData.length === 0) {
      setLoading(false);
      return;
    }

    const batteryData = evData.map(vehicle => ({
      range: parseInt(vehicle["Electric Range"], 10) || 0,
      year: vehicle["Model Year"],
      make: vehicle["Make"],
    }));

    // Prepare data for the line chart
    const years = [...new Set(batteryData.map(vehicle => vehicle.year))].sort();

    const maxRangesPerYear = years.map(year => {
      const rangesForYear = batteryData.filter(vehicle => vehicle.year === year);
      if (rangesForYear.length === 0) return { year, maxRange: 0, makes: [] };

      const maxRange = Math.max(...rangesForYear.map(vehicle => vehicle.range));
      const makes = [...new Set(rangesForYear
        .filter(vehicle => vehicle.range === maxRange)
        .map(vehicle => vehicle.make))];

      return { year, maxRange, makes };
    });

    // Create datasets based on max ranges
    const datasets = [];
    maxRangesPerYear.forEach(({ year, maxRange, makes }) => {
      makes.forEach(make => {
        const existingDataset = datasets.find(dataset => dataset.label === make);
        if (existingDataset) {
          existingDataset.data.push(maxRange); // Add maxRange to existing make dataset
        } else {
          datasets.push({
            label: make,
            data: years.map(y => (y === year ? maxRange : 0)), // Only show max range for the corresponding year
            borderColor: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color for each make
            fill: false,
            tension: 0.1,
          });
        }
      });
    });

    const data = {
      labels: years,
      datasets: datasets,
    };

    setChartData(data);
    setLoading(false);
  }, [evData]);

  // Render loading state
  if (loading) {
    return <div className="text-center">Loading data, please wait...</div>;
  }

  // Render chart
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="mt-4">
        <Line
          id="batteryRange"
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw} miles`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Max Battery Range (miles)',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Model Year',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BatteryRangeChart;
