import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function LineGraph({ labels, values }) {
  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            data: values,
            label: "Performance",
            backgroundColor: "#FAAB78",
            borderWidth: 2,
            fill: true,
            radius: 0,
          },
        ],
      }}
    />
  );
}

export default LineGraph;
