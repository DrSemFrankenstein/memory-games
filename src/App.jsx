import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Home from "./Components/Screens/Home";
import { Route, Routes } from "react-router-dom";
import Reaction from "./Components/Screens/Reaction";
import AppBarComponent from "./Components/AppBarComponent";
import Footer from "./Components/Footer";
import Visualizing from "./Components/Screens/Visualizing";
import Predictions from "./Components/Screens/Predictions";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ position: "relative", zIndex: 1 }}>
          <AppBarComponent />
          <Routes>
            <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
            <Route path="/visualizing/*" element={<Visualizing />} />
            <Route path="/reaction/*" element={<Reaction />} />
            <Route path="/predictions/*" element={<Predictions />} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
