import express from "express";
import path from "node:path";

const __dirname = import.meta.dirname;

const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.listen(8080, () => {
  console.log("App is ready on 8080");
});
