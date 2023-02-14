import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ChannelTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const routes = ["/", "/dashboard"];
  // Active the correct tab
  const [tab, setTab] = useState(
    routes.findIndex((path) => path === location.pathname)
  );

  const handleChange = (_ev: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
    navigate(routes[newTab]);
  };
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={tab} onChange={handleChange} aria-label="Basic tabs">
        <Tab label="Videos" {...a11yProps(0)} />
        <Tab label="Statistics" {...a11yProps(1)} />
      </Tabs>
    </Box>
  );
}
