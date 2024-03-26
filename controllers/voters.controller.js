const Voter = require("../models/voters.model");
const generator = require("generate-password");
const { sendMail } = require("../helpers/sendMail.helper");
const Candidate = require("../models/candidate.model");
exports.voterRegistration = async (req, res) => {
  try {
    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const voter = await new Voter({
      ...req.body,
      password,
      election: req.params.electionId,
    }).save();

    res.status(200).json({
      success: true,
      data: voter,
    });

    const body = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Election Voting Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .password {
        font-size: 18px;
        font-weight: bold;
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
        text-align: center;
      }
      .note {
        font-style: italic;
        margin-bottom: 20px;
      }
    </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Election Voting Password</h1>
        </div>
        <p>Dear ${req.body.firstname},</p>
        <p>Thank you for your participation in the upcoming election. As a registered voter, you are required to use the provided password to access the voting platform.</p>
        <p class="password">Your Voting Password: <strong>${password}</strong></p>
        <p class="note">Please keep this password confidential and do not share it with anyone.</p>
        <p>To cast your vote, you will need to log in using the email address associated with this account along with the provided password.</p>
        <p>If you encounter any issues or have questions regarding the voting process, please do not hesitate to contact us.</p>
        <p>Thank you for exercising your democratic right to vote.</p>
        <p>Sincerely,</p>
        <p>BlockVote Inc</p>
      </div>
    </body>
    </html>
    `;

    sendMail(req.body.email, body, "Voting Credentials");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadVoters = async (req, res) => {
  try {
    for (i = 0; i <= req.body.length; i++) {
      const password = generator.generate({
        length: 10,
        numbers: true,
      });

      await new Voter({
        ...req.body[i],
        election: req.params.electionId,
      }).save();

      const body = `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Election Voting Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .password {
          font-size: 18px;
          font-weight: bold;
          background-color: #f0f0f0;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
        }
        .note {
          font-style: italic;
          margin-bottom: 20px;
        }
      </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Election Voting Password</h1>
          </div>
          <p>Dear ${req.body[i].firstname},</p>
          <p>Thank you for your participation in the upcoming election. As a registered voter, you are required to use the provided password to access the voting platform.</p>
          <p class="password">Your Voting Password: <strong>${password}</strong></p>
          <p class="note">Please keep this password confidential and do not share it with anyone.</p>
          <p>To cast your vote, you will need to log in using the email address associated with this account along with the provided password.</p>
          <p>If you encounter any issues or have questions regarding the voting process, please do not hesitate to contact us.</p>
          <p>Thank you for exercising your democratic right to vote.</p>
          <p>Sincerely,</p>
          <p>BlockVote Inc</p>
        </div>
      </body>
      </html>
      `;

      sendMail(req.body.email, body, "Voting Credentials");
    }

    res.status(200).json({
      success: true,
      message: "Voters successfully uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.vote = async (req, res) => {
  try {
    for (i = 0; i <= req.body.length; i++) {
      await Candidate.findByIdAndUpdate(
        req.body[i]._id,
        {
          $inc: { voteCount: 1 },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Voted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
