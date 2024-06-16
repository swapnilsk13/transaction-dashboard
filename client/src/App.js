import "./App.css";
import Statistics from "./components/Statistics";
import TransactionTable from "./components/TransactionTable";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Page Heading */}
      <div className="bg-gray-200 w-full p-4">
        <h1 className="text-3xl font-bold mb-4 flex justify-center">Transaction Dashboard</h1>
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
        <div className="bg-gray-100 w-full lg:w-1/3 p-4">
          <div className="sticky top-4">
            {/* Statistics */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <Statistics />
            </div>
            {/* Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Pie Chart</h2>
              <PieChart />
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="bg-gray-200 w-full lg:w-2/3 p-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4 h-1/2">
            {/* Bar Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md h-full">
              <h2 className="text-xl font-bold mb-4">Transactions Bar Chart</h2>
              <BarChart />
            </div>
            {/* Transaction Table */}
            <div className="bg-white p-4 rounded-lg shadow-md h-full">
              <h2 className="text-xl font-bold mb-4">Transaction Table</h2>
              <TransactionTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
