import React, { useState, useEffect } from "react";
import axios from "axios";

const Statistics = () => {
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(1); // Default month

  useEffect(() => {
    fetchStatistics(selectedMonth);
  }, [selectedMonth]);

  const fetchStatistics = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/statistics?month=${month}`
      );
      const { totalSaleAmount, totalSoldItems, totalNotSoldItems } =
        response.data;

      setTotalSaleAmount(totalSaleAmount);
      setTotalSoldItems(totalSoldItems);
      setTotalNotSoldItems(totalNotSoldItems);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Transactions Statistics</h2>
        <div className="flex items-center">
          <label htmlFor="month" className="mr-2">
            Select Month:
          </label>
          <select
            id="month"
            className="px-3 py-1 border border-gray-300 rounded-md"
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
      </div>
      <div>
        <p className="text-lg">
          Total Sale Amount:{" "}
          <span className="font-bold">${totalSaleAmount.toFixed(2)}</span>
        </p>
        <p className="text-lg">
          Total Sold Items: <span className="font-bold">{totalSoldItems}</span>
        </p>
        <p className="text-lg">
          Total Not Sold Items:{" "}
          <span className="font-bold">{totalNotSoldItems}</span>
        </p>
      </div>
    </div>
  );
};

export default Statistics;
