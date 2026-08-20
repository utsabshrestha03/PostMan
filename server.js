const dns = require("dns");

// Use public DNS servers for MongoDB SRV lookup
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Task API is running"
    });
});

// Test tasks route
app.get("/tasks", (req, res) => {
    res.json(req.body);
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});