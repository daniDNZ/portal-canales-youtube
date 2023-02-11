import { Outlet } from "react-router-dom";
import { AuthActionKind } from "../context/AuthContextProvider";
import useAuth from "../hooks/useAuth";

export default function Root() {
  const auth = useAuth();
  return (
    <>
      <h1>Root</h1>
      <button
        onClick={() =>
          auth.dispatchAuth({
            type: AuthActionKind.SIGNOUT,
          })
        }
      >
        Logout
      </button>
      <Outlet />
    </>
  );
}
