/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, CircularProgress } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./Layout.jsx";
import ThemeProvider from "./components/ThemeProvider.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const PostCreate = lazy(() => import("./pages/PostCreate.jsx"));
const PostDetails = lazy(() => import("./pages/PostDetails.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);

function InitialLoader() {
  return (
    <Box sx={{ textAlign: "center", mt: "222px" }}>
      <CircularProgress size={80} />
    </Box>
  );
}
