import { Grid, TextField, Button, Divider, Chip, Badge, Typography, CardContent, CardActions, Card, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import validator from 'validator'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';


interface StartCallProps {
    setRoom: React.Dispatch<React.SetStateAction<string>>;
}

interface GetRooms {
    total_count: number,
    data: RoomInfo[]
}

interface RoomInfo {
    id: string,
    name: string
    url: string,
    totalJoinner: number
}

export default function StartCall({ setRoom }: StartCallProps) {
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [roomUrl, setRoomUrl] = useState('');
    const [rooms, setRooms] = useState<GetRooms>();

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

    const joinAvailableRoom = (url: string) => {
        setRoom(url);
    }

    const fetchRooms = async () => {
        const resRooms = await fetch('/api/room', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resJsonRooms = await resRooms.json() as GetRooms;



        const resPresence = await fetch('/api/room/presence', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resJsonPresence = await resPresence.json();

        if (resJsonRooms !== null && resJsonRooms.total_count > 0) {
            resJsonRooms.data.map((room) => room.totalJoinner = resJsonPresence[room.name] != undefined ? resJsonPresence[room.name].length : 0)
        }

        setRooms(resJsonRooms);
    }

    useEffect(() => {
        fetchRooms();
        const i = setInterval(fetchRooms, 10000);
        return () => clearInterval(i);
    }, []);


    return (
        <>
            <Grid sx={{ padding: 3 }} container justifyContent="flex-end" >
                <Button variant="contained" >
                    <Typography textTransform={'none'}>Create room</Typography>
                </Button>
            </Grid>
            <Box sx={{ display: { md: 'flex' } }}>
                <Card sx={{ width: { md: '50%', xs: '100%' } }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} gutterBottom>
                            Available Rooms
                        </Typography>
                        {rooms?.data.map(room => (
                            <div key={room.id}>
                                <Grid sx={{ padding: 2 }} container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>{room.name}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        {room.totalJoinner > 0 ? (
                                            <Badge badgeContent={room.totalJoinner} color="secondary">
                                                {room.totalJoinner == 1 ? (
                                                    <PermIdentityOutlinedIcon color="action" />
                                                ) : (
                                                    <PeopleAltOutlinedIcon />
                                                )}
                                            </Badge>
                                        ) : (
                                            <></>
                                        )}
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Chip label="Join" variant="outlined" onClick={() => joinAvailableRoom(room.url)} />
                                    </Grid>
                                </Grid>
                                <Divider />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Divider sx={{ padding: 2, opacity: 0 }} />
                <Card sx={{ width: { md: '50%', xs: '100%' } }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} gutterBottom>
                            You can enter publlic url room to join
                        </Typography>
                        <Box>
                            <TextField
                                onChange={(e) => validateUrl(e.target.value)}
                                error={!isValidUrl}
                                fullWidth label="Enter room URL..." />
                        </Box>
                    </CardContent>
                    <CardActions sx={{ float: 'right', paddingRight: 2 }}>
                        <Button onClick={joinCall} variant="contained" disabled={!isValidUrl}>
                            <Typography textTransform={'none'}>Join room</Typography>
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}