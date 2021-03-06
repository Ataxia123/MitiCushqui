module.exports = async function({ ethers: { getNamedSigner }, getNamedAccounts, deployments }) {
    const { deploy } = deployments

    const wFtmAddr = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83"

    const indexTokenwBTC = "0x321162Cd933E2Be498Cd2267a90534A804051b11"

    const uniSwapFactory = "0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3"
  
    const { deployer, dev } = await getNamedAccounts()
  
    const chainId = await getChainId()

    const moduleType = {
        version: 0,
        controller: 1,
        strategy: 2,
        mintMaster: 3,
        oracle: 4,
        voterRoll: 5
    }

    const 
        name = "FTM Oracle"
        url = "hhtps://strudel.finance"

    if (chainId != 1) { //don't deploy to mainnet
        const 
            collateralToken = wFtmAddr //change to wBTC
            factory = await deployments.get("OneTokenFactory")
            Admin = await ethers.getContractFactory("OneTokenFactory")
            admin = Admin.attach(factory.address)
            rate = 1000

        const oracle = await deploy("FTMOracle", { // wBTC:DAI
            from: deployer,
            args: [factory.address, uniSwapFactory, collateralToken, rate],
            log: true
        })

        if (chainId != 250) { //don't verify contract on localnet
            await hre.run("verify:verify", {
                address: oracle.address,
                contract: "contracts/oracle/uniswap/FTMOracle.sol:FTMOracle",
                constructorArguments: [
                    factory.address,
                    uniSwapFactory,
                    collateralToken,
                    rate
                ],
            })
        }
    
        /*await admin.admitModule(oracle.address, moduleType.oracle, name, url, {
            from: deployer
        })//*/
    }
    

}

module.exports.tags = ["ftmOracle", "mainnet"]
module.exports.dependencies = ["oneTokenFactory"]