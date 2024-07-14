import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const TransactionGraph = ({ transactions , selectedCustomer }) => {
  const groupedByDate = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += transaction.amount;
    return acc;
  }, {});

  const dates = Object.keys(groupedByDate);
  const amounts = Object.values(groupedByDate);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Transaction Amount',
        data: amounts,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  return (
    <div className='mt-7'>
      <h2 className='my-4 text-lg font-semibold'>Transactions for {selectedCustomer.name}</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TransactionGraph;