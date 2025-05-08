const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const http = require("http");
const authRoutes = require('./routes/auth.js');
const dataRoutes = require('./routes/data.js');


connectDB();
const app = express();
const server = http.createServer(app);


app.use(cors({
    origin: 'https://solveiq.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use('/api/auth/', authRoutes);
app.use('/api/data/', dataRoutes);


server.listen(3000, () => {
  console.log("Server is running on port 3000");
});



