import * as React from 'react';
import { Paper, BottomNavigationAction, BottomNavigation, Box } from '@mui/material';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import router from 'next/router';

const FiexedBottomNavigation = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels value={router.route}>
                    <BottomNavigationAction sx={{ color: "inherit" }} value='/videoCall' onClick={() => router.push('/videoCall')} label="Video call" icon={<CallOutlinedIcon />} />
                    <BottomNavigationAction sx={{ color: "inherit" }} label="Metrics" icon={<BarChartOutlinedIcon />} />
                    <BottomNavigationAction sx={{ color: "inherit" }} label="Notifications" icon={<NotificationsActiveOutlinedIcon />} />
                    <BottomNavigationAction sx={{ color: "inherit" }} value='/settings' onClick={() => router.push('/settings')} label="Settings" icon={<SettingsOutlinedIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
export default FiexedBottomNavigation
