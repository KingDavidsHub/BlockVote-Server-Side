const express = require('express')
const mongoose = require("mongoose");
const  app = express();
const cors = require("cors");
const formData = require("express-form-data");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();



// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(formData.parse());

const uri = process.env.MONGO_URI;


async function connect() {
    try {
      await mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log("connected to mongo DB");
    } catch (error) {
      console.log(error);
    }
  }
  
  connect();

app.get("/", (req, res) => {
  res.json({
    author:["$avic", "Halel", "King David"],
    stack: ["React", "Mongodb", "Express", "Solidity", "Hardhat"],
    project_name: "BlockVote",
  });
});

const port = process.env.PORT || 9000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});