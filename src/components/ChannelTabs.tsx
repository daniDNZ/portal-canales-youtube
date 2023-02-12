import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ChannelTabs() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  const handleChange = (_ev: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
    const routes = ["videos", "dashboard"];
    navigate(routes[newTab]);
  };
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Videos" {...a11yProps(0)} />
        <Tab label="Statistics" {...a11yProps(1)} />
      </Tabs>
    </Box>
  );
}
