import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function Root() {
  return (
    <>
      <TopBar />
      <Container component="main" maxWidth="xl" sx={{ pt: 8, pb: 6 }}>
        <Outlet />
      </Container>
    </>
  );
}
