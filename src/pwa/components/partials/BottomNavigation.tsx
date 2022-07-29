import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

const FiexedBottomNavigation = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Metrics" icon={<BarChartOutlinedIcon />} />
                    <BottomNavigationAction label="Notifications" icon={<NotificationsActiveOutlinedIcon />} />
                    <BottomNavigationAction label="Settings" icon={<SettingsOutlinedIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
export default FiexedBottomNavigation
