const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "This is the habit tracking app!" }));

const userRoutes = require("./route/userRoutes");
app.use("/users", userRoutes);

app.listen(3000, () => console.log("Server is running on port 3000"));
