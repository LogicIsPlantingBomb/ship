import React from "react";
import { Line, Scatter } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import SatelliteImages from './satellite-images';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Sample hardcoded AIS data with anomaly points
const anomalyData = [
  { time: "00:00", speed: 20, course: 180, isDistress: false },
  { time: "01:00", speed: 22, course: 175, isDistress: false },
  { time: "02:00", speed: 28, course: 190, isDistress: true },  // Anomaly point
  { time: "03:00", speed: 18, course: 170, isDistress: false },
  { time: "04:00", speed: 30, course: 200, isDistress: true },  // Anomaly point
  { time: "05:00", speed: 25, course: 160, isDistress: false },
];

// Convert data to format compatible with Chart.js
const chartData = {
  labels: anomalyData.map((data) => data.time),
  datasets: [
    {
      label: "Vessel Speed (knots)",
      data: anomalyData.map((data) => data.speed),
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      pointBackgroundColor: anomalyData.map((data) =>
        data.isDistress ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)"
      ),  // Highlight distress points in red
      pointRadius: anomalyData.map((data) => (data.isDistress ? 8 : 5)),  // Larger points for distress
      borderWidth: 2,
    },
    {
      label: "Course (degrees)",
      data: anomalyData.map((data) => data.course),
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      pointBackgroundColor: anomalyData.map((data) =>
        data.isDistress ? "rgba(255, 99, 132, 1)" : "rgba(75, 192, 192, 1)"
      ),
      pointRadius: anomalyData.map((data) => (data.isDistress ? 8 : 5)),
      borderWidth: 2,
      hidden: true,  // Line chart can have toggleable datasets
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const data = anomalyData[tooltipItem.dataIndex];
		return `${tooltipItem.dataset.label}: ${tooltipItem.raw} (Distress: ${data.isDistress ? "Yes" : "No"})`;

        },
      },
    },
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: true,
      text: "Vessel Anomalies Detection - Speed and Course",
    },
  },
};

const scatterData = {
  datasets: [
    {
      label: "Vessel Distress Events (Speed vs. Course)",
      data: anomalyData
        .filter((data) => data.isDistress)
        .map((data) => ({ x: data.course, y: data.speed })),
      backgroundColor: "rgba(255, 99, 132, 1)", // Red for distress points
      pointRadius: 10,
    },
  ],
};

const scatterOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: true,
      text: "Distress Event Correlation (Speed vs. Course)",
    },
  },
};

const AnomalyDetectionGraph = () => {
  return (
    <motion.div
      className="p-6 bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Anomaly Detection: Vessel Speed and Course</h1>
      </div>

      {/* Line Chart for Vessel Speed and Course */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg mb-6"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Line data={chartData} options={chartOptions} />
      </motion.div>

      {/* Scatter Chart for Anomaly Correlation */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Scatter data={scatterData} options={scatterOptions} />
      </motion.div>
    </motion.div>
  );
};

export default AnomalyDetectionGraph;
