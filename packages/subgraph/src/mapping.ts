import  {Minter, MinterCounter, RedeemerCounter, TotalMitiSupply, TotalvBTCReserves, TotalUSDCReserves } from "../generated/schema";
import  {Minted, Redeemed} from "../generated/OneTokenV1/OneTokenV1";
import { BigInt } from '@graphprotocol/graph-ts';

export function handleMinted(event: Minted): void {
    let day = (event.block.timestamp / BigInt.fromI32(60*60*24))
    let minter = Minter.load(event.params.sender.toHex())
    if (minter == null) {
        // Minter
        minter = new Minter(event.params.sender.toHex())
        minter.address = event.params.sender.toHex()
        minter.totalMinted = BigInt.fromI32(0)
        minter.totalBurned = BigInt.fromI32(0)

        // MinterCounter

        let minterCounter = MinterCounter.load('singleton')
        if (minterCounter == null) {
            minterCounter = new MinterCounter('singleton')
            minterCounter.count = 1
        } else {
            minterCounter.count = minterCounter.count + 1
        }
        minterCounter.save()
}
        let mitisupply = TotalMitiSupply.load(event.params.sender.toHex())
        if (mitisupply == null) {
            mitisupply = new TotalMitiSupply(event.params.sender.toHex())
            mitisupply.totalSupply = event.params.oneTokens
            mitisupply.totalMinted = event.params.oneTokens
            mitisupply.totalBurned = BigInt.fromI32(0)
        } else {
            mitisupply.totalSupply = mitisupply.totalSupply + event.params.oneTokens
            mitisupply.totalMinted = mitisupply.totalMinted + event.params.oneTokens
        }
        mitisupply.save()

        let totalvBTCReserves = TotalvBTCReserves.load(event.params.sender.toHex())
        if (totalvBTCReserves == null) {
            totalvBTCReserves = new TotalvBTCReserves(event.params.sender.toHex())
            totalvBTCReserves.totalDeposits = event.params.memberTokens
        } else {
            totalvBTCReserves.totalDeposits = totalvBTCReserves.totalDeposits + event.params.memberTokens

        }
        totalvBTCReserves.save()

        let totalUSDCReserves = TotalUSDCReserves.load(event.params.sender.toHex())
        if (totalUSDCReserves == null) {
            totalUSDCReserves = new TotalUSDCReserves(event.params.sender.toHex())
            totalUSDCReserves.totalMinted = event.params.collateralTokens
            totalUSDCReserves.totalSupply = event.params.collateralTokens
            totalUSDCReserves.totalBurned = BigInt.fromI32(0)
        } else {
            totalUSDCReserves.totalSupply = totalUSDCReserves.totalSupply + event.params.collateralTokens
            totalUSDCReserves.totalMinted = totalUSDCReserves.totalMinted + event.params.collateralTokens
        }
        totalUSDCReserves.save()
   
    minter.totalMinted = minter.totalMinted + event.params.oneTokens
    minter.save() } 



export function handleRedeemed(event: Redeemed): void {
    let day = (event.block.timestamp / BigInt.fromI32(60*60*24))
    let minter = Minter.load(event.params.sender.toHex())
    if (minter == null) {
        // Minter
        minter = new Minter(event.params.sender.toHex())
        minter.address = event.params.sender.toHex()
        minter.totalMinted = BigInt.fromI32(0)
        minter.totalBurned = BigInt.fromI32(0)

        // MinterCounter

        let redeemerCounter = RedeemerCounter.load('singleton')
        if (redeemerCounter == null) {
            redeemerCounter = new RedeemerCounter('singleton')
            redeemerCounter.count = 1
        } else {
            redeemerCounter.count = redeemerCounter.count + 1
        }
        redeemerCounter.save()

        let mitisupply = TotalMitiSupply.load(event.params.sender.toHex())
        if (mitisupply == null) {
            mitisupply = new TotalMitiSupply(event.params.sender.toHex())
            mitisupply.totalSupply = event.params.amount
            mitisupply.totalMinted = event.params.amount
            mitisupply.totalBurned = BigInt.fromI32(0)
        } else {
            mitisupply.totalSupply = mitisupply.totalSupply - event.params.amount
            mitisupply.totalBurned = mitisupply.totalBurned + event.params.amount
        }
        mitisupply.save()

        let totalUSDCReserves = TotalUSDCReserves.load(event.params.sender.toHex())
        if (totalUSDCReserves == null) {
            totalUSDCReserves = new TotalUSDCReserves(event.params.sender.toHex())
            totalUSDCReserves.totalMinted = event.params.amount
            totalUSDCReserves.totalBurned = BigInt.fromI32(0)
        } else {
            totalUSDCReserves.totalSupply = totalUSDCReserves.totalSupply - event.params.amount
            totalUSDCReserves.totalBurned = totalUSDCReserves.totalBurned + event.params.amount
        }
        totalUSDCReserves.save()
    minter.totalBurned = minter.totalBurned + event.params.amount
    minter.save()
    }   }