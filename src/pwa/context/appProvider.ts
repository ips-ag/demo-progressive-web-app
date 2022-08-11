import { useState } from "react";

export const appProvider = () => {
    const [isEnableNotification, setIsEnableNotification] = useState<boolean>(false);

    return {
        isEnableNotification,
        setIsEnableNotification
    }
}