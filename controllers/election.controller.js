const Election = require("../models/election.model");
const Candidate = require("../models/candidate.model");
const Voter = require("../models/voters.model");

exports.createElection = async (req, res) => {
  try {
    const election = await new Election({
      ...req.body,
      organization: req.params.organizationId,
    }).save();

    res.status(200).json({
      success: true,
      data: election,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.populateCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({
      election: req.params.electionId,
    });

    const election = await Election.findByIdAndUpdate(
      req.params.electionId,
      {
        $set: {
          candidates: candidates,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: election,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.populateVoters = async (req, res) => {
  try {
    const voters = await Voting.find({
      election: req.params.electionId,
    });

    const election = await Election.findByIdAndUpdate(
      req.params.electionId,
      {
        $set: {
          registeredVoters: voters,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: election,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.electionId);

    res.status(200).json({
      success: true,
      data: election,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllElections = async (req, res) => {
  try {
    const elections = await Election.find({});

    if (elections.length !== 0) {
      res.status(200).json({
        success: true,
        data: elections,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "elections not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteElectionById = async (req, res) => {
  try {
    await Election.findByIdAndDelete(req.params.electionId);

    res.status(200).json({
      success: true,
      message: "Election deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrganizationElections = async (req, res) => {
  try {
    const elections = await Election.find({
      organization: req.params.organizationId,
    });

    if (elections) {
      res.status(200).json({
        success: true,
        data: elections,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Elections not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editElectionById = async (req, res) => {
  try {
    const election = await Election.findByIdAndUpdate(
      req.params.electionId,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: election,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAllElections = async (req, res) => {
  try {
    await Election.find({}).deleteMany({});

    res.status(200).json({
      success: true,
      message: "All elections deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
