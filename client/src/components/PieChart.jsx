import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Importing 'chart.js/auto' might help with some Chart.js issues

const PieChart = () => {
  const [selectedMonth, setSelectedMonth] = useState(1); // Default month is January
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData(selectedMonth);
  }, [selectedMonth]);

  const fetchData = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/pieChart?month=${month}`
      );
      const data = response.data;

      // Prepare data for chart
      const chartData = {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"], // Example colors
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"], // Example colors
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  return (
    <div className="pie-chart-container">
      <div className="month-select">
        <label htmlFor="month">Select Month:</label>
        <select
          className="border rounded px-2 py-1 "
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>
      <div className="pie-chart">
        {chartData ? <Pie data={chartData} /> : <div>Loading...</div>}
      </div>
    </div>
  );
};

export default PieChart;
