"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Radar, Line, Bar } from "react-chartjs-2";
import { ChartDescriptor } from "../types/book";
import { useEffect, useState } from "react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface Props {
  chart: ChartDescriptor;
}

export function ChartRenderer({ chart }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex h-48 w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-400">
        Loading chart...
      </div>
    );
  }

  const data = {
    labels: chart.labels,
    datasets: chart.datasets.map((dataset) => ({
      ...dataset,
      fill: true,
      borderWidth: 2,
      tension: 0.3,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: false },
    },
    scales:
      chart.type === "radar"
        ? undefined
        : {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 10 },
            },
          },
  };

  return (
    <div className="h-72 w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      {chart.type === "radar" && <Radar data={data} options={options} />}
      {chart.type === "line" && <Line data={data} options={options} />}
      {chart.type === "bar" && <Bar data={data} options={options} />}
    </div>
  );
}
