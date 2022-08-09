import { IconButton, Tooltip } from "@mui/material";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';


const MarkerPosition = ({ text }: any) => {

    return (
        <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
            <Tooltip placement="top" title={text} sx={{backgroundColor:'steelblue', opacity:0.7}}>
                <IconButton>
                    <PersonPinCircleIcon color="error" fontSize="large" />
                </IconButton>
            </Tooltip>
        </div>

    )
}

export default MarkerPosition; 