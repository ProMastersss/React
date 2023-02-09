import { Typography } from "@mui/material";
import AppBarMaterial from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/router";
import * as React from "react";
import Navbar from "./Navbar";

export default function AppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMaterial position="fixed">
        <Toolbar>
          <Navbar />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {router.pathname}
          </Typography>
        </Toolbar>
      </AppBarMaterial>
    </Box>
  );
}
