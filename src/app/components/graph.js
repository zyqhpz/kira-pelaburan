// pages/index.js

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const IndexPage = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Create a new chart instance
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Line 1",
            data: [12, 19, 3, 5, 2],
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
          {
            label: "Line 2",
            data: [5, 7, 2, 8, 10],
            fill: false,
            borderColor: "rgba(255, 99, 132, 1)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup chart on component unmount
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <h1>Chart.js Double Line Chart in Next.js</h1>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default IndexPage;
