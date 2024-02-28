const Candidate = require('../models/candidate.model')
const cloudinary = require("cloudinary").v2;


exports.addNewCandidate = async (req,res) =>{
    try {

        const { firstname, lastname, position, election } = req.body;


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
            election:election,
            image: urls
        }).save()

        res.status(200).json({
            success: true,
            data: candidate
        })
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
            election:election,
            image:result.secure_url
        }).save()

        res.status(200).json({
            success: true,
            data: candidate
        })

    }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllCandidates = async(req,res) => {
  try {
    const candidates = await Candidate.find({election: req.query.election})
                                .sort('-createdAt')

    res.status(200).json({
      success: true,
      numberOfCandidates: candidates.length,
      data: candidates
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
        success: false,
        message: error.message
    })
  }
} 



exports.updateCandidateInfo = async (req,res) =>{
  try {
      const data = req.body

    const candidate = await Candidate.findByIdAndUpdate(req.params.candidateId, {$set : data}, {new:true})

    res.status(200).json({
      success: true,
      data: candidate
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

