const { ethers } = require("hardhat");
const Election = require('../models/election.model');
const mongoose = require("mongoose");


require("dotenv").config();

const uri = process.env.MONGO_URI;


async function connect() {
    try {
      await mongoose.connect(uri, {
      });
      console.log("connected to mongo DB");
    } catch (error) {
      console.log(error);
    }
  }
  

  async function main() {
    try {
        connect();

        const elections = await Election.find({}).maxTimeMS(30000).sort({ createdAt: -1 }).limit(1);

        if (elections.length === 0) {
            console.error("No election records found.");
            return;
        }

        const election = elections[0];
        if (!election.duration) {
            console.error("Invalid duration value in election record.");
            return;
        }

        console.log("Latest election record:", election);

        const candidateNames = election.candidates.map(candidate => candidate.name);

        const Voting = await ethers.getContractFactory("Voting");
        const Voting_ = await Voting.deploy(candidateNames, election.duration);
        await Voting_.deployed();

        console.log(`Contract deployed for election ${election.name} to address:`, Voting_.address);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
