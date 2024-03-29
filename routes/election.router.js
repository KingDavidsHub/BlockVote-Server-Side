const express = require("express");

const router = express.Router();

const {
  createElection,
  populateCandidates,
  populateVoters,
  getElection,
  getAllElections,
  getOrganizationElections,
  deleteElectionById,
  editElectionById,
  deleteAllElections,
} = require("../controllers/election.controller");
router.route("/createElection/:organizationId").post(createElection);
router
  .route("/getOrganizationElections/:organizationId")
  .get(getOrganizationElections);
router.route("/getElection/:electionId").get(getElection);
router.route("/getAllElections").get(getAllElections);
router.route("/deleteAllElections").delete(deleteAllElections);
router.route("/populateCandidates/:electionId").put(populateCandidates);
router.route("/deleteElectionById/:electionId").delete(deleteElectionById);
router.route("/editElectionById/:electionId").put(editElectionById);
router.route("/populateVoters/:electionId").post(populateVoters);

module.exports = router;
