require('dotenv').config();

const express = require("express");
const router = require("./src/routes/router");
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use("/", router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Server running on port http://localhost:${PORT}`);
})