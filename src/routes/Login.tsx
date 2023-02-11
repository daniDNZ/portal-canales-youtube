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
    <>
      <h1>Login</h1>
      <form ref={formRef}>
        <input id="user-input" type="text" name="user" placeholder="Username" />
        <input
          id="password-input"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button onClick={handleClick}>Login</button>
      </form>
      <span>Username & Password: admin012</span>
    </>
  );
}
