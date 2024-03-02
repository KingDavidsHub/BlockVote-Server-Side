const User = require('../models/user.model')
const Token = require('../models/token.model')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const { sendMail} = require('../helpers/sendMail.helper')

require('dotenv').config()

exports.signup = async (req,res) =>{
    try {
        const { email} = req.body;

        const user = await User.findOne({
            email: email
        })

        if(user || user != null){
            return res.status(403).json({
                error: "Email already exist. Please proceed to sign in",
              });
        } else if(!user || user == null){
            const data = req.body;
            await new User({
                ...data,
                isVerified: false
            }).save()

            const token = await new Token({
                token: Math.floor(Math.random() * 90000) + 10000,
                isUsed: false,
                email: email,
                expiryDate: moment(new Date()).add(45, "m").toDate(),
            }).save()

                const body = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Email Verification</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f8f9fa;
                            margin: 0;
                            padding: 0;
                        }
                
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                
                        h2 {
                            color: #343a40;
                            margin-top: 0;
                        }
                
                        p {
                            color: #6c757d;
                            margin-bottom: 20px;
                        }
                
                        .verification-code {
                            background-color: #f1f1f1;
                            border: 1px solid #dee2e6;
                            padding: 10px;
                            margin-bottom: 20px;
                            border-radius: 4px;
                        }
                
                        .code {
                            font-weight: bold;
                            color: #343a40;
                        }
                
                        .footer {
                            text-align: center;
                            color: #6c757d;
                            font-size: 14px;
                            margin-top: 20px;
                            border-top: 1px solid #dee2e6;
                            padding-top: 10px;
                        }
                
                        .footer p {
                            margin: 0;
                        }
                    </style>
                </head>
                <body>
                <div class="container">
                    <h2>Email Verification</h2>
                    <p>Thank you for signing up! To complete your registration, please enter the following verification code:</p>
                    <div class="verification-code">
                        <span class="code">${token.token}</span>
                    </div>
                    <p>If you did not request this verification code, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>BlockVote</p>
                </div>
                </body>
                </html>                
                `;
            sendMail(email,body,"Verify Email")

            res.status(200).json({
              success: true
            });
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.signin = async(req,res) =>{
    try {
        const { email, password} = req.body

    const user = await User.findOne({
        email: email
    })


    if(!user || user == null){
        return res.status(401).json({
            success: false,
            message: "Such User does not exist"
        })
    }


    if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password does not match",
        });
      }
  
      // Send Email
      //sendRealEmail(user.email, "Sign In Successfull", "Signin Alert");
  
      // create a token
      const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30d",
        }
      );
  
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "48h",
      });
      // Put token in cookie
      res.cookie("refreshToken", refreshToken, {
        expire: new Date(new Date().getTime() + 2592000000)

      });
      res.cookie("token", token, { expire: new Date() + 24 *60 * 60 * 1000 });
  
      // Send response to front end
      const {
        _id,
        isVerified,
        firstname,
        lastname,
      } = user;
      return res.json({
        token,
        refreshToken,
        user: {
          _id,
          isVerified,
          email,
          firstname,
          lastname
        },
      });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getTokenByEmail = async(req,res) =>{
    try {
        const { email} = req.body;

        const token = await Token.findOne({
            email: email
        })

        res.status(200).json({
            success: true,
            data: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.verifyUser = async(req,res) =>{
    try {
        const { email} = req.body;

        const user = await User.findOne({
            email: email
        })

        await User.findByIdAndUpdate(user._id, {
            isVerified: true
        }, {
            new: true
        })

        console.log(user);

        if(user != null){
            res.status(200).json({
                success: true,
                message: "User verified successfully",
                data: user
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

exports.getAllUsers = async(req,res) =>{
    try {
        const users = await User.find({})

        if(users != null || users.length != 0 ){
            res.status(200).json({
                no: users.length,
                data: users
            })
        } else{ 
            res.status(200).json({
                message: "No Users"
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