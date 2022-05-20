import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { utils } from "ethers";
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import { ApolloProvider } from "@apollo/client";

function Dashboard({
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


  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <h3>MitiCushqui Total Supply:</h3>
        <h3> MitiCushqui Treasury Balances:</h3>
        <h3>-vBTC: Ammount of vBTC in the treasury</h3>
        <h3>-USDC: Ammount of USDC in the treasury</h3>
      </div>
    </div>
  );
}

export default Dashboard;
