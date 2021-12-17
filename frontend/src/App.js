import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Post from "./components/Post";

import Home from "./components/Home";

import { Grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";

const queryClient = new QueryClient();

// background #32292f
// primary #ce5374
// secondary #ffd166
// error #bf365a
// success #4d936c

const theme = deepMerge(grommet, {
  global: {
    font: {
      family: "Open Sans",
      size: "22px",
      height: "24px",
      lineHeight: "2em",
    },
    colors: {
      brand: '#EF5757',
      backgroundFront: "#150B1E",
      background: "#27173B",
      black: '#150B1E',
      white: '#ECE2D0',
      primary: "#ECE2D0",
      secondary: "#ffd166",
      error: "#EF5757",
      success: "#26E0E3",
      text: {
        dark: "#ECE2D0",
        light: "#150B1E",
      },
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Grommet themeMode="dark" theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":slug" element={<Post />} />
            <Route
            // TODO: 404 page
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </Grommet>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
