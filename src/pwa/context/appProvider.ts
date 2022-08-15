import { useState } from "react";

export const appProvider = () => {
    const [isEnableNotification, setIsEnableNotification] = useState<boolean>(false);
    const [isEnableLockApp, setIsEnableLockApp] = useState<boolean>(false);

    return {
        isEnableNotification,
        setIsEnableNotification,
        isEnableLockApp,
        setIsEnableLockApp
    }
}