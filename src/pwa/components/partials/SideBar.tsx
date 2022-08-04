import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DrawerHeader from './DrawerHeader';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import router from 'next/router';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const SideBar = () => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerClose = () => {
        setOpen(!open);
    };
    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader />
            <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            maxHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => router.push('/videoCall')}
                    >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                            <CallOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Video call'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            maxHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                            <BarChartOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Metrics'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            maxHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                            <NotificationsActiveOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Notifications'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            maxHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                            <SettingsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Settings'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <DrawerHeader>
                <Button color="inherit" onClick={handleDrawerClose}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </Button>
            </DrawerHeader>
        </Drawer>
    );
}

export default SideBar