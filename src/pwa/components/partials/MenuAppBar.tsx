import * as React from 'react';
import { Box, Toolbar, IconButton, Typography, Menu, Avatar, Button, MenuItem, Divider, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useRouter } from 'next/router';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const MenuAppBar = () => {
    const router = useRouter()
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElManagement, setAnchorElManagement] = React.useState<null | HTMLElement>(null);


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenManangementMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElManagement(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseManagementMenu = () => {
        setAnchorElManagement(null);
        handleCloseNavMenu();
    };
    return (
        <AppBar>
            <Toolbar sx={{ paddingRight: 2, paddingLeft: 2 }} disableGutters>
                <Typography variant="h6" noWrap component="a" href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit"
                        onClick={handleOpenNavMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu id="menu-appbar" anchorEl={anchorElNav}
                        elevation={0}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Button onClick={() => router.push('/')} sx={{ color: 'inherit' }}>
                                <Typography textTransform={'none'}>Home</Typography>
                            </Button>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Button onClick={() => router.push('/gallery')} sx={{ color: 'inherit' }} >
                                <Typography textTransform={'none'}>Gallery</Typography>
                            </Button>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Button onClick={() => router.push('/maps')} sx={{ color: 'inherit' }} >
                                <Typography textTransform={'none'}>Maps</Typography>
                            </Button>
                        </MenuItem>
                        <MenuItem>
                            <Button onClick={handleOpenManangementMenu} aria-controls="menu-management" aria-haspopup="true" sx={{ color: 'inherit' }} endIcon={<KeyboardArrowDownIcon color='warning' />}>
                                <Typography textTransform={'none'}>Management</Typography>
                            </Button>
                            <Menu
                                sx={{ mt: '45px', borderRadius: 6, minWidth: 180 }}
                                id="menu-management"
                                anchorEl={anchorElManagement}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorElManagement)}
                                onClose={handleCloseManagementMenu}
                            >
                                <MenuItem onClick={() => { handleCloseManagementMenu(); router.push('/videoHistory') }}>
                                    <Typography >Video meetings history</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => { handleCloseManagementMenu(); router.push('/users'); }}>
                                    <Typography >Users</Typography>
                                </MenuItem>
                            </Menu>
                        </MenuItem>
                    </Menu>
                </Box>
                <Image src='/logo.svg' width={60} height={60}></Image>
                <Typography variant="h5" noWrap component="a"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', paddingLeft: 20 } }}>
                    <Button onClick={() => router.push('/')} sx={{ my: 2, color: 'inherit', display: 'block' }}>
                        <Typography textTransform={'none'}>Home</Typography>
                    </Button>
                    <Button onClick={() => router.push('/gallery')} sx={{ my: 2, color: 'inherit', display: 'block' }}>
                        <Typography textTransform={'none'}>Gallery</Typography>
                    </Button>
                    <Button onClick={() => router.push('/maps')} sx={{ my: 2, color: 'inherit', display: 'block' }}>
                        <Typography textTransform={'none'}>Maps</Typography>
                    </Button>
                    <Button onClick={handleOpenManangementMenu} aria-controls="menu-management" aria-haspopup="true"
                        sx={{ color: 'inherit' }} endIcon={<KeyboardArrowDownIcon />}>
                        <Typography textTransform={'none'}>Management</Typography>
                    </Button>
                    <Menu
                        sx={{ mt: '45px', borderRadius: 6, minWidth: 180 }}
                        id="menu-management"
                        anchorEl={anchorElManagement}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}

                        open={Boolean(anchorElManagement)}
                        onClose={handleCloseManagementMenu}
                    >
                        <MenuItem onClick={() => { handleCloseManagementMenu(); router.push('/videoHistory'); }}>
                            <Typography>Video meetings history</Typography>

                        </MenuItem>
                        <MenuItem onClick={() => { handleCloseManagementMenu(); router.push('/users'); }}>
                            <Typography >Users</Typography>
                        </MenuItem>
                    </Menu>
                </Box>

                <Box>
                    <Button onClick={handleOpenUserMenu} sx={{ p: 0, color: 'inherit' }} endIcon={<KeyboardArrowDownIcon />}>
                        <Avatar alt="My Dog" src="/avatar.jpeg" />
                    </Button>
                    <Menu
                        sx={{ mt: '45px', borderRadius: 6, minWidth: 6 }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}

                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <AccountCircleOutlinedIcon />
                            <Typography >Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <SettingsOutlinedIcon />
                            <Typography >Settings</Typography>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={handleCloseUserMenu}>
                            <ExitToAppOutlinedIcon />
                            <Typography >Sign Out</Typography>

                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default MenuAppBar;
