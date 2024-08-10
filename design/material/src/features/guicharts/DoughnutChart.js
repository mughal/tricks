// src/DoughnutChart.js

import { Chart, DoughnutController, ArcElement, Tooltip, Legend, Title } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

const createDoughnutChart = (data) => {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const total = values.reduce((acc, val) => acc + val, 0);

  // Create container div and canvas element
  //const container = document.createElement('div');
  //container.classList.add('chart-container');
  const canvas = document.createElement('canvas');
  //container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              return `${label}: ${value}`;
            }
          }
        },
        title: {
          display: true,
          text: `Total: ${total}`
        }
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const elementIndex = elements[0].index;
          const label = labels[elementIndex];
          const value = values[elementIndex];
          alert(`Clicked on ${label}: ${value}`);
        }
      }
    }
  });

  return canvas;
};

export default createDoughnutChart;
