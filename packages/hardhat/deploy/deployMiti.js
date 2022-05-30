// example deploy of a oneToken from the factory

module.exports = async function({ ethers: { getNamedSigner }, getNamedAccounts, deployments }) {
    const { deploy } = deployments
  
    const { deployer, dev } = await getNamedAccounts()
  
    const chainId = await getChainId()

    
     const vbtcAddr = "0x9049198f6b21acf1e050cfcf36a6879a07b0bbe4"
     const wbtcaddr = "0x321162Cd933E2Be498Cd2267a90534A804051b11"
     const ethTokenAddr = "0x74b23882a30290451a17c44f4f05243b6b58c76d"
     const wFtmAddr = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83"
     const uniSwapFactory = "0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3"

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
        name = "MitiCushqui"
        url = "strudel.finance"
        symbol = "M",
        versionName = "MitiCushquiV1"

    if (chainId != 1) { //don't deploy to  eth mainnet lol
        const
            collateralToken = indexToken // USDC
            memberToken = vbtcAddr// Should be VBTC
            //collateralToken = await deployments.get("Token6")//testing
            //memberToken = await deployments.get("Token18")//testing
            
            collateralOracle = await deployments.get("USDCPeggedOracle")// should be USDC Oracle
            memberOracle = await deployments.get("vBTCCompositeOracle")// change to composite on mainnet
            console.log("member oracle", memberOracle.address)
            factory = await deployments.get("OneTokenFactory")
            Admin = await ethers.getContractFactory("OneTokenFactory")
            admin = Admin.attach(factory.address)
            oneTokenV1 = await deployments.get("OneTokenV1")
            controllerNull = await deployments.get("NullController")
            mintMasterIncremental = await deployments.get("Incremental")
            console.log("mintMasterIncremental", mintMasterIncremental.address);
       
   

            /*await admin.admitForeignToken(collateralToken, false, collateralOracle.address, {
                from: deployer
            })//*/
            
            await admin.assignOracle(memberToken , memberOracle.address,  {
                from: deployer
            })//*/

            /*await admin.deployOneTokenProxy(
                name,
                symbol,
                deployer,
                oneTokenV1.address,
                controllerNull.address,
                mintMasterIncremental.address,
                collateralOracle.address,
                memberToken,//remove .addr on mmainnet
                collateralToken //remove .addr on mmainnet
            )*/

            let oneTokenAddress = await admin.oneTokenAtIndex(0);

            console.log("*************************************************************")
            console.log("* MitiCushqui: "+ oneTokenAddress)
            console.log("*************************************************************")
        
    }
    

}

module.exports.tags = ["MitiCushqui"]
module.exports.dependencies = ["oneTokenFactory","nullController","mintMasterIncremental","vCompositeOracleB", "USDCPeggedOracle","CompositeOracle","ftmOracle",]