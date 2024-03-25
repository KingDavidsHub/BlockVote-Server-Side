const Election = require("../models/election.model");

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
    const election = await Election.findById(req.params.electionId).populate(
      "candidates"
    );

    re.status(200).json({
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

exports.registerForElection = async (req, res) => {
  try {
    const { email, firstname, lastname } = req.body;

    const election = await Election.findByIdAndUpdate(
      req.params.electionId,
      {
        $push: {
          registeredVoters: { email, firstname, lastname, isVerified: false },
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
