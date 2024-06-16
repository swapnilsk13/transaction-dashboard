const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");

// GET /transactions endpoint with search, pagination, and month filter
router.get("/", async (req, res) => {
  try {
    const { search = "", page = 1, perPage = 10, month } = req.query;

    // Validate page and perPage (optional)
    if (
      isNaN(page) ||
      parseInt(page) <= 0 ||
      isNaN(perPage) ||
      parseInt(perPage) <= 0
    ) {
      return res.status(400).send("Invalid page or perPage values");
    }

    // Construct the match stage for the aggregation pipeline
    const matchStage = {};

    // Add search criteria if search parameter is provided
    if (search) {
      matchStage.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { price: !isNaN(parseFloat(search)) ? parseFloat(search) : undefined }, // Match exact price if numeric value provided
      ].filter(Boolean); // Remove undefined entries
    }

    // Add month filter if month parameter is provided
    if (month) {
      const parsedMonth = parseInt(month);
      if (!isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12) {
        matchStage.$expr = { $eq: [{ $month: "$dateOfSale" }, parsedMonth] };
      } else {
        return res.status(400).send("Invalid month format");
      }
    }

    // Calculate skip and limit values for pagination
    const skip = (parseInt(page) - 1) * parseInt(perPage);
    const limit = parseInt(perPage);

    console.log("Match stage:", JSON.stringify(matchStage, null, 2));

    // Execute the aggregation pipeline to fetch transactions
    const transactions = await Transaction.aggregate([
      { $match: matchStage },
      { $sort: { dateOfSale: -1 } }, // Sort by dateOfSale descending
      { $skip: skip },
      { $limit: limit },
    ]);

    // Count total number of transactions for pagination
    const total = await Transaction.countDocuments(matchStage);

    // Log the transactions for debugging
    console.log("Fetched transactions:", transactions);

    // Return response with transactions and pagination details
    res.json({
      transactions,
      total,
      page: parseInt(page),
      perPage: parseInt(perPage),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Error fetching transactions");
  }
});

module.exports = router;
