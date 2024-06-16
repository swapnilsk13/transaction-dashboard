const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const Transaction = require("./models/transaction");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(cors());
app.use(express.json());

// Initialize database route
app.get("/initialize", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;
    await Transaction.insertMany(transactions);
    res.send("Database initialized with seed data");
  } catch (error) {
    console.error("Error initializing database", error);
    res.status(500).send("Error initializing database");
  }
});

// Import routes
const transactionsRoute = require("./routes/transactions");
const statisticsRoute = require("./routes/statistics");
const barChartRoute = require("./routes/barChart");
const pieChartRoute = require("./routes/pieChart");
const combinedRoute = require('./routes/combined')

// Use routes
app.use("/transactions", transactionsRoute);
app.use("/statistics", statisticsRoute);
app.use("/barchart", barChartRoute);
app.use("/piechart", pieChartRoute);
app.use("/combined",combinedRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
