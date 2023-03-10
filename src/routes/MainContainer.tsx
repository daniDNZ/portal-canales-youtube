import { Outlet } from "react-router-dom";
import ChannelTabs from "../components/ChannelTabs";
import Search from "./Search";

export default function MainContainer() {
  return (
    <>
      <Search />
      <ChannelTabs />
      {/* VIDEOS & DASHBOARD */}
      <Outlet />
    </>
  );
}
