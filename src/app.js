require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "This is the habit tracking app!" }));

const authRoutes = require("./routes/authRoutes");
const habitsRoutes = require("./routes/habitsRoutes");
const checkinsRoutes = require("./routes/checkinsRoutes");

app.use("/auth", authRoutes);
app.use("/habits", habitsRoutes);
app.use("/checkins", checkinsRoutes);

app.listen(3000, () => console.log("Server is running on port 3000"));
