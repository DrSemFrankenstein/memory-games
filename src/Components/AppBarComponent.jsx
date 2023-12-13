import MyCustomIcon from "./MyCustomIcon";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { brainIconPath } from "../assets/icons";
import { useNavigate } from "react-router-dom";

export default function AppBarComponent() {
  const navigate = useNavigate();
  return (
    // <AppBar position="relative">
    <AppBar position="fixed">
      <Toolbar>
        <MyCustomIcon mysvgicon={brainIconPath} onClick={() => navigate("/")} />
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ ml: 1 }}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Memory Games
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
