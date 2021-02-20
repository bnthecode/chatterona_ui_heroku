import express from "express"
import path from "path";

const __dirname = path.resolve();
const app = express(); // create express app

app.use(express.static("public"));

// start express server on port 5000
app.listen(3005, () => {
  console.log("server started on port 3005");
});