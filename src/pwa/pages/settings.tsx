import { Backdrop, CircularProgress, Container, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Switch } from "@mui/material"
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import PhonelinkLockOutlinedIcon from '@mui/icons-material/PhonelinkLockOutlined';
import { appProvider } from '../context/appProvider';
import { initializeFCM, deleteNotificationToken, checkNotificationStatus } from '../services/firebase'
import { useEffect, useState } from "react";
import { checkLockAppStatus, registerWebAuth, unLockApp } from '../services/webAuth';


const Settings = () => {
    const [isOpenBackdrop, setIsOpenBackdrop] = useState<boolean>(false);
    const [isSupportWebAuth, setIsSupportWebAuth] = useState<boolean>(false);
    const { isEnableNotification, setIsEnableNotification, isEnableLockApp, setIsEnableLockApp } = appProvider();

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

    const onSwitchLockAppStatus = async () => {
        setIsOpenBackdrop(true);
        if (!isEnableLockApp) {
            var isEnable = await registerWebAuth();
            setIsEnableLockApp(isEnable)
        } else {
            unLockApp();
            setIsEnableLockApp(false)
        }
        setIsOpenBackdrop(false);
    }

    useEffect(() => {
        window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(value => setIsSupportWebAuth(value));
        setIsEnableNotification(checkNotificationStatus());
        setIsEnableLockApp(checkLockAppStatus());
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
                    />
                </ListItem>
                <ListItem disabled={!isSupportWebAuth}>
                    <ListItemIcon>
                        <PhonelinkLockOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={isSupportWebAuth ? "Lock app" : "Your device doesn't support Webauth."} />
                    <Switch
                        edge="end"
                        color="info"
                        onChange={onSwitchLockAppStatus}
                        checked={isEnableLockApp}
                        disabled={!isSupportWebAuth}
                    />
                </ListItem>
            </List>
        </Container>
    )
}

export default Settings