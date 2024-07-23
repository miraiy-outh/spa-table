import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { RootPage } from "./pages/root-page/root-page";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RootPage />
    </ThemeProvider>
  );
}

export default App;
