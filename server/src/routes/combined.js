const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const { month } = req.query;

  // Validate month parameter
  const monthNum = parseInt(month);
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    return res.status(400).json({
      error: "Invalid month value. Month must be between 1 and 12.",
    });
  }

  try {
    // Define base URL for the APIs
    const baseURL = "http://localhost:8080";

    // Define the endpoints to be called
    const endpoints = [
      `${baseURL}/barChart?month=${month}`,
      `${baseURL}/pieChart?month=${month}`,
      `${baseURL}/statistics?month=${month}`,
    ];

    // Make concurrent requests to all three endpoints
    const [barChartData, pieChartData, statisticsData] = await Promise.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    );

    // Combine the responses
    const combinedResponse = {
      barChartData: barChartData.data,
      pieChartData: pieChartData.data,
      statisticsData: statisticsData.data,
    };

    // Send the combined response
    res.json(combinedResponse);
  } catch (error) {
    console.error("Error fetching combined data", error);
    res.status(500).send("Error fetching combined data");
  }
});

module.exports = router;
