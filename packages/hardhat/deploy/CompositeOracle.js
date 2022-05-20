module.exports = async function({ ethers: { getNamedSigner }, getNamedAccounts, deployments }) {
    const { deploy } = deployments

    const vbtcAddr = "0x9049198f6b21acf1e050cfcf36a6879a07b0bbe4"
    const wbtcaddr = "0x321162Cd933E2Be498Cd2267a90534A804051b11"
    const ethTokenAddr = "0x74b23882a30290451a17c44f4f05243b6b58c76d"
    const wFtmAddr = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83"
    const uniSwapFactory = "0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3"
    const indexToken = "0x04068da6c83afcfa0e13ba15a6696662335d5b75" // USDC

    const interimToken = [vbtcAddr, wbtcaddr, ethTokenAddr,wFtmAddr]

    const wBTCOracle = await deployments.get("wBTCPegOracle")
    const ETHOracle = await deployments.get("ETHOracle")
    const FTMOracle = await deployments.get("FTMOracle")
    const USCOracle = await deployments.get("USDCoracle") 

    const oracleList = [wBTCOracle.address, ETHOracle.address, FTMOracle.address, USCOracle.address]
  
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
        name = "Composite Oracle"
        url = "hhtps://strudel.finance"

    if (chainId != 1) { //don't deploy to mainnet
        const 
            collateralToken = wbtcaddr //change to wBTC
            factory = await deployments.get("OneTokenFactory")
            Admin = await ethers.getContractFactory("OneTokenFactory")
            admin = Admin.attach(factory.address)
            description = "vBTC to USDC oracle"

        const oracle = await deploy("vBTCCompositeOracle", { // vBTC:wBTC:ETH:USDC
            from: deployer,
            args: [factory.address, description, indexToken, interimToken, oracleList],
            log: true
        })

        if (chainId != 31337) { //don't verify contract on localnet
            await hre.run("verify:verify", {
                address: oracle.address,
                constructorArguments: [
                    factory.address,
                    description,
                    indexToken,
                    interimToken,
                    oracleList
                ],
            })
        }
    
        await admin.admitModule(oracle.address, moduleType.oracle, name, url, {
            from: deployer
        })
    }
    

}

module.exports.tags = ["CompositeOracle","mainnet"]
module.exports.dependencies = ["oneTokenFactory","wBTCPegOracle","EthOracle","ftmOracle","USDCoracle"]