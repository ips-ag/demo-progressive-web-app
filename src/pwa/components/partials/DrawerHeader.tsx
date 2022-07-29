import { styled, Theme, CSSObject } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
}));

export default DrawerHeader