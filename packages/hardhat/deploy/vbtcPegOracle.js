module.exports = async function({ ethers: { getNamedSigner }, getNamedAccounts, deployments }) {
    const { deploy } = deployments
  
    const { deployer, dev } = await getNamedAccounts()
  
    const chainId = await getChainId()

    const wbtcaddr = "0x9049198f6b21acf1e050cfcf36a6879a07b0bbe4"

    const moduleType = {
        version: 0,
        controller: 1,
        strategy: 2,
        mintMaster: 3,
        oracle: 4,
        voterRoll: 5
    }

    const 
        name = "vBTC Pegged Oracle"
        url = "strudel.finance"

    if (chainId != 1) { //don't deploy to mainnet
        const
            memberToken = wbtcaddr
            factory = await deployments.get("OneTokenFactory")
            Admin = await ethers.getContractFactory("OneTokenFactory")
            admin = Admin.attach(factory.address)

        const oracle = await deploy("vBTCPegOracle", {
            from: deployer,
            args: [factory.address, name, memberToken],
            log: true
        })

        if (chainId != 250) { //don't verify contract on localnet
            await hre.run("verify:verify", {
                address: oracle.address,
                contract: "contracts/oracle/pegged/vBTCPegOracle.sol:vBTCPegOracle",
                constructorArguments: [
                    factory.address,
                    name,
                    memberToken
                ],
            })
        }
    
        /*await admin.admitModule(oracle.address, moduleType.oracle, name, url, {
            from: deployer
        })   //*/ 
    }
    

}

module.exports.tags = ["vBTCPegOracle", "init"]
module.exports.dependencies = ["oneTokenFactory"]