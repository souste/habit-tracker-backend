const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "This is the habit tracking app!" }));

const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");
const checkinsRoutes = require("./routes/checkinsRoutes");

app.use("/auth", authRoutes);
app.use("/habit", habitRoutes);
app.use("/checkin", checkinsRoutes);

app.listen(3000, () => console.log("Server is running on port 3000"));
