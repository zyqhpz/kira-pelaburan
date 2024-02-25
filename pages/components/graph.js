import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const InvestmentGraph = ({ investmentDatas, totalContributionDatas }) => {
  const chartRef = useRef(null);

  const [labels, setLabels] = useState(null); 
  const [principalData, setPrincipalData] = useState(null);
  const [totalContributionData, setTotalContributionData] = useState(null);

  useEffect(() => {

    if (investmentDatas.length === 0) {
      return;
    } else {
      setLabels(investmentDatas.map((data) => data.year));
      setPrincipalData(investmentDatas.map((data) =>
        parseFloat(data.principal)
      ));
      setTotalContributionData(totalContributionDatas.map((data) =>
        parseFloat(data.contribution)
      ));
    }

    // Create a new chart instance
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Jumlah Pelaburan",
            data: principalData,
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
          {
            label: "Jumlah Simpanan",
            data: totalContributionData,
            fill: false,
            borderColor: "rgba(255, 99, 132, 1)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 0,
        },
        layout: {
          autoPadding: true,
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              color: "white",
              padding: 10,
            },
          },
        },
        scales: {
          x: {
            position: "bottom",
            title: {
              display: true,
              text: "Tahun",
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup chart on component unmount
    return () => {
      myChart.destroy();
    };
  }, [labels, principalData, totalContributionData]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <span className="text-md md:text-xl font-bold">Graf Pelaburan</span>
      <canvas ref={chartRef} width="400" height="250"></canvas>
    </div>
  );
};

export default InvestmentGraph;
