import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes } from "@generouted/react-router";
import { MantineProvider } from "@mantine/core";
import theme from "./lib/theme";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </MantineProvider>
);
