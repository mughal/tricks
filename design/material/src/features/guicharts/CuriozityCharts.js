import { BubbleController, PointElement,  Chart, DoughnutController, BarController, BarElement, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BubbleController, PointElement, DoughnutController, BarController, BarElement, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

// Access CSS variables
const rootStyles = getComputedStyle(document.documentElement);
const primaryColor1 = rootStyles.getPropertyValue('--color-primary1').trim();
const primaryColor2 = rootStyles.getPropertyValue('--color-primary2').trim();
const primaryColor3 = rootStyles.getPropertyValue('--color-primary3').trim();
const secondaryColor1 = rootStyles.getPropertyValue('--color-secondary1').trim();
const secondaryColor2 = rootStyles.getPropertyValue('--color-secondary2').trim();

const colorArray = [primaryColor1, primaryColor2, primaryColor3, secondaryColor1, secondaryColor2];

function graphColors(dataLength) {
  const barColors = [];
  let previousColorIndex = -1;
  
  for (let i = 0; i < dataLength; i++) {
      let colorIndex;
      
      // Ensure no two successive bars have the same color
      do {
          colorIndex = Math.floor(Math.random() * colorArray.length);
      } while (colorIndex === previousColorIndex);
      
      barColors.push(colorArray[colorIndex]);
      previousColorIndex = colorIndex;
  }
  
  return barColors;
}

// Function to create a Doughnut chart
export const createDoughnutChart = (data) => {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const total = values.reduce((acc, val) => acc + val, 0);
  const barColors = graphColors(values.length);
  const canvas = document.createElement('canvas');
  canvas.style.marginLeft = '10px'; // Adjust the value as needed
  const ctx = canvas.getContext('2d');

  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: barColors,
        borderColor: [
          primaryColor2,
          primaryColor2,
          primaryColor2,
          primaryColor2,
          primaryColor2,
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
  const barColors = graphColors(values.length);
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
        backgroundColor: barColors,
        borderColor: primaryColor1,
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
  const barColors = graphColors(values.length);
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
        backgroundColor: barColors,
        borderColor: primaryColor1,
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
  const bubbleColors = graphColors(data.length);
  const chart = new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [{
        label: 'Bubble Dataset',
        data: data, // data should be an array of objects like [{x: 20, y: 30, r: 15}, ...]
        backgroundColor: bubbleColors,
        borderColor: primaryColor1,
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
export const createStackedBarChart = (data) => {
  const labels = Object.keys(data); // Labels for the sites
  const totalDevices = Object.values(data).map(site => site.total);
  const visibleToday = Object.values(data).map(site => site.visibleToday);
  const appearedToday = Object.values(data).map(site => site.appearedToday);

  const notVisibleToday = totalDevices.map((t, i) => t - visibleToday[i]);
  const olderVisibleDevices = visibleToday.map((v, i) => v - appearedToday[i]);
  const newDevicesToday = appearedToday;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [
              {
                  label: 'New',
                  data: appearedToday,
                  backgroundColor: 'rgba(255, 99, 132, 0.8)', // Color for appeared today
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1
              },
              {
                  label: 'Active',
                  //data: visibleToday.map((v, i) => v - appearedToday[i]),
                  data: olderVisibleDevices,
                  backgroundColor: 'rgba(54, 162, 235, 0.8)', // Color for visible today but not appeared today
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
              },
              {
                  label: 'Not Active',
                  //data: totalDevices.map((t, i) => t - visibleToday[i]),
                  data: notVisibleToday,
                  backgroundColor: 'rgba(75, 192, 192, 0.8)', // Color for not visible today
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
              }
          ]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              x: {
                  beginAtZero: true,
                  stacked: true // Stacked bars
              },
              y: {
                  beginAtZero: true,
                  stacked: true // Stacked bars
              }
          },
          plugins: {
              legend: {
                  position: 'top', // Position the legend at the top
                  labels: {
                      color: primaryColor2, // Legend text color
                      boxWidth: 20,     // Width of the color box
                      padding: 2,      // Padding around each legend item
                  }
              },
              tooltip: {
                  backgroundColor: '#3E2723', // Tooltip background color
                  titleColor: '#FFFFFF', // Tooltip title color
                  bodyColor: '#FFFFFF', // Tooltip body color
              },
              title: {
                  display: true,
                  text: 'Stacked',
                  color: primaryColor1, // Title text color
                  font: {
                      family: 'Arial, sans-serif', // Customize font family
                      size: 20, // Customize font size
                      weight: 'bold', // Customize font weight
                  },
                  padding: {
                      top: 0,
                      bottom: 5
                  },
              }
          },
          layout: {
              padding: {
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0
              }
          }
      }
  });

  return canvas;
};
