import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Tooltip, Box, CssBaseline, Drawer, styled, createStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpen from '@material-ui/icons/MenuOpen';
import MaterialUISwitch from '../SanSwitch';
import LeftNav from './leftNav';

const drawerWidth = 300;

const Main = styled('div', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'sx' })<{
  open?: boolean;
}>(({ theme, open, sx }) => createStyles({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: '100%',
  // marginLeft: {xs: 0, sm: `-${drawerWidth}px`},
  // marginLeft: `-${drawerWidth}px`,
  
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export interface LayoutProps {
  // props
  updateTheme: (v: boolean) => void,
  skin?: boolean,
}

const Layout: React.SFC<LayoutProps> = props => {
  // const { props } = props;

  const {
    updateTheme,
    skin = false,
  } = props;

  const [skip, setSkip] = React.useState(skin);
  const [open, setOpen] = React.useState(false);

  const handleChangeSkip = (v: React.ChangeEvent<HTMLInputElement>) => {
    setSkip(v.target.checked);
    updateTheme(v.target.checked)
  }

  const handleDrawerOpen = () => {
    setOpen(!open);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start"
            size="large"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}>
            {!open ? <MenuIcon /> : <MenuOpen />}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, userSelect: 'none' }}
          >
            SanPhantom BackGround Manage
          </Typography>

          <Tooltip title={!skip ? 'Light' : 'Dark'}>
            <MaterialUISwitch
              sx={{ m: 1 }}
              value=""
              checked={skip}
              onChange={handleChangeSkip}
              inputProps={{ "aria-label": 'skip setup' }}

            />
          </Tooltip>

        </Toolbar>
      </AppBar>
      <Drawer 
        // variant="temporary"
        variant="persistent"
        anchor="left"
        open={open}
        // onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          display: { sm: 'none', lg: 'block' },
          // position: { xs: 'static', sm: 'fixed' },
          // position: 'fixed',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <LeftNav />
        </Box>
      </Drawer>
      <Drawer 
        variant="temporary"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          display: { sm: 'block', lg: 'none' },
          // position: 'fixed',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <LeftNav />
        </Box>
      </Drawer>
      <Main open={open} sx={!open ? {marginLeft: {sm: 0, lg: `-${drawerWidth}px`}} : {}}>
        <Toolbar />
        <Box>
          {props.children}
        </Box>

      </Main>
    </Box>


  );
}

export default Layout;