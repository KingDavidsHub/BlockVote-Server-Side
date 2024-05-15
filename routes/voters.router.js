const express = require("express");
const router = express.Router();

const {
  uploadVoters,
  voterRegistration,
  vote,
} = require("../controllers/voters.controller");

router.route("/registerVoter/:electionId").post(voterRegistration);
router.route("/uploadVoters/:electionId").post(uploadVoters);
router.route("/vote").post(vote);

module.exports = router;
