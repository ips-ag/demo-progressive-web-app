import { Box, Button, CardMedia, Chip, DialogActions, DialogContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import MuiDialog from "./partials/MuiDialog";
import MuiDialogTitle from "./partials/MuiDialogTitle";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { storageProvider } from '../context/storageProvider';
import Gallery from "./partials/Gallery";

const WebcamCapture = () => {
    const { images, setImages } = storageProvider();

    const webcamRef = useRef<any>(null);
    const [showWebcam, setShowWebcam] = useState(true);
    const [isSupport, setIsSupport] = useState(true);

    const [imgSrc, setImgSrc] = useState(null);
    const [open, setOpen] = useState(false);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setShowWebcam(false);
    }, [webcamRef, setImgSrc]);

    const reCapture = () => {
        setImgSrc(null);
        setShowWebcam(true);
    };

    const saveImage = () => {
        console.info(imgSrc)
        if (imgSrc != null) {
            images.push(imgSrc);
            setImages(images);
            setImgSrc(null);
            setShowWebcam(true);
            setOpen(false);
        }
    };


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeviceSuppotor = (data: any) => {
        setIsSupport(false);
    }

    const handleUserMedia = (data: any) => {
        setIsSupport(true);
    }

    return (
        <Box>
            <Grid sx={{ padding: 2 }} container justifyContent="flex-end" >
                <Button color='info' variant="contained" onClick={handleClickOpen} endIcon={<PhotoCameraIcon />}>
                    Open camera
                </Button>
            </Grid>
            <Gallery images={images} />
            <MuiDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <MuiDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Save your momment
                </MuiDialogTitle>
                <DialogContent dividers sx={{ textAlign: 'center' }}>
                    {showWebcam &&
                        <Webcam
                            width='100%'
                            height='100%'
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            disabled
                            onUserMediaError={handleDeviceSuppotor}
                            onUserMedia={handleUserMedia}
                        />}
                    {imgSrc && (
                        <CardMedia
                            component="img"
                            height="100%"
                            width="100%"
                            image={imgSrc}
                        />
                    )}
                    {isSupport ?
                        <Box padding={1}>
                            {showWebcam ?
                                <IconButton onClick={capture} color='info' sx={{ border: 'double' }}>
                                    <PhotoCameraIcon />
                                </IconButton>
                                :
                                <IconButton onClick={reCapture} color='error' sx={{ border: 'double' }}>
                                    <BackspaceOutlinedIcon />
                                </IconButton>
                            }
                        </Box>
                        :
                        <Typography color='error'>Your device is not support camera or you need to grant permission to access camera for this page. </Typography>

                    }
                </DialogContent>
                <DialogActions>
                    <Button color='info' variant="contained" onClick={saveImage} disabled={showWebcam} endIcon={<CloudUploadOutlinedIcon />}>
                        Save
                    </Button>
                </DialogActions>
            </MuiDialog>

        </Box >
    );
};


export default WebcamCapture;