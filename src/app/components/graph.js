import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const InvestmentGraph = ({graphDatas}) => {
  const chartRef = useRef(null);
  
  const labels = graphDatas.map((data) => data.year);
  const principalData = graphDatas.map((data) => parseFloat(data.principal));

  useEffect(() => {
    // Create a new chart instance
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Principal",
            data: principalData,
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          }
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

export default InvestmentGraph;
