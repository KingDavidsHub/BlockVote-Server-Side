const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const formData = require("express-form-data");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

////////////////////
const organizationRoutes = require("./routes/organization.router");
const userRoutes = require("./routes/user.router");
const candidateRoutes = require("./routes/candidate.router");
const electionRoutes = require("./routes/election.router");
const terminalRoutes = require("./routes/terminal.router");
const voterRoutes = require("./routes/voters.router");
//////////////////

// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(formData.parse());

////////////////////
app.use("/api/organization", organizationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/election", electionRoutes);
app.use("/api/terminal", terminalRoutes);
app.use("/api/voter", voterRoutes);

////////////////////

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
    stack: ["React", "Mongodb", "Express", "Solidity", "Hardhat", "Kubernetes", "Docker"],

    project_name: "BlockVote",
  });
});

const port = process.env.PORT || 9000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
