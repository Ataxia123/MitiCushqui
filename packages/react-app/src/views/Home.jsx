import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import { ApolloProvider } from "@apollo/client";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/

function Home({
  readContracts,
  myMainnetUSDCBalance,
  address,
  vBTCAddress,
  USDCAddress,
  writeContracts,
  tx,
  mitiAddr,
  myMainnetvBTCBalance,
  myMainnetMitiBalance,
}) {
  // you can also use hooks locally in your component of choice
  //const purpose = useContractReader(readContracts, "MitiCushqui", "balanceOf");
  const [newPurpose, setNewPurpose] = useState("loading...");
  const ratio = useContractReader(readContracts, "MitiCushqui", "isCollateral", [vBTCAddress]);
  const vBTCallowance = useContractReader(readContracts, "Token18", "allowance", [address, mitiAddr]);
  console.log("🤗 vBTCallowance:", vBTCallowance);
  const USDCAllowance = useContractReader(readContracts, "Token6", "allowance", [address, mitiAddr]);
  const mitiAllowance = useContractReader(readContracts, "MitiCushqui", "allowance", [address, mitiAddr]);
  // check if there is allowance before calling contract

  return (
    <div>
      <div>
        <h1>This is the MitiMinter</h1>
      </div>
      <h2>Deposit vBTC & USDC to mint $M</h2>
      <h2>Redeem $M for $USDC</h2>
      <h2>Orkan DAO manages $M liquidity and is offering bonds here:</h2>
      <h2> https://y.at/🌪🌪👀</h2>
      <div style={{ margin: 32 }}>
        <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
          <span style={{ marginRight: 8 }}>📝</span>
          test Miti addr: {mitiAddr}
          <div>Is token Collateral?:{ratio ? ` Yes!` : " Not Collateral"}</div>
          <div>Is token Allowed?:{USDCAllowance === 0 ? `No` : "Yes"}</div>
          <div>vBTCAllowance:{vBTCallowance ? utils.formatEther(vBTCallowance) : "..."}</div>
          <div>USDCAllowance:{USDCAllowance ? utils.formatEther(USDCAllowance) : "..."}</div>
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
                if (utils.formatEther(vBTCallowance) < utils.formatEther(newPurpose)) {
                  // if there is no allowance, approve first
                  // tx settings
                  const result1 = tx(writeContracts.Token18.approve(mitiAddr, newPurpose), update => {
                    // logging tx updates
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
                  console.log("newPurpose:", utils.formatEther(newPurpose));
                  console.log("awaiting metamask/web3 confirm result...", result1);
                  console.log(await result1);
                } else if (utils.formatEther(USDCAllowance) > utils.formatEther(newPurpose)) {
                  const result2 = tx(writeContracts.Token6.approve(mitiAddr, newPurpose), update => {
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
                  console.log("awaiting metamask/web3 confirm result...", result2);
                  console.log(await result2);
                } else {
                  const result3 = tx(writeContracts.MitiCushqui.mint(USDCAddress, newPurpose), update => {
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
                  console.log("awaiting metamask/web3 confirm result...", result3);
                  console.log(await result3);
                }
              }}
            >
              Mint Cushqui{" "}
            </Button>
          </div>
          <Input
            style={{ marginTop: 80 }}
            onChange={e => {
              setNewPurpose(utils.parseEther(e.target.value));
            }}
          />
          <div>
            <Button
              style={{ marginTop: 8 }}
              onClick={async () => {
                // logging tx updates

                const result = tx(writeContracts.MitiCushqui.redeem(USDCAddress, newPurpose), update => {
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
              Redeem Cushqui{" "}
            </Button>
          </div>
          <span
            className="highlight"
            style={{
              marginLeft: 4,
              /* backgroundColor: "#f9f9f9", */ padding: 4,
              borderRadius: 4,
              fontWeight: "bolder",
            }}
          >
            mint $$$!
          </span>
        </div>
      </div>
      $M Balance: {myMainnetMitiBalance ? utils.formatEther(myMainnetMitiBalance) : "..."}
      <div>USDC Balance: {myMainnetUSDCBalance ? utils.formatEther(myMainnetUSDCBalance) : "..."}</div>
      <div>vBTC Balance: {myMainnetvBTCBalance ? utils.formatEther(myMainnetvBTCBalance) : "..."}</div>
    </div>
  );
}

export default Home;
