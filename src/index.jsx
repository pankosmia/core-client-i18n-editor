import { createRoot } from "react-dom/client";
import { styled } from "@mui/material/styles";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import App from "./App";
import "./index.css";
import { SpaContainer } from "pankosmia-rcl";
// import { createHashRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

function AppLayout() {



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
  );
}

createRoot(document.getElementById("root")).render(<AppLayout />);
