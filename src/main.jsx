import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import '@google/model-viewer';
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

function Root() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() =>
    createTheme({
      palette: { mode },
    }),
    [mode]
  );

  const router = createRouter({
    routeTree,
    context:{
      mode,
      setMode
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools/> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);