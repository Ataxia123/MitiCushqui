module.exports = async function({ ethers: { getNamedSigner }, getNamedAccounts, deployments }) {
    const { deploy } = deployments
  
    const { deployer, dev } = await getNamedAccounts()
  
    const chainId = await getChainId()

    const usdcaddr = "0x04068da6c83afcfa0e13ba15a6696662335d5b75"

    const moduleType = {
        version: 0,
        controller: 1,
        strategy: 2,
        mintMaster: 3,
        oracle: 4,
        voterRoll: 5
    }

    const 
        name = "Collateral Pegged Test Oracle"
        url = "ichi.org"

    if (chainId != 1) { //don't deploy to mainnet
        const 
            collateralToken = usdcaddr
            factory = await deployments.get("OneTokenFactory")
            Admin = await ethers.getContractFactory("OneTokenFactory")
            admin = Admin.attach(factory.address)

        const oracle = await deploy("USDCPeggedOracle", {
            from: deployer,
            args: [factory.address, name, collateralToken],
            log: true
        })

        if (chainId != 31337) { //don't verify contract on localnet
            await hre.run("verify:verify", {
                address: oracle.address,
                constructorArguments: [
                    factory.address,
                    name,
                    collateralToken
                ],
            })
        }
    
        await admin.admitModule(oracle.address, moduleType.oracle, name, url, {
            from: deployer
        })
    }
    

}

module.exports.tags = ["USDCPeggedOracle"]
module.exports.dependencies = ["oneTokenFactory"]