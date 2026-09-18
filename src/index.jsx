import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { getAndSetJson } from "pankosmia-lib/http";
import App from "./App";
import "./index.css";
import { SpaContainer, fallbackTheme } from "pankosmia-rcl";
// import { createHashRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

function AppLayout() {
  const [themeSpec, setThemeSpec] = useState(fallbackTheme);

  useEffect(() => {
    if (
      themeSpec.palette &&
      themeSpec.palette.primary &&
      themeSpec.palette.primary.main &&
      themeSpec.palette.primary.main === "#666"
    ) {
      getAndSetJson({
        url: "/api/app-resources/themes/default.json",
        setter: setThemeSpec,
      }).then();
    }
  }, []);

  const theme = createTheme(
    {
      components: {
        MuiFab: {
          styleOverrides: {
            root: {
              textTransform: "capitalize",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "capitalize",
            },
          },
        },
        MuiTab: {
          styleOverrides: {
            root: {
              textTransform: "capitalize",
            },
          },
        },
      },
    },
    themeSpec,
  );
  const CustomSnackbarContent = styled(MaterialDesignContent)(() => ({
    "&.notistack-MuiContent-error": {
      backgroundColor: "#FDEDED",
      color: "#D32F2F",
    },
    "&.notistack-MuiContent-info": {
      backgroundColor: "#E5F6FD",
      color: "#0288D1",
    },
    "&.notistack-MuiContent-warning": {
      backgroundColor: "#FFF4E5",
      color: "#EF6C00",
    },
    "&.notistack-MuiContent-success": {
      backgroundColor: "#EDF7ED",
      color: "#2E7D32",
    },
  }));
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        Components={{
          error: CustomSnackbarContent,
          info: CustomSnackbarContent,
          warning: CustomSnackbarContent,
          success: CustomSnackbarContent,
        }}
        maxSnack={6}
      >
        <SpaContainer>
          <App />
        </SpaContainer>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(<AppLayout />);
