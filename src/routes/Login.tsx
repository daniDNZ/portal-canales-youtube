import { Face4 } from "@mui/icons-material";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ICredentials } from "../auth/auth";
import { AuthActionKind } from "../context/AuthContextProvider";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const formRef = useRef<HTMLFormElement>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const credentials: ICredentials = {
        user: formData.get("user") as string,
        password: formData.get("password") as string,
      };

      auth.dispatchAuth({
        type: AuthActionKind.SIGNIN,
        payload: credentials,
      });

      navigate(from, { replace: true });
    }
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.light" }}>
        <Face4 />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" ref={formRef} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="user-input"
          label="Username"
          name="user"
          autoComplete="user"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password-input"
          autoComplete="current-password"
        />
        <Button
          onClick={handleClick}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
      <Typography component="p" variant="body1">
        Username & Password: admin012
      </Typography>
    </Box>
  );
}
