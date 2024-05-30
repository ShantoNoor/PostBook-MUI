import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, CircularProgress } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";

const Home = lazy(() => import("./pages/Home.jsx"));
const PostCreate = lazy(() => import("./pages/PostCreate.jsx"));
const PostDetails = lazy(() => import("./pages/PostDetails.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post-details",
        element: <PostDetails />,
      },
      {
        path: "/post-create",
        element: <PostCreate />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<InitialLoader />}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);

// eslint-disable-next-line react-refresh/only-export-components
function InitialLoader() {
  return (
    <Box sx={{ textAlign: "center", mt: "222px" }}>
      <CircularProgress size={80} />
    </Box>
  );
}
