// example deploy of a oneToken from the factory

module.exports = async function({ ethers: { getNamedSigner }, getNamedAccounts, deployments }) {
    const { deploy } = deployments
  
    const { deployer, dev } = await getNamedAccounts()
  
    const chainId = await getChainId()

    const vbtcAddr = "0x9049198f6b21acf1e050cfcf36a6879a07b0bbe4"

    const indexToken = "0x04068da6c83afcfa0e13ba15a6696662335d5b75" // USDC

    const moduleType = {
        version: 0,
        controller: 1,
        strategy: 2,
        mintMaster: 3,
        oracle: 4,
        voterRoll: 5
    }

    const 
        name = "OneToken Instance"
        url = "ichi.org"
        symbol = "OTI",
        versionName = "OneTokenV1"

    if (chainId != 1) { //don't deploy to mainnet
        const
            collateralToken = indexToken // USDC
            memberToken = vbtcAddr// Should be VBTC
            collateralOracle = await deployments.get("ICHIPeggedOracle")// should be USDC Oracle
            memberOracle = await deployments.get("vBTCCompositeOracle")// should be VBTC Oracle
            factory = await deployments.get("OneTokenFactory")
            Admin = await ethers.getContractFactory("OneTokenFactory")
            admin = Admin.attach(factory.address)
            oneTokenV1 = await deployments.get("OneTokenV1")
            controllerNull = await deployments.get("NullController")
            mintMasterIncremental = await deployments.get("Incremental")
       
            await admin.admitForeignToken(memberToken.address, false, memberOracle.address, {
                from: deployer
            })

            await admin.admitForeignToken(collateralToken.address, true, collateralOracle.address, {
                from: deployer
            })


            await admin.deployOneTokenProxy(
                name,
                symbol,
                deployer,
                oneTokenV1.address,
                controllerNull.address,
                mintMasterIncremental.address,
                collateralOracle.address,
                memberToken.address,
                collateralToken.address
            )

            let oneTokenAddress = await admin.oneTokenAtIndex(await admin.oneTokenCount() - 1)

            console.log("*************************************************************")
            console.log("* oneToken: "+ oneTokenAddress)
            console.log("*************************************************************")
        
    }
    

}

module.exports.tags = ["testOneToken","testToken"]
module.exports.dependencies = ["oneTokenFactory","nullController","mintMasterIncremental","testTokens","testMemberTokenOracle","testCollateralTokenOracle"]