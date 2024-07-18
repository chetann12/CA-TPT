const connectToMongo = require("./db.js");

connectToMongo();
const express = require("express");
var cors = require("cors");
const app = express();
const port = 5000;

// app.use: This method is used to mount middleware functions or routers in your Express application.

app.use(cors());
app.use(express.json());

//Available Routes
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/bank/", require("./routes/bank"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Inotebook app listening on port ${port}`);
});

//  "start": "nodemon index.js"
