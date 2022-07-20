import React from 'react';
import CardData from "../data/cardData.json";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';


function Home() {

  return (
    <div>
      <h4>Home</h4>
      <div className="cards-section">
        {CardData.map((card,i) => {
          return (
            <CardGroup key={i}>
              <Card >
                <Card.Img variant="top" src={card.itemImage} />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>
                    {card.itemText}
                  </Card.Text>
                  <Button variant="outline-primary" color="secondary" href={card.buttonUrl} >{card.itemButtonText}</Button>
                </Card.Body>
              </Card>
            </CardGroup>
          )
        })}

      </div>
    </div>

  )
}
export default Home;