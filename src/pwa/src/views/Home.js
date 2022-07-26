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
          <Card.Title>Area</Card.Title>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
      <div className="cards-section">
        <Row xs={1} md={5} className="g-4">
          {CardData.map((card, i) => {
            return (
              <Col>
                <Card key={i}>
                  <Card.Img variant="top" src={card.itemImage} />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>
                      {card.itemText}
                    </Card.Text>
                    <Button variant="outline-primary" color="secondary" href={card.buttonUrl} >{card.itemButtonText}</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}
export default Home;