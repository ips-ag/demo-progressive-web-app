import React from 'react';
import Gallery from '../components/partials/Gallery';
import WebcamCapture from '../components/WebcamCapture';
import { storageProvider } from '../context/storageProvider';

export default function Video() {
  const { images, setImages } = storageProvider();
  return (
    <>
      <WebcamCapture />
      <Gallery images={images} />
    </>
  )
}


