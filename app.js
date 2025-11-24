const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "This is the habit tracking app!" }));

app.listen(3000, () => console.log("Server is running on port 3000"));
