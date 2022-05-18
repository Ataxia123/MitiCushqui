import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";
import { utils } from "ethers";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts, myMainnetUSDCBalance, myMainnetDAIBalance, address, vBTCAddress }) {
  // you can also use hooks locally in your component of choice
  //const purpose = useContractReader(readContracts, "MitiCushqui", "balanceOf");
  const ratio = useContractReader(readContracts, "MitiCushqui", "isOtherToken", [vBTCAddress]);
  return (
    <div>
      <div>
        <h1>This is the MitiMinter</h1>
      </div>
      <div>deposit vBTC & USDC to mint $M</div>
      <div>redeem $M for $USDC</div>
      <div>Orkan DAO manages $M liquidity and is offering bonds here:</div>
      <div> https://y.at/🌪🌪👀</div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>📝</span>
        test addr: {vBTCAddress}
        <div>Is token Member?:{ratio ? ` is true!` : " is false?"}</div>
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          mint $$$!
        </span>
      </div>
      DAI Balance: {myMainnetDAIBalance ? utils.formatEther(myMainnetDAIBalance) : "..."}
      <div>USDC Balance: {myMainnetUSDCBalance ? utils.formatEther(myMainnetUSDCBalance) : "..."}</div>
    </div>
  );
}

export default Home;
