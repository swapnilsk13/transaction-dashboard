const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");

router.get("/", async (req, res) => {
  const { month } = req.query;

  try {
    // Validate month parameter
    const monthNum = parseInt(month);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({
        error: "Invalid month value. Month must be between 1 and 12.",
      });
    }

    // Determine the start and end dates for the specified month across 2021 and 2022
    const startDate = new Date(2021, monthNum - 1, 1); // Month is zero-indexed in JavaScript
    const endDate = new Date(2022, monthNum, 1); // Next month's 1st day to capture all dates in the specified month

    // Construct the query to find transactions in the specified month
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    // Define price ranges and initialize counts
    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    // Count transactions in each price range
    transactions.forEach((transaction) => {
      const price = transaction.price;
      if (price <= 100) priceRanges["0-100"]++;
      else if (price <= 200) priceRanges["101-200"]++;
      else if (price <= 300) priceRanges["201-300"]++;
      else if (price <= 400) priceRanges["301-400"]++;
      else if (price <= 500) priceRanges["401-500"]++;
      else if (price <= 600) priceRanges["501-600"]++;
      else if (price <= 700) priceRanges["601-700"]++;
      else if (price <= 800) priceRanges["701-800"]++;
      else if (price <= 900) priceRanges["801-900"]++;
      else priceRanges["901-above"]++;
    });

    res.json(priceRanges);
  } catch (error) {
    console.error("Error fetching bar chart data", error);
    res.status(500).send("Error fetching bar chart data");
  }
});


module.exports = router;
