import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AppFooter() {


  const gridStyles = {
    alignItems: 'center',
    justifyContent:'center',
    width: '100%'
  };



  return (
    <div className="app-footer">
<Container>
  <Row>
  <Row>
        <Col sm>Footer col</Col>
        <Col sm>Footer col</Col>
        <Col sm>Footer col</Col>
        <Col sm>Footer col</Col>
      </Row>
  </Row>
</Container>
    </div>
  )
}
export default AppFooter;