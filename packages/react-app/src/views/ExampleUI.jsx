import { SyncOutlined } from "@ant-design/icons";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { Address, Balance } from "../components";
import { useContractReader, useNonce } from "eth-hooks";
import { EtherInput, AddressInput } from "../components/index";
import { parseEther, formatEther } from "@ethersproject/units";

export default function ExampleUI({
  purpose,
  setPurposeEvents,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
  vBTCAddress,
  myMainnetDAIBalance,
  myMainnetUSDCBalance,
}) {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(0);

  // keep track of a variable from the contract in the local React state:
  const yourBalance = useContractReader(readContracts, "Smile", "balanceOf", [address]);
  console.log("🤗 balance:", yourBalance);

  const lockedBalance = useContractReader(readContracts, "Smile", "reserveBalance");
  console.log("locked balance:", lockedBalance);

  const yourLockedBalance = useContractReader(readContracts, "Smile", "userLockedBalance", [address]);
  console.log("your locked balance:", yourLockedBalance);

  let nonce = useNonce(localProvider, address);
  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>😃 This is the MitiMintere </h2>

        <h4>Your 😃 Balance: {myMainnetDAIBalance ? formatEther(myMainnetDAIBalance) : 0}</h4>

        <h4>Your USDC Balance: {myMainnetUSDCBalance ? formatEther(myMainnetUSDCBalance) : 0}</h4>

        <Divider />

        <div style={{ margin: 8 }}>
          <EtherInput
            price={price}
            value={amount}
            onChange={value => {
              setAmount(parseEther(value));
            }}
          />
          <br />
          <br />

          <Button
            onClick={async () => {
              const result = tx(writeContracts.MitiCushqui.mint(vBTCAddress, amount), update => {
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
            Mint
          </Button>
        </div>

        <br />
        <br />
        <div style={{ margin: 8 }}>
          <EtherInput
            address={vBTCAddress}
            price={price}
            value={amount}
            placeholder={"😃 Amount to Burn"}
            onChange={value => {
              setAmount(utils.parseEther(value));
            }}
          />
          <br />
          <br />
          <Button
            onClick={async () => {
              const result = tx(writeContracts.MitiCushqui.redeem(vBTCAddress, amount), update => {
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
            Redeem
          </Button>
        </div>
        <br />
        <br />
        <div style={{ margin: 8 }}>
          <AddressInput
            autoFocus
            ensProvider={mainnetProvider}
            placeholder="to address"
            value={toAddress}
            onChange={setToAddress}
          />
          <br />
          <EtherInput
            price={price}
            value={amount}
            onChange={value => {
              setAmount(value);
            }}
          />
          <br />
          <br />
          <Button
            onClick={() => {
              console.log(amount);
              console.log(toAddress);
              /* look how you call setPurpose on your contract: */
              tx(writeContracts.MitiCushqui.transfer(toAddress, parseEther(amount)));
            }}
          >
            Transfer{" "}
          </Button>
        </div>
      </div>

      {/*
        📑 Maybe display a list of events?
          (uncomment the event and emit line in YourContract.sol! )
      */}
    </div>
  );
}
