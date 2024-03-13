const { exec } = require('child_process');

exports.deploy = async (req,res) =>{
    try {
        exec('npx hardhat run --network sepolia scripts/deploy.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);

            res.status(200).json({
                success: true,
                message: "Contract deployed successfully"
            })
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
    
}

exports.compile = async (req,res) =>{
    try {
        exec('npx hardhat compile', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);

            res.status(200).json({
                success: true, 
                message: "Contract Compiled successfully"
            })
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
    
}





