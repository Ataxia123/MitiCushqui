import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header({ link, title, subTitle }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <PageHeader  title={title} subTitle={subTitle} style={{ cursor: "pointer", fontSize: 30 }} />
    </a>
  );
}

Header.defaultProps = {
  link: "https://github.com/Ataxia123/StableStrudel",
  title: "MitiCushqui 🌪🌪👀",
  subTitle: "A USD denominated stablecoin backed by vBTC",
};
