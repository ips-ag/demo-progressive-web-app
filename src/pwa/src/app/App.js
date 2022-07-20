import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AppHeader from '../components/partials/AppHeader';
import AppFooter from '../components/partials/AppFooter';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Settings from '../views/Settings';
import './App.scss';


function App() {

  return (
    <>
      <AppHeader />
      <Container className="app-container show-grid">
        <Row className="container-row" >
          <Col>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Profile" element={<Profile />} />
              <Route exact path="/Settings" element={<Settings />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <AppFooter />
    </>
  );
  
}

export default hot(module)(App);
