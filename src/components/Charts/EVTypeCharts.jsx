import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const EVTypeChart = ({ evData }) => {
  const evTypeCounts = evData.reduce((acc, vehicle) => {
    const type = vehicle["Electric Vehicle Type"];
    if (type) {
      acc[type] = (acc[type] || 0) + 1;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(evTypeCounts),
    datasets: [
      {
        data: Object.values(evTypeCounts),
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    return () => {
      ChartJS.getChart('evTypeChart')?.destroy();
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2 lg:w-2/3">
      <h2 className="text-xl font-bold mb-4 text-center">Electric Vehicle Types</h2>
      <div className="relative w-full h-64 sm:h-80 md:h-96">
        <Pie id="evTypeChart" data={data} options={options} />
      </div>
    </div>
  );
};

export default EVTypeChart;
