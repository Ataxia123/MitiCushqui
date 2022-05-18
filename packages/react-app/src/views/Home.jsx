import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/

function Home({ readContracts, myMainnetUSDCBalance, myMainnetDAIBalance, address, vBTCAddress, writeContracts, tx }) {
  // you can also use hooks locally in your component of choice
  //const purpose = useContractReader(readContracts, "MitiCushqui", "balanceOf");
  const [newPurpose, setNewPurpose] = useState("loading...");
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
        <div>Is token Member?:{ratio ? ` is true!` : " Collateral"}</div>
        <Input
          onChange={e => {
            setNewPurpose(utils.parseEther(e.target.value));
          }}
        />
        <div>
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(writeContracts.MitiCushqui.mint(vBTCAddress, newPurpose), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            mint stuff
          </Button>
        </div>
        <Input
          onChange={e => {
            setNewPurpose(utils.parseEther(e.target.value));
          }}
        />
        <div>
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(writeContracts.MitiCushqui.redeem(vBTCAddress, newPurpose), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            burn stuff
          </Button>
        </div>
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          mint $$$!
        </span>
      </div>
      $M Balance: {myMainnetDAIBalance ? utils.formatEther(myMainnetDAIBalance) : "..."}
      <div>USDC Balance: {myMainnetUSDCBalance ? utils.formatEther(myMainnetUSDCBalance) : "..."}</div>
    </div>
  );
}

export default Home;
