const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

// Allow CORS
app.use(cors({
  origin: "http://localhost:3001", // your React app URL
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
try {
  app.listen(port, () => {
  console.log("success");
});
} catch (error) {
  console.log(error);
  
}

app.get("/", (req, res) => {
  res.send("page load success ");
});

app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/comments", require("./src/routes/commentRoutes"));
app.use("/api/tips", require("./src/routes/tipRoutes"));
app.use("/api/volcap",require('./src/routes/volcapRoutes'));
