import { Box, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <Box>
      <Grid sx={{ padding: 2 }} container justifyContent="center" >
        <Typography>Home page</Typography>
      </Grid>

    </Box >
  )
}

export default Index
