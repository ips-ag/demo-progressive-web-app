import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { CardMedia, Container } from '@mui/material';

type GalleryProps = {
    images: []
}

const Gallery = ({ images }: GalleryProps) => {
    return (
        <Container>
            <ImageList sx={{ width: '100%', height: '100%' }} variant="woven" cols={3} gap={8}>
                {images.map((item, index) => (
                    <ImageListItem key={index}>
                        <CardMedia
                            sx={{ border: 'double', borderRadius: '13px' }}
                            component="img"
                            height="100%"
                            width="100%"
                            image={item}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    );
}

export default Gallery