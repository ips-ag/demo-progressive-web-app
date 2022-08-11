import { Backdrop, CircularProgress, Container, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Switch } from "@mui/material"
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { appProvider } from '../context/appProvider';
import { initializeFCM, deleteNotificationToken, checkNotificationStatus } from '../services/firebase'
import { useEffect, useState } from "react";


const Settings = () => {
    const [isDisableNotificationBTN, setIsDisableNotificationBTN] = useState<boolean>(false);
    const [isOpenBackdrop, setIsOpenBackdrop] = useState<boolean>(false);

    const { isEnableNotification, setIsEnableNotification } = appProvider();


    const onSwitchNotificationStatus = async () => {
        setIsOpenBackdrop(true);
        if (!isEnableNotification) {
            var isEnable = await initializeFCM();
            setIsEnableNotification(isEnable)
        } else {
            var isDeleted = await deleteNotificationToken();
            setIsEnableNotification(!isDeleted)
        }
        setIsOpenBackdrop(false);
    }
    useEffect(() => {
        setIsEnableNotification(checkNotificationStatus());
    }, []);
    return (
        <Container>
            <Backdrop
                color='info'
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isOpenBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <List
                sx={{ width: '100%' }}
                subheader={<ListSubheader>Settings</ListSubheader>}
            >
                <ListItem>
                    <ListItemIcon>
                        <NotificationsActiveOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notification" />
                    <Switch
                        edge="end"
                        color="info"
                        onChange={onSwitchNotificationStatus}
                        checked={isEnableNotification}
                        disabled={isDisableNotificationBTN}
                    />
                </ListItem>
            </List>
        </Container>
    )
}

export default Settings