import { LogoutOutlined, VideoCameraBackOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import { AuthActionKind } from "../context/AuthContextProvider";
import useAuth from "../hooks/useAuth";

export default function Root() {
  const auth = useAuth();
  const signOutButton = auth.auth.user.length > 0 && (
    <IconButton
      color="primary"
      aria-label="Sign Out"
      component="label"
      size="small"
      onClick={() =>
        auth.dispatchAuth({
          type: AuthActionKind.SIGNOUT,
        })
      }
    >
      <LogoutOutlined />
    </IconButton>
  );

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <VideoCameraBackOutlined sx={{ transform: "scaleX(-1)" }} />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            YTPortal
          </Typography>
          {signOutButton}
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xl" sx={{ pt: 8, pb: 6 }}>
        <Outlet />
      </Container>
    </>
  );
}
