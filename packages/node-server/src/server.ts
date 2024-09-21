import express from "express";

const app = express();
const port = 3001;

// Define a root route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Define your data route
app.get("/data", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ foo: "bar" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
