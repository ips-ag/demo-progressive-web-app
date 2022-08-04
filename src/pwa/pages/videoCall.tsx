import React, { useState } from 'react';
import StartCall from '../components/StartCall';
import CallRoom from '../components/CallRoom';

export default function VideoCall() {
    const [room, setRoom] = useState('');
    const [callFrame, setCallFrame] = useState(null);

    return (
        <div className="index-container">
            {room ? (
                <CallRoom
                    room={room}
                    setRoom={setRoom}
                    setCallFrame={setCallFrame}
                    callFrame={callFrame}
                />
            ) : (
                <StartCall
                    setRoom={setRoom}
                />
            )}
        </div>
    );
}