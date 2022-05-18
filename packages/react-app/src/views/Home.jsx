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
function Home({ yourLocalBalance, readContracts, myMainnetUSDCBalance, myMainnetDAIBalance }) {
  // you can also use hooks locally in your component of choice
  //const MitiRate = useContractReader(readContracts, "MitiCushqui", "getMintingRatio", [readContracts.Token18.address]);
  return (
    <div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>📝</span>
        MitiCushqui Minter Contract Front End
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
