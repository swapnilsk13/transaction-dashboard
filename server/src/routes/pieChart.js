const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");

// GET /pie-chart endpoint to fetch unique categories and item counts for a selected month
router.get("/", async (req, res) => {
  try {
    const { month } = req.query;

    // Validate month parameter
    const monthNum = parseInt(month);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({
        error: "Invalid month value. Month must be between 1 and 12.",
      });
    }

    // Construct the aggregation pipeline
    const pipeline = [
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthNum] }, // Match transactions for the specified month
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }, // Count number of transactions (items) for each category
        },
      },
    ];

    // Execute the aggregation pipeline
    const results = await Transaction.aggregate(pipeline);

    // Prepare response in the desired format as a single object
    const formattedResponse = {};
    results.forEach((item) => {
      formattedResponse[item._id] = item.count;
    });

    res.json(formattedResponse);
  } catch (error) {
    console.error("Error fetching pie chart data", error);
    res.status(500).send("Error fetching pie chart data");
  }
});

module.exports = router;
