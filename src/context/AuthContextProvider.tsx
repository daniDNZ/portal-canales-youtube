import { useReducer, createContext } from "react";
import { checkAuth, ICredentials } from "../auth/auth";
import { getSession, setSession } from "../utils/manageSession";

export enum AuthActionKind {
  SIGNIN = "SIGNIN",
  SIGNOUT = "SIGNOUT",
}

interface IAction {
  type: AuthActionKind;
  payload?: ICredentials;
}

interface IAuthState {
  user: string;
}

interface IAuthContext {
  auth: IAuthState;
  dispatchAuth: React.Dispatch<IAction>;
}

// Create context
export const AuthContext = createContext<IAuthContext>(null!);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const authReducer = (_state: IAuthState, action: IAction) => {
    let newState: IAuthState = { user: "" };
    switch (action.type) {
      case "SIGNIN":
        newState.user =
          action.payload && checkAuth(action.payload)
            ? action.payload.user
            : "";
        setSession(JSON.stringify(newState));
        return newState;
      case "SIGNOUT":
      default:
        newState.user = "";
        setSession(JSON.stringify(newState));
        return newState;
    }
  };

  // Get the user from localStorage if exists to recover the session
  const initialAuth = JSON.parse(getSession() || '{"user": ""}');

  const [auth, dispatchAuth] = useReducer(authReducer, initialAuth);

  return (
    <AuthContext.Provider
      value={{
        auth,
        dispatchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
