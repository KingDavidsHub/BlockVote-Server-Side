const express = require("express");

const router = express.Router();

const {
  createElection,
  populateCandidates,
  registerForElection,
  getElection,
  getAllElections,
  getOrganizationElections,
  deleteElectionById,
  editElectionById,
} = require("../controllers/election.controller");
router.route("/createElection/:organizationId").post(createElection);
router
  .route("/getOrganizationElections/:organizationId")
  .get(getOrganizationElections);
router.route("/getElection/:electionId").get(getElection);
router.route("/getAllElections").get(getAllElections);
router.route("/populateCandidate").put(populateCandidates);
router.route("/deleteElectionById/:electionId").delete(deleteElectionById);
router.route("/editElectionById/:electionId").put(editElectionById);
router.route("/registerForElection/:electionId").post(registerForElection);

module.exports = router;
