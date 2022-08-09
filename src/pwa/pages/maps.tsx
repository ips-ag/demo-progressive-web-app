import { Grid, Typography } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from "react";
const Map = () => {
    const [currentGeoPosition, setCurrentGeoPosition] = useState<any>();

    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.info(position)
            setCurrentGeoPosition(position)
        });
    }

    useEffect(() => {
        getCurrentPosition();
    }, []);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {currentGeoPosition ?
                <GoogleMapReact
                    defaultCenter={{
                        lat: currentGeoPosition.coords.latitude,
                        lng: currentGeoPosition.coords.longitude
                    }}
                    defaultZoom={15}
                    yesIWantToUseGoogleMapApiInternals
                >

                </GoogleMapReact>
                :
                <Grid sx={{ padding: 3 }} container justifyContent="center" >
                    <Typography color='error'>Your device is not support GPS or you need to grant permission to access GPS for this page. </Typography>
                </Grid>
            }

        </div>
    )
}

export default Map