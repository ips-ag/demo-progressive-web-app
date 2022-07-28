import MenuAppBar from '../components/partials/MenuAppBar'
import SideBar from '../components/partials/SideBar'
import { Box } from '@mui/material'
import FixedBottomNavigation from '../components/partials/BottomNavigation'
import DrawerHeader from './partials/DrawerHeader';


type DashboardLayoutProps = {
    children: React.ReactNode,
};

const Layout = ({ children }: DashboardLayoutProps) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <MenuAppBar />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
                <SideBar />
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <main>{children}</main>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }} >
                <FixedBottomNavigation />
            </Box>
        </Box>
    )
}

export default Layout
