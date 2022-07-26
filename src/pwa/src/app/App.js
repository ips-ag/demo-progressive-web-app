import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import AppHeader from '../components/partials/AppHeader';
import AppSidebar from '../components/partials/AppSidebar';
import AppFooter from '../components/partials/AppFooter';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Settings from '../views/Settings';
import UserList from '../views/UserList';
import './App.scss';


function App() {

  return (
    <div className="layout-grid">
      <AppHeader />
      <Container fluid className="app-container">
      <Row  >
          <AppSidebar className="app-sidebar" />
          <Col>
          <div className="content-area">
          </div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/UserList" element={<UserList />} />
              <Route exact path="/Profile" element={<Profile />} />
              <Route exact path="/Settings" element={<Settings />} />
            </Routes>
          </Col>
          
        </Row>
      </Container>
      <AppFooter />
    </div>
  );

}

export default hot(module)(App);
