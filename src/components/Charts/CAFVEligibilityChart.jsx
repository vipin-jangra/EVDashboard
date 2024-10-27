import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CAFVPieChart = ({ data }) => {
  // Prepare data for the chart
  const eligibilityCounts = {
    eligible: 0,
    notEligible: 0,
    unknown: 0,
  };

  // Count the eligibility status
  data.forEach((item) => {
    const status = item['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
    
    // Check if status is defined and is a string
    if (typeof status === 'string') {
      if (status.includes('Eligible')) {
        eligibilityCounts.eligible++;
      } else if (status.includes('not been researched') || status.includes('unknown')) {
        eligibilityCounts.unknown++;
      } else {
        eligibilityCounts.notEligible++;
      }
    } else {
      // Handle undefined or non-string statuses (if necessary)
      eligibilityCounts.unknown++; // You might want to count them as unknown
    }
  });

  const chartData = {
    labels: ['Eligible', 'Not Eligible', 'Unknown'],
    datasets: [
      {
        label: 'CAFV Eligibility Status',
        data: [
          eligibilityCounts.eligible,
          eligibilityCounts.notEligible,
          eligibilityCounts.unknown,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'CAFV Eligibility Status',
      },
    },
  };

  return <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <Pie data={chartData} options={options} />
        </div>;
};

export default CAFVPieChart;
