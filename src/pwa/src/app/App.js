import React from 'react';
import { hot } from 'react-hot-loader';

import AppHeader from '../components/partials/AppHeader';
import AppFooter from '../components/partials/AppFooter';

import './App.scss';


function App() {

  return (
    <>
      <AppHeader />

      <AppFooter />
    </>
  );
  
}

export default hot(module)(App);
