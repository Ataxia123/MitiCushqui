import  {Minter, MinterCounter, RedeemerCounter, TotalMitiSupply, TotalvBTCReserve, TotalUSDCReserve } from "../generated/schema";
import  {Minted, Redeemed} from "../generated/OneTokenV1/OneTokenV1";
import { BigInt } from '@graphprotocol/graph-ts';
import { integer, decimal, DEFAULT_DECIMALS, ZERO_ADDRESS } from '@protofire/subgraph-toolkit'

export function handleMinted(event: Minted): void {

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
    minter.totalMinted = minter.totalMinted + event.params.oneTokens
    minter.save()

    // MitiSupply
    let mitisupply = TotalMitiSupply.load(event.address.toHex())
    if (mitisupply == null) {
        mitisupply = new TotalMitiSupply(event.address.toHex())
        mitisupply.totalSupply = BigInt.fromI32(0)
        mitisupply.totalMinted = BigInt.fromI32(0)
        mitisupply.totalBurned = BigInt.fromI32(0)
    } 
    mitisupply.totalSupply = mitisupply.totalSupply + event.params.oneTokens
    mitisupply.totalMinted = mitisupply.totalMinted + event.params.oneTokens
    mitisupply.save()

    let totalvBTCReserve = TotalvBTCReserve.load('singleton')
    if (totalvBTCReserve == null) {
        totalvBTCReserve = new TotalvBTCReserve('singleton')
        totalvBTCReserve.totalDeposits = BigInt.fromI32(0)
        }
    totalvBTCReserve.totalDeposits = totalvBTCReserve.totalDeposits + event.params.memberTokens
    totalvBTCReserve.save()

    let totalUSDCReserve = TotalUSDCReserve.load(event.params.collateral.toHex())
    if (totalUSDCReserve == null) {
        totalUSDCReserve = new TotalUSDCReserve(event.params.collateral.toHex())
        totalUSDCReserve.totalSupply = BigInt.fromI32(0)
        totalUSDCReserve.totalMinted = BigInt.fromI32(0)
        totalUSDCReserve.totalBurned = BigInt.fromI32(0)
    }
    let precision = decimal.getPrecision(12)
    totalUSDCReserve.totalSupply = totalUSDCReserve.totalSupply + (event.params.collateralTokens * precision)
    totalUSDCReserve.totalMinted = totalUSDCReserve.totalMinted + (event.params.collateralTokens * precision)
    totalUSDCReserve.save()
} // handleMinted

export function handleRedeemed(event: Redeemed): void {

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
    minter.totalBurned = minter.totalBurned + event.params.amount
    minter.save()

    // MitiSupply
    let mitisupply = TotalMitiSupply.load(event.address.toHex())
    if (mitisupply == null) {
        mitisupply = new TotalMitiSupply(event.address.toHex())
        mitisupply.totalSupply = BigInt.fromI32(0)
        mitisupply.totalBurned = BigInt.fromI32(0)
    } 
    mitisupply.totalSupply = mitisupply.totalSupply - event.params.amount
    mitisupply.totalBurned = mitisupply.totalBurned + event.params.amount
    mitisupply.save()

    let totalUSDCReserve = TotalUSDCReserve.load(event.params.collateral.toHex())
    if (totalUSDCReserve == null) {
        totalUSDCReserve = new TotalUSDCReserve(event.params.collateral.toHex())
        totalUSDCReserve.totalSupply = BigInt.fromI32(0)
        totalUSDCReserve.totalMinted = BigInt.fromI32(0)
        totalUSDCReserve.totalBurned = BigInt.fromI32(0)
    }
    totalUSDCReserve.totalSupply = totalUSDCReserve.totalSupply - event.params.amount
    totalUSDCReserve.totalBurned = totalUSDCReserve.totalBurned + event.params.amount
    totalUSDCReserve.save()
} // handleRedeemed

