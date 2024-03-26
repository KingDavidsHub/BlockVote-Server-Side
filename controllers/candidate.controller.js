const Candidate = require("../models/candidate.model");
const cloudinary = require("cloudinary").v2;
const Election = require("../models/election.model");

exports.addNewCandidate = async (req, res) => {
  try {
    const { firstname, lastname, position } = req.body;

    const election = await Election.findById(req.params.electionId);
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUDNAME,
      api_key: process.env.CLOUDINARY_APIKEY,
      api_secret: process.env.CLOUDINARY_APISECRET,
    });

    const image = req.files.image;
    let urls = [];

    if (image.length > 1) {
      let images = [];
      let x = image.length;
      for (let i = 0; i < x; i++) {
        images.push(image[i].path);
      }

      let y = images.length;
      for (let i = 0; i < y; i++) {
        await cloudinary.uploader.upload(
          images[i],
          { upload_preset: "CANDIDATE" },
          function (error, result) {
            if (error) {
              console.log(error);
            }

            urls.push(result.secure_url);
          }
        );
      }

      const candidate = await new Candidate({
        firstname: firstname,
        lastname: lastname,
        position: position,
        election: req.params.electionId,
        image: urls,
      }).save();

      res.status(200).json({
        success: true,
        data: candidate,
      });
    } else {
      const result = await cloudinary.uploader.upload(
        image.path,
        { upload_preset: "CANDIDATE" },
        function (error, result) {
          if (error) {
            console.log(error);
          }
        }
      );

      const candidate = await new Candidate({
        firstname: firstname,
        lastname: lastname,
        position: position,
        election: election,
        image: result.secure_url,
      }).save();

      res.status(200).json({
        success: true,
        data: candidate,
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

exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({
      election: req.params.electionId,
    }).sort("-createdAt");

    res.status(200).json({
      success: true,
      numberOfCandidates: candidates.length,
      data: candidates,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCandidateInfo = async (req, res) => {
  try {
    const data = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.candidateId,
      { $set: data },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndRemove(req.params.candidateId);

    res.status(200).json({
      success: true,
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.candidateId);

    res.status(200).jsonn({
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAllCandidate = async (req, res) => {
  try {
    const { election } = req.body;
    await Candidate.find({ election: election }).deleteMany({});

    res.status(200).json({
      success: true,
      message: "Successfully deleted all candidates for this election",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadCandidates = async (req, res) => {
  try {
    for (i = 0; i < req.body.length; i++) {
      await new Candidate({
        ...req.body[i],
        election: req.params.electionId,
      }).save();
    }

    res.status(200).json({
      success: true,
      message: "Successfully Uploaded candidates",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.candidateId,
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
      data: candidate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
