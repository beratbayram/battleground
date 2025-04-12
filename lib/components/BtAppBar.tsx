"use client";

import MenuIcon from "@mui/icons-material/Menu";
import RadarIcon from "@mui/icons-material/Radar";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ComponentProps, Fragment, MouseEvent, useState } from "react";
import { BtContainer } from "./BtContainer";
import { BtLink } from "./BtLink";
import { BtButton } from "./BtButton";

interface Props {
  pages?: string[];
  settings?: string[];
}

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export function BtAppBar({}: Props) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  function handleOpenNavMenu(event: MouseEvent<HTMLElement>) {
    setAnchorElNav(event.currentTarget);
  }

  function handleOpenUserMenu(event: MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseNavMenu() {
    setAnchorElNav(null);
  }

  const pages = (color?: ComponentProps<typeof BtButton>["color"]) => [
    <BtLink
      key={0}
      color={color}
      onClick={handleCloseNavMenu}
      href="/home/fields"
    >
      Alanlar
    </BtLink>,
    <BtLink
      key={1}
      color={color}
      onClick={handleCloseNavMenu}
      href="/home/units"
    >
      Birimler
    </BtLink>,
    <BtLink key={2} color={color} onClick={handleCloseNavMenu} href="/home/map">
      Harita
    </BtLink>,
  ];

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  return (
    <AppBar position="static" sx={{ marginBottom: 2 }} aria-hidden="false">
      <BtContainer>
        <Toolbar disableGutters>
          <RadarIcon sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={!!anchorElNav}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {pages().map((page, index) => (
                  <Fragment key={index}>{page}</Fragment>
                ))}
              </Box>
            </Menu>
          </Box>
          <RadarIcon sx={{ display: { xs: "flex", sm: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", sm: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              color: "white",
            }}
          >
            {pages("inherit").map((page, index) => (
              <Fragment key={index}>{page}</Fragment>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* TODO: Add avatar image */}
                <Avatar alt="Remy Sharp" src="" />{" "}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={!!anchorElUser}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </BtContainer>
    </AppBar>
  );
}
