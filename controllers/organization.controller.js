const Organization = require('../models/organization.model')
const Token = require('../models/token.model')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const { sendMail} = require('../helpers/sendMail.helper')

exports.signup = async (req,res) =>{
    try {
        const { email, name} = req.body;

        const org = await Organization.findOne({
            email: email
        })

        if(org || org != null){
            return res.status(403).json({
                error: "Email already exist. Please proceed to sign in",
              });
        } else if(!org || org == null){
            await new Organization({
                name: name,
                email: email,
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
    const { email, password} = req.body
}