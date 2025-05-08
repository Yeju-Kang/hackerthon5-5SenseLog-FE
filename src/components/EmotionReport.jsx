import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import { fetchDiaryList } from "../api/diary";
import "./EmotionReport.scss";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
);

const emotionLabelMap = {
  1: "😞 슬픔",
  2: "😔 우울",
  3: "😐 보통",
  4: "😊 기쁨",
  5: "😄 행복",
};

const emotionEmojiMap = {
  1: "😞",
  2: "😔",
  3: "😐",
  4: "😊",
  5: "😄",
};

const mapEmotionToScore = (tag) => {
  if (tag === "슬픔") return 1;
  if (tag === "우울") return 2;
  if (tag === "보통") return 3;
  if (tag === "기쁨") return 4;
  if (tag === "행복") return 5;
  return 3;
};

const EmotionReport = () => {
  const [chartData, setChartData] = useState([]);

  const loadData = async () => {
    try {
      const res = await fetchDiaryList(0, 50);
      const raw = res.data.data || [];

      const latest7 = raw
        .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
        .slice(0, 7)
        .reverse();

      const parsed = latest7.map((d) => ({
        date: d.createAt.split("T")[0],
        score: mapEmotionToScore(d.tag),
      }));

      setChartData(parsed);
    } catch (err) {
      console.error("감정 리포트 로딩 실패 ❌", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const labels = chartData.map((item) => item.date);
  const data = {
    labels,
    // dataset 설정
    datasets: [
      {
        label: "감정 점수",
        data: chartData.map((item) => item.score),
        borderColor: "#d6c6e1",
        backgroundColor: "#d6c6e1",
        tension: 0.3,
        pointRadius: 8, // 점 크기 보이도록 설정
        pointBackgroundColor: "#fff", // 배경색 (투명도나 흰색 등)
        pointHoverRadius: 10,
      },
    ],
  };

  const emojiPlugin = {
    id: "emojiLabels",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const dataset = chart.data.datasets[0];

      chart.getDatasetMeta(0).data.forEach((point, index) => {
        const score = dataset.data[index];
        const emoji = emotionEmojiMap[score];

        ctx.save();
        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(emoji, point.x, point.y); // ⬅️ 정중앙에 위치
        ctx.restore();
      });
    },
  };

  // chart options에 layout 추가
  const options = {
    layout: {
      padding: {
        top: 30, // 이모지 위쪽 잘림 방지
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const score = ctx.raw;
            return `${emotionLabelMap[score]} (${score})`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          callback: (value) => emotionLabelMap[value],
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="emotion-report">
      <h2 className="title is-5">📈 감정 리포트</h2>
      <p className="subtitle is-6">최근 감정의 흐름을 한눈에 확인해보세요.</p>
      <Line data={data} options={options} plugins={[emojiPlugin]} />
    </div>
  );
};

export default EmotionReport;
