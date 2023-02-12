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
import Root from "./routes/Root";
import Search from "./routes/search/Search";

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
            <Search />
          </RequireAuth>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
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
    <AuthContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
