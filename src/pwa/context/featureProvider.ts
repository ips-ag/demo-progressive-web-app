import { useState } from "react";
import { featureFlags } from '../lib/featureFlags'

export const featureProvider = () => {
    const featureFlagsValue = featureFlags();

    const [isEnableNotificationFeature, setIsEnableNotificationFeature] = useState<boolean>(featureFlagsValue.isEnableNotification);
    const [isEnableWebAuthFeature, setIsEnableWebAuthFeature] = useState<boolean>(featureFlagsValue.isEnableWebAuth);

    return {
        isEnableNotificationFeature,
        isEnableWebAuthFeature
    }
}