import React, { Fragment } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BreedDetails = (props) => {
  const state = props.location.state;

  return (
    <Fragment>
      <Container style={{ marginTop: "2.1vh", marginBottom: "2.1vh" }}>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Link to={`/?breed=${state.breeds[0].id}`}>
                  <Button variant="primary">Back</Button>
                </Link>
              </Card.Header>
              <Card.Img variant="top" src={state.url} />
              <Card.Body>
                <Card.Title>
                  <h4>{state.breeds[0].name}</h4>
                  <h5>Origin: {state.breeds[0].origin}</h5>
                  <h6>{state.breeds[0].temperament}</h6>
                </Card.Title>
                <Card.Text>{state.breeds[0].description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BreedDetails;
