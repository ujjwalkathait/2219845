const express = require('express');
const cors = require('cors');
const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));

app.use(express.json());

// Your log endpoint
app.post('/evaluation-service/logs', (req, res) => {
  console.log("Received log:", req.body);
  res.status(200).json({ message: "log created successfully" });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Logging service running on http://localhost:${PORT}`);
});
