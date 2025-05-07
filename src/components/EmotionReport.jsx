// components/EmotionReport.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import "./EmotionReport.scss";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
);

// 감정 점수 => 감정 이름
const emotionLabelMap = {
  1: "😞 슬픔",
  2: "😔 우울",
  3: "😐 보통",
  4: "😊 기쁨",
  5: "😄 행복",
};

const mockData = [
  { date: "2025-05-03", score: 3 },
  { date: "2025-05-04", score: 4 },
  { date: "2025-05-05", score: 2 },
  { date: "2025-05-06", score: 5 },
  { date: "2025-05-07", score: 4 },
  { date: "2025-05-08", score: 1 },
  { date: "2025-05-09", score: 3 },
];

const EmotionReport = () => {
  const labels = mockData.map((item) => item.date);
  const data = {
    labels,
    datasets: [
      {
        label: "감정 점수",
        data: mockData.map((item) => item.score),
        fill: false,
        borderColor: "#a1c3d1",
        tension: 0.3,
        pointBackgroundColor: "#d6c6e1",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          callback: (value) => emotionLabelMap[value],
          stepSize: 1,
        },
        title: {
          display: true,
          text: "감정 점수",
        },
      },
    },
  };

  return (
    <div className="emotion-report">
      <h2 className="title is-5">📈 감정 리포트</h2>
      <p className="subtitle is-6">최근 감정의 흐름을 한눈에 확인해보세요.</p>
      <Line data={data} options={options} />
    </div>
  );
};

export default EmotionReport;
