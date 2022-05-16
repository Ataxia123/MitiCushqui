module.exports = async function({ ethers: { getNamedSigner }, getNamedAccounts, deployments }) {
    const { deploy } = deployments
  
    const { deployer, dev } = await getNamedAccounts()
  
    const chainId = await getChainId()

    const wbtcaddr = "0x321162Cd933E2Be498Cd2267a90534A804051b11"

    const moduleType = {
        version: 0,
        controller: 1,
        strategy: 2,
        mintMaster: 3,
        oracle: 4,
        voterRoll: 5
    }

    const 
        name = "MemberToken Test Oracle"
        url = "ichi.org"

    if (chainId != 1) { //don't deploy to mainnet
        const
            memberToken = wbtcaddr
            factory = await deployments.get("OneTokenFactory")
            Admin = await ethers.getContractFactory("OneTokenFactory")
            admin = Admin.attach(factory.address)

        const oracle = await deploy("wBTCPeggeOracle", {
            from: deployer,
            args: [factory.address, name, memberToken.address],
            log: true
        })

        if (chainId != 31337) { //don't verify contract on localnet
            await hre.run("verify:verify", {
                address: oracle.address,
                constructorArguments: [
                    factory.address,
                    name,
                    memberToken.address
                ],
            })
        }
    
        await admin.admitModule(oracle.address, moduleType.oracle, name, url, {
            from: deployer
        })    
    }
    

}

module.exports.tags = ["testMemberTokenOracle"]
module.exports.dependencies = ["oneTokenFactory"]