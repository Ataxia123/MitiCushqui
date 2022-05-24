import React from "react";
import { Typography, Divider, Tooltip } from "antd";
import { utils } from "ethers";
import statici from "../assets/scape-4392.png";

const { Title, Paragraph, Text, Link } = Typography;

export default function Hints() {
  return (
    <div
      style={{
        marginTop: 1,
      }}
    >
      <Typography style={{ textAlign: "left", margin: 50, marginBottom:150, fontSize: 14 }}>
        <Title
          level={2}
          style={{ backgroundImage: `url(${statici})`, backgroundPosition: "center", backgroundSize: "cover" }}
        >
          {" "}
          The Stablecoin Problem...
        </Title>
        <Paragraph>
          USD denominated Stablecoins serve a critical role in the crypto economy. They are useful as a frame of
          reference for measuring value and are also essentially inversely correlated with every other crypto asset.
        </Paragraph>
        <Paragraph>
          Having uncorrelated and inversely related assets allows users to stay in the ecosystem regardless of
          directional bias. This is critical for the continued growth of any economy. At the end of the day, a true bear
          market is the absence of users. However...<div style={{ marginTop: 10 }}></div>{" "}
          <Text strong>
            "Not everything that shines is gold... And not everything worth a dollar is a Stablecoin." -Anon
          </Text>
          .
        </Paragraph>

        <Paragraph>
          There are a number of stablecoins available in the market. These have distinct risk profiles which range from
          deppeging to regulation by centralized authorities. Any stablecoin must balance these risks in order to offer
          a unique value propositon. Furthermore, there must be incentives such as yield opportunities available for the
          stablecoin holders in order to mantain a growing user base.
        </Paragraph>
        <Title level={2}>Introducing 🏦💰💵MitiCushqui💵💰🏦</Title>

        <Paragraph>
          The word MitiCushqui comes from the Kechwa language and means{" "}
          <Text strong>Digital("Miti") Money("Cushqui")</Text>. MitiCushqui ($M) is a stablecoin minted by depositing
          vBTC and USDC at a ratio determined by the protocol with a default of 20/80. Each $M is redeemable for 1 USDC
          as long as the supply lasts. The minting ratio can be adjusted to procure sufficient collateral for
          redemptions, while the underlying assets can be deployed in yield bearing strategies to attract more users and
          build reserves to service redemptions if required.
        </Paragraph>
        <Paragraph>
          The goal of MitiCushqui is to become a predominantly BTC backed stablecoin, while holding enough reserves to
          service redemptions in all market conditions. Furthermore, the treasury reserve yields will be paid back to $M
          holders - which allows users to have a more stable store of wealth to use throughout DeFi.
        </Paragraph>
        <Paragraph>
          <Title level={2}>Audited Contracts</Title>
          MitiCushqui is built using the Ichi.org codebase. This code has been previously audited and battle tested in
          ETH mainnet and has proved to be a reliable system to create a stable pegged asset.
        </Paragraph>
        <Paragraph>
          <Title level={2}>
            Enter the Orkan <a href="https://y.at/🌪️🌪️👀">🌪️🌪️👀</a>
          </Title>
          Orkan.Finance will serve as the decentralized monetary authority for MitiCushqui. The Orkan will be issuing
          bonds for $M with the goal of owning a large amount of $M in the future. The Orkan will be the largest
          repository of $M ensuring every user has the ability to redeem their full balance at any point in time
          regardless of market circumstances. Furthermore Orkan will create proposals for gauges and incentives to
          provide $M/wsORK liquidity in order to provide stable yields for users
        </Paragraph>
        <Title level={2}>The first Crypto-Long stablecoin</Title>
        <Paragraph>
          The minter contract is designed to redeem $M for USDC only. As BTC appreciates in value over time the surplus
          will be redeployed back to $M holders. Furthermore, The vBTC used to mint $M will be managed by the Orkan with
          the objective of securing yields for $M holders in order to attract a long term user base that utilizes $M as
          a store of value. The Minter Contract for stablecoins can use different collaterals and member tokens to make
          backed stablecoins. We plan to use $M as the sole collateral for further stablecoins while integrating new
          types of member tokens (Such as FUSD)which will increase demand for $M as arbitrage between different stables
          occurs. We are excited for the new opportunities available with this structure.
        </Paragraph>
        <Paragraph></Paragraph>
        <Title level={2}>vBTC Pricing</Title>

        <Paragraph>
          The initial $M oracle assumes an equivalence between vBTC and wBTC. Therefore,{" "}
          <Text strong>
            until vBTC peg is met stablecoins issued may be undercollateralized by up to 20% (20 % vBTC/BTC rate)
            current delta). To remedy this the Orkan treasury will deploy additional vBTC in order to overcollateralize
            deposits. Since vBTC is provably scrarce and can only be minted by burning the equivalent amount of BTC, we
            expect this to be a temporary situation and that the Orkan will be able to maintain a stable vBTC peg for
            both $M and $vBTC.
          </Text>{" "}
          We assume that market forces should quickly close the peg difference once the stablecoin is live. Further
          Oracles will be developed once vBTC liquidity reaches adequate levels. The current setup makes it unviable to
          arbitrarily inflate vBTC price to mint extra stablecoins.
        </Paragraph>
      </Typography>
    </div>
  );
}
