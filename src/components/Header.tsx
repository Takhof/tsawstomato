import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useUser } from "../context/AuthContext";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import router, { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";

import {
  Button,
  createStyles,
  Theme,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import { Auth } from "aws-amplify";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 32,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    typography: {
      fontfamily: "Roboto",
      body: "Roboto",
    },
  })
);

export default function Header() {
  const classes = useStyles();
  const router = useRouter();
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    await Auth.signOut();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={() => router.push(`/`)}
          >
            <CatchingPokemonIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tomato Forum
          </Typography>
          {user && (
            <div>
              <Tooltip title="Create Post">
                <IconButton
                  onClick={() => router.push(`/create`)}
                  aria-label="create"
                  color="inherit"
                >
                  <AddIcon></AddIcon>
                </IconButton>
              </Tooltip>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  style={{ marginLeft: ".5rem", marginRight: ".5rem" }}
                  onClick={() => signOut()}
                >
                  Sign Out
                </MenuItem>
              </Menu>
            </div>
          )}
          {!user && (
            <>
              <Button variant="outlined" onClick={() => router.push(`/login`)}>
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push(`/signup`)}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
