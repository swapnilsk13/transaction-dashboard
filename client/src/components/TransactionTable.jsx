import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(3); // March is default month
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchTransactions(selectedMonth, currentPage);
  }, [selectedMonth, currentPage]);

  const fetchTransactions = async (month, page) => {
    try {
      const response = await axios.get(
        `https://transaction-dashboard-rho.vercel.app/transactions?month=${month}&page=${page}&search=${searchTerm}`
      );
      const { transactions, total, perPage } = response.data;

      setTransactions(transactions);
      setTotalPages(Math.ceil(total / perPage));
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null); // Collapse if already expanded
    } else {
      setExpandedId(id); // Expand otherwise
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
    fetchTransactions(selectedMonth, 1);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing month
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <label htmlFor="month" className="mr-2">
            Select Month:
          </label>
          <select
            id="month"
            className="border rounded px-2 py-1"
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

        <div className="flex items-center">
          <button
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            id="search"
            className="border rounded px-2 py-1 ml-4"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 ml-2 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="h-[340px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-200">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-200">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-200">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-200">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-200">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-200">
                Sold
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr
                key={transaction._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                // Alternate row colors based on index
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {expandedId === transaction._id ? (
                    <div>{transaction.description}</div>
                  ) : (
                    <div className="truncate max-w-[300px]">
                      {transaction.description}
                    </div>
                  )}
                  {transaction.description.length > 50 && (
                    <button
                      className="text-blue-500 mt-2"
                      onClick={() => toggleExpand(transaction._id)}
                    >
                      {expandedId === transaction._id
                        ? "Read less"
                        : "Read more"}
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.sold ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
