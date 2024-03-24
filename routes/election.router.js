const express = require("express");

const router = express.Router();

const {
  createElection,
  populateCandidates,
  registerForElection,
  getElection,
  getAllElections,
} = require("../controllers/election.controller");
router.route("/createElection").post(createElection);
router.route("/getElection/:electionId").get(getElection);
router.route("/getAllElections").get(getAllElections);
router.route("/populateCandidate").put(populateCandidates);
router.route("/registerForElection/:electionId").post(registerForElection);

module.exports = router;
