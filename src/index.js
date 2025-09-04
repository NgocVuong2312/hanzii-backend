const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

// Allow CORS
app.use(cors({
  origin: "http://localhost:3001", // your React app URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log("success");
});
app.get("/", (req, res) => {
  res.send("page load success");
});

app.use("/api/users", require("./routes/userRoutes"));
