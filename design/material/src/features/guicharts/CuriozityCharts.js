import { BubbleController, PointElement,  Chart, DoughnutController, BarController, BarElement, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BubbleController, PointElement, DoughnutController, BarController, BarElement, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

// Function to create a Doughnut chart
export const createDoughnutChart = (data) => {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const total = values.reduce((acc, val) => acc + val, 0);

  const canvas = document.createElement('canvas');
  canvas.style.marginLeft = '10px'; // Adjust the value as needed
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

// Function to create a Bar chart
export const createBarChartH = (data) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const canvas = document.createElement('canvas');
  canvas.style.marginLeft = '10px'; // Adjust the value as needed
  const ctx = canvas.getContext('2d');

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Data Values',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y', 
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        }
      },
      plugins: {
        legend: {
          position: 'top',
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
          text: 'Bar Chart'
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

// Function to create a Bar chart
export const createBarChart = (data) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const canvas = document.createElement('canvas');
  canvas.style.marginLeft = '10px'; // Adjust the value as needed
  const ctx = canvas.getContext('2d');

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Data Values',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        }
      },
      plugins: {
        legend: {
          position: 'top',
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
          text: 'Bar Chart'
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

export const createBubbleChart = (data) => {
  const canvas = document.createElement('canvas');
  canvas.style.marginLeft = '10px'; // Adjust the value as needed
  const ctx = canvas.getContext('2d');

  const chart = new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [{
        label: 'Bubble Dataset',
        data: data, // data should be an array of objects like [{x: 20, y: 30, r: 15}, ...]
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.raw || {};
              return `${label}: X=${value.x}, Y=${value.y}, Radius=${value.r}`;
            }
          }
        },
        title: {
          display: true,
          text: 'Bubble Chart'
        }
      }
    }
  });

  return canvas;
};

export const createLineChart = (data) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const canvas = document.createElement('canvas');
  canvas.style.marginLeft = '10px'; // Adjust the value as needed
  const ctx = canvas.getContext('2d');

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Line Dataset',
        data: values,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
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
          text: 'Line Chart'
        }
      }
    }
  });

  return canvas;
};

export const createRadarChart = (data) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const canvas = document.createElement('canvas');
  canvas.style.marginLeft = '10px'; // Adjust the value as needed
  const ctx = canvas.getContext('2d');

  const chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Radar Dataset',
        data: values,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
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
          text: 'Radar Chart'
        }
      }
    }
  });

  return canvas;
};

export const createScatterChart = (data) => {
  const canvas = document.createElement('canvas');
  canvas.style.marginLeft = '10px'; // Adjust the value as needed
  const ctx = canvas.getContext('2d');

  const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Scatter Dataset',
        data: data, // data should be an array of objects like [{x: 20, y: 30}, ...]
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.raw || {};
              return `${label}: X=${value.x}, Y=${value.y}`;
            }
          }
        },
        title: {
          display: true,
          text: 'Scatter Chart'
        }
      }
    }
  });

  return canvas;
};

export const createMixedChart = (data) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const canvas = document.createElement('canvas');
  canvas.style.marginLeft = '10px'; // Adjust the value as needed
  const ctx = canvas.getContext('2d');

  const chart = new Chart(ctx, {
    data: {
      labels: labels,
      datasets: [
        {
          type: 'bar',
          label: 'Bar Dataset',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          type: 'line',
          label: 'Line Dataset',
          data: values,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.raw || 0;
              return `${label}: ${value}`;
            }
          }
        },
        title: {
          display: true,
          text: 'Mixed Chart'
        }
      }
    }
  });

  return canvas;
};

