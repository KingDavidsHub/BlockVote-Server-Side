const express = require("express");
const router = express.Router();

const {
  addNewCandidate,
  getAllCandidates,
  updateCandidateInfo,
  deleteAllCandidate,
  deleteCandidate,
  getCandidate,
  uploadCandidates,
  editCandidateById,
} = require("../controllers/candidate.controller");

router.route("/addNewCandidate/:electionId").post(addNewCandidate);
router.route("/uploadCandidates/:electionId").post(uploadCandidates);
router.route("/getAllCandidates/:electionId").get(getAllCandidates);
router.route("/getCandidate/candidateId").get(getCandidate);
router.route("/updateCandidateInfo/:candidateId").put(updateCandidateInfo);
router.route("/deleteAllCandidate").delete(deleteAllCandidate);
router.route("/deleteCandidate/:candidateId", deleteCandidate);
router.route("/editCandidateById/:candidateId").put(editCandidateById);

module.exports = router;
