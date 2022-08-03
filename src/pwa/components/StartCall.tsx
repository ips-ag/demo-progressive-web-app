import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import validator from 'validator'


interface StartCallProps {
    setRoom: React.Dispatch<React.SetStateAction<string>>;
}

export default function StartCall({ setRoom }: StartCallProps) {
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [roomUrl, setRoomUrl] = useState('');

    const validateUrl = (value: string) => {
        if (validator.isURL(value)) {
            setIsValidUrl(true);
            setRoomUrl(value);
        } else {
            setIsValidUrl(false);
        }
    }

    const joinCall = () => {
        setRoom(roomUrl);
    }


    return (
        <>
            <Grid sx={{ paddingBottom: 5 }} container justifyContent="flex-end" >
                <Button variant="contained" >
                    <Typography textTransform={'none'}>Create room</Typography>
                </Button>
            </Grid>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 20 }} gutterBottom>
                        Enter room to join
                    </Typography>
                    <Box>
                        <TextField
                            onChange={(e) => validateUrl(e.target.value)}
                            error={!isValidUrl}
                            fullWidth label="Enter room URL..." />
                    </Box>
                </CardContent>
                <CardActions>
                    <Button onClick={joinCall} variant="contained" disabled={!isValidUrl}>
                        <Typography textTransform={'none'}>Join room</Typography>
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}