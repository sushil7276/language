import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const style = {
  color: "white",
  margin: "0.5rem",
  textDecoration: "none",
};

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" mr={"auto"} textTransform={"uppercase"}>
          <Link style={{ color: "white" }} to={"/"}>
            Learn
          </Link>
        </Typography>
        <Link style={style} to={"/"}>
          Home
        </Link>
        <Link style={style} to={"/login"}>
          Login
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
