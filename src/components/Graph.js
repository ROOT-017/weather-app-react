import React from "react";
import Chart from "react-apexcharts";

const Graph = (props) => {
  //Line Chart
  const lineChartOptions = {
    // chart: {
    //   id: "basic-line",
    // },
    xaxis: {
      labels: {
        show: false,
      },
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: "smooth",
    },

    tooltip: {
      enabled: false,
    },
    fill: {
      type: "solid",
      colors: ["#fff", "#fff" /*"#F44336"*/],
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
  };
  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];
  return <Chart type="line" options={lineChartOptions} series={series} />;
};

export default Graph;
