import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const [selectedMonth, setSelectedMonth] = useState(1); // Default month is January
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData(selectedMonth);
  }, [selectedMonth]);

  const fetchData = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/barChart?month=${month}`
      );
      const data = response.data;

      // Prepare data for chart
      const chartData = {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Number of Items",
            backgroundColor: "#4BC0C0", // Example color
            borderColor: "#36A2EB", // Example color
            borderWidth: 1,
            hoverBackgroundColor: "#55DDDD", // Example color
            hoverBorderColor: "#36A2EB", // Example color
            data: Object.values(data),
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  return (
    <div className="h-4/6 mb-4">
      {" "}
      {/* Adjusted height to 66% of the viewport height */}
      <div className="month-select mb-4">
        <label htmlFor="month">Select Month:</label>
        <select
          id="month"
          className="ml-2 px-2 py-1 border rounded"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {/* Options for months */}
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
      <div className="h-full">
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Price Range",
                    font: {
                      weight: "bold",
                    },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Number of Items",
                    font: {
                      weight: "bold",
                    },
                  },
                  min: 0,
                },
              },
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default BarChart;
