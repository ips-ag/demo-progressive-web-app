
export const checkFeatureFlag = (endPoint: string): boolean => {
    switch (endPoint) {
        case featureEndPoint.maps: {
            return featureFlags.isEnableLocationServices;
        }
        case featureEndPoint.gallerry: {
            return featureFlags.isEnableCamera;
        }
        case featureEndPoint.videoCall: {
            return featureFlags.isEnableCamera && featureFlags.isEnableCalling;
        }

        default: {
            return true;
        }
    }
}

const featureFlags = {
    isEnableCalling: true,
    isEnableCamera: true,
    isEnableLocationServices: false
}

const featureEndPoint = {
    maps: "/maps",
    gallerry: "/gallery",
    videoCall: "/videoCall"
}