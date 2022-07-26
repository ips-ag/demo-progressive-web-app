import React from 'react';
import CardData from "../data/cardData.json";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Home() {

  return (
    <div>
      <div className="page-heading">
        <h4 className="page-title">Home</h4>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        </Breadcrumb></div>
      <Card>
        <Card.Body>
          <Card.Title>IPS demo Progressive Web App</Card.Title>
          <Card.Link href="#">Read more</Card.Link>
        </Card.Body>
      </Card>
      <div className="cards-section">
        <Row xs={1} md={2} className="g-4">
          <Col>
            <p>Welcome to IPS demo Progressive Web App</p>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default Home;