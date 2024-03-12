const { ethers } = require("hardhat");
const Election = require('../models/election.model');

async function main() {
    // Fetch elections from MongoDB
    const election = await Election.findOne({}).sort({ createdAt: -1 }).limit(1);
    // Deploy a separate instance of the voting smart contract for each election
        const candidateNames = election.candidates.map(candidate => candidate.name);

        // Deploy the contract with candidate names and duration from the election
        const Voting = await ethers.getContractFactory("Voting");
        const Voting_ = await Voting.deploy(candidateNames, election.duration);
        await Voting_.deployed();

        console.log(`Contract deployed for election ${election.name} to address:`, Voting_.address);
}

main()
  .then(() => process.exit(0)) 
  .catch(error => {
    console.error(error);
    process.exit(1);
  });


