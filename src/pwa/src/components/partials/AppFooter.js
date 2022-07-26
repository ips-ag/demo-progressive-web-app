import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AppFooter() {

  const gridStyles = {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  };

  return (
    <div className="app-footer">
      <Container fluid>
        <Row>
          <Col sm>Footer col</Col>
          <Col sm>Footer col</Col>
          <Col sm>Footer col</Col>
          <Col sm>Footer col</Col>

        </Row>
      </Container>
    </div>
  )
}
export default AppFooter;