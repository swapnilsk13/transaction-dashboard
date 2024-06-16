const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");

// GET /statistics endpoint for month-based statistics
router.get("/", async (req, res) => {
  const { month } = req.query;

  // Validate month
  if (!month) {
    return res.status(400).send("Month is required");
  }

  const parsedMonth = parseInt(month);

  if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
    return res.status(400).send("Invalid month format");
  }

  try {
    // Construct the aggregation pipeline
    const pipeline = [
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, parsedMonth] },
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
          totalSoldItems: { $sum: { $cond: ["$sold", 1, 0] } },
          totalNotSoldItems: { $sum: { $cond: ["$sold", 0, 1] } },
        },
      },
    ];

    // Execute the aggregation pipeline
    const stats = await Transaction.aggregate(pipeline);

    // Return JSON response with statistics
    res.json({
      totalSaleAmount: stats[0]?.totalSaleAmount || 0,
      totalSoldItems: stats[0]?.totalSoldItems || 0,
      totalNotSoldItems: stats[0]?.totalNotSoldItems || 0,
    });
  } catch (error) {
    console.error("Error fetching statistics", error);
    res.status(500).send("Error fetching statistics");
  }
});

module.exports = router;
