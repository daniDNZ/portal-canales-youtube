import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { store } from "./app/store";
import RequireAuth from "./components/RequireAuth";
import AuthContextProvider from "./context/AuthContextProvider";
import reportWebVitals from "./reportWebVitals";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import MainContainer from "./routes/MainContainer";
import Root from "./routes/Root";
import Videos from "./routes/Videos";

// MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0088FE",
    },
    secondary: {
      main: "#FF8042",
    },
    background: {
      default: grey[100],
    },
  },
  components: {},
});

// Routes
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/",
        element: (
          <RequireAuth>
            <MainContainer />
          </RequireAuth>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/",
            element: <Videos />,
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(routes, {
  basename: process.env.PUBLIC_URL,
});

// React root
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <AuthContextProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
