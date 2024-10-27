import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const EVDistribution = ({ data }) => {
  
  const makeModelCounts = data.reduce((acc, item) => {
    const key = `${item.Make}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(makeModelCounts).map(([name, count]) => ({ name, count }));
  console.log(chartData)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EVDistribution;
