// server.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const DB_URL =
  "mongodb+srv://sa:s3cr3t@cluster1.uqefi.mongodb.net/gbc-fall2020?retryWrites=true&w=majority&appName=Cluster1";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connect to MongoDB Atlas
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the MongoDB Atlas server");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

require("./routes/NoteRoutes")(app);

app.listen(8082, () => {
  console.log("Server is listening on port 8082");
});
