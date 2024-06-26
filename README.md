# Transaction Dashboard

## Project Description

The Transaction Dashboard is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to view, search, and manage transaction data. The application includes features such as data visualization through charts, detailed transaction tables, and pagination for better user experience. This project demonstrates the implementation of CRUD operations, API integration, and frontend-backend communication in a modern web application.

## Features

- **Dashboard Overview**: A high-level overview of transaction statistics.
- **Search Functionality**: Search transactions based on keywords.
- **Pagination**: Navigate through multiple pages of transactions.
- **Charts**: Visual representation of transaction data using Pie and Bar charts.
- **Responsive Design**: Mobile-friendly and adaptable to different screen sizes.

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MongoDB
- **Deployment**:
  - Vercel (for the server)
  - GitHub (for version control)

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/swapnilsk13/transaction-dashboard
    cd transaction-dashboard
    ```

2. **Install server dependencies**:
    ```bash
    cd server
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the `server` directory with the following contents:
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=your_port_number
    ```

4. **Run the server**:
    ```bash
    npm start
    ```

5. **Install client dependencies**:
    ```bash
    cd ../client
    npm install
    ```

6. **Run the client**:
    ```bash
    npm start
    ```


## Links

- **GitHub Repository**: [GitHub Repository Link](https://github.com/swapnilsk13/transaction-dashboard)
- **Deployment**: [Deployment Link](https://transaction-dashboard-client.vercel.app/)

## Contact

For any questions or feedback, please contact [Swapnil Kshirsagar] at [swapnilsk999@gmail.com].
