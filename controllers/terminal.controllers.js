const util = require('util');
const { exec } = require('child_process');
const execPromise = util.promisify(exec);

exports.deploy = async (req, res) => {
    try {
        const { stdout, stderr } = await execPromise('npx hardhat run --network sepolia scripts/deploy.js');

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            throw new Error(stderr);
        }

        console.log(`stdout: ${stdout}`);

        res.status(200).json({
            success: true,
            message: "Contract deployed successfully"
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

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





