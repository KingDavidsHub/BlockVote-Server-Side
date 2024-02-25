const Organization = require('../models/organization.model')


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
            const new_org = await new Organization({
                name: name,
                email: email
            }).save()
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}