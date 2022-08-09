import { Avatar, Box, Card, CardContent, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import GoogleMap from 'google-map-react';
import { useEffect, useState } from "react";
import MarkerPosition from '../components/partials/MarkerPosition';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

const Map = () => {
    const [currentGeoPosition, setCurrentGeoPosition] = useState<any>();
    const [currentZoom, setCurrentZoom] = useState<number>(15);

    const getCurrentPosition = () => {
        setCurrentZoom(15)
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentGeoPosition(position)
        });
    }

    useEffect(() => {
        getCurrentPosition();
    }, []);

    return (
        <>
            {currentGeoPosition ?
                <Box sx={{ display: { md: 'flex' } }}>
                    <Card sx={{ width: '100%', height: '90vh' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonPinCircleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Current location" secondary={`${currentGeoPosition.coords.latitude} : ${currentGeoPosition.coords.longitude}`} />
                        </ListItem>
                        <CardContent sx={{ width: '100%', height: '90%' }}>
                            <GoogleMap
                                yesIWantToUseGoogleMapApiInternals={true}
                                center={{
                                    lat: currentGeoPosition.coords.latitude,
                                    lng: currentGeoPosition.coords.longitude
                                }}
                                zoom={currentZoom}
                            >

                                <MarkerPosition lat={currentGeoPosition.coords.latitude} lng={currentGeoPosition.coords.longitude} text="Your location" />
                            </GoogleMap>
                        </CardContent>
                    </Card>
                </Box>
                :
                <Grid sx={{ padding: 3 }} container justifyContent="center" >
                    <Typography color='textPrimary'>Waiting for location services...</Typography>
                </Grid>
            }
        </>
    )
}

export default Map