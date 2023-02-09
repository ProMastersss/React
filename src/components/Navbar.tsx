import { QuestionMark } from "@mui/icons-material";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MenuIcon from "@mui/icons-material/Menu";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import * as React from "react";

const pages = [
  { title: "Главная", href: "/" },
  { title: "Треки", href: "/tracks" },
  { title: "Альбомы", href: "/albums" },
  { title: "Блог", href: "/posts" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const icon = (index: number) => {
    switch (index) {
      case 0:
        return <HomeIcon />;

      case 1:
        return <AudioFileIcon />;

      case 2:
        return <LibraryMusicIcon />;

      case 3:
        return <NewspaperIcon />;

      default:
        return <QuestionMark />;
    }
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pages.map((page, index) => (
          <ListItem
            key={page.href}
            disablePadding
            onClick={() => router.push(page.href)}
          >
            <ListItemButton>
              <ListItemIcon>{icon(index)}</ListItemIcon>
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
