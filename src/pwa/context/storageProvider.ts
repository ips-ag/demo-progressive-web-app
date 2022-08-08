import { useState } from "react";

export const storageProvider = () => {
    const [images, setImages] = useState<[]>([]);

    return {
        images,
        setImages
    }
}