import { gql, useQuery } from "@apollo/client";
import { Button, Input, Table, Typography, Statistic, Col, Row } from "antd";
import "antd/dist/antd.css";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";
import React, { useState } from "react";
import { Address } from "../components";
import { utils } from "ethers";
import { PieChart } from "react-minimal-pie-chart";

const highlight = {
  marginLeft: 4,
  marginRight: 8,
  /* backgroundColor: "#f9f9f9", */ padding: 4,
  borderRadius: 4,
  fontWeight: "bolder",
};

function Subgraph(props) {
  function graphQLFetcher(graphQLParams) {
    return fetch(props.subgraphUri, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  const EXAMPLE_GRAPHQL = `
  {
    totalMitiSupplies {
      id
      totalSupply
  		totalMinted
  		totalBurned
    }
    totalUSDCReserves {
      id
      totalSupply
  		totalMinted
  		totalBurned
    }
    totalvBTCReserves {
      id
      totalDeposits
    }
    minters {
      id
      address
      totalMinted
      totalBurned
    }
  }
  `;
  const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);
  const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

  const t = data && data.totalMitiSupplies && data.totalMitiSupplies[0] && data.totalMitiSupplies[0].totalSupply;
  const c = data && data.totalUSDCReserves && data.totalUSDCReserves[0] && data.totalUSDCReserves[0].totalSupply;
  const v = data && data.totalvBTCReserves && data.totalvBTCReserves[0] && data.totalvBTCReserves[0].totalDeposits;
  const purposeColumns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "totalMinted",
      dataIndex: "totalMinted",
      key: "totalMinted",
    },
    {
      title: "totalBurned",
      dataIndex: "totalBurned",
      key: "totalBurned",
    },
  ];
  const deployWarning = (
    <div style={{ marginTop: 8, padding: 8 }}>Warning: 🤔 Have you deployed your subgraph yet?</div>
  );
  return (
    <>
      <div style={{ margin: "auto", marginTop: 32 }}>
        <h3>MitiCushqui Dashboard</h3>
      </div>
      <Row>
        <Col span={6}>
          <Statistic title="$Miti Supply" value={t ? utils.formatEther(t) : "..."} />
        </Col>
        <Col span={6}>
          {" "}
          <Statistic title="USDC Reserve Supply" value={t ? utils.formatEther(c) : "..."} />
        </Col>
        <Col span={6}>
          <Statistic title="vBTC Reserve Supply:" value={t ? utils.formatEther(v) : "..."} />
        </Col>
        <Col span={6}>
          <Statistic title="Minting Rate:" value={props.rate ? props.rate : "..."} />
        </Col>
      </Row>
      <div style={{ margin: 32, height: 400, border: "1px solid #888888", textAlign: "left" }}>
        {" "}
        <PieChart
          data={[
            { title: "One", value: 10, color: "#E38627" },
            { title: "Two", value: 15, color: "#C13C37" },
            { title: "Three", value: 20, color: "#6A2135" },
          ]}
        />
      </div>

      <div style={{ margin: "auto", marginTop: 32 }}>
        {data ? (
          <Table dataSource={data.minters} columns={purposeColumns} rowKey="id" />
        ) : (
          <Typography>{loading ? "Loading..." : deployWarning}</Typography>
        )}
        <div style={{ margin: 32, height: 400, border: "1px solid #888888", textAlign: "left" }}>
          <GraphiQL fetcher={graphQLFetcher} docExplorerOpen query={EXAMPLE_GRAPHQL} />
        </div>
      </div>
      <div style={{ padding: 64 }}>...</div>
    </>
  );
}

export default Subgraph;
