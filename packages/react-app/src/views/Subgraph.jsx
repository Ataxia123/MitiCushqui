import { gql, useQuery } from "@apollo/client";
import { Button, Input, Table, Typography } from "antd";
import "antd/dist/antd.css";
import GraphiQL from "graphiql";
import "graphiql/graphiql.min.css";
import fetch from "isomorphic-fetch";
import React, { useState } from "react";
import { Address } from "../components";

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
  }
  `;
  const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);
  const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

  const purposeColumns = [
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
    {
      title: "totalSupply",
      dataIndex: "totalSupply",
      key: "totalSupply",
    },
    {
      title: "Sender",
      key: "id",
      dataIndex: "id",},
  ];

  const [newPurpose, setNewPurpose] = useState("loading...");

  const deployWarning = (
    <div style={{ marginTop: 8, padding: 8 }}>Warning: 🤔 Have you deployed your subgraph yet?</div>
  );

  return (
    <>
      <div style={{ margin: "auto", marginTop: 32 }}></div>

      <div style={{ width: 780, margin: "auto", paddingBottom: 64 }}>
        <div style={{ margin: 32, textAlign: "right" }}>
          <Input
            onChange={e => {
              setNewPurpose(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              console.log("newPurpose", newPurpose);
              /* look how you call setPurpose on your contract: */
              props.tx(props.writeContracts.YourContract.setPurpose(newPurpose));
            }}
          >
            Set Purpose
          </Button>
        </div>

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
