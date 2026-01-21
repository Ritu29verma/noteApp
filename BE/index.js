const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const NoteRoutes = require("./routes/notes");
const UserRoutes = require("./routes/user");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require("path");

app.use(cors({ "origin": "*" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the built-in __dirname
const distPath = path.join(__dirname, "../FE/dist");
app.use(express.static(distPath));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use("/api/v1", NoteRoutes);
app.use("/api/auth", UserRoutes);
app.get("*", (req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
