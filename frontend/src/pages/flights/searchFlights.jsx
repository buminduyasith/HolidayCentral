import Layout from "@/components/layout/layout";
import Link from "next/link";
import React, { useState } from 'react';
import { Container, Form, InputGroup, Row, Col, Button, Card } from "react-bootstrap";


export default function SearchFlights() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>From Country</Form.Label>
                <Form.Control
                  required
                  as="select"
                  placeholder="From"
                >
                  <option value="DICTUM">Sri Lanka</option>
                  <option value="CONSTANCY">Constancia</option>
                  <option value="COMPLEMENT">Complemento</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>From Terminal</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="From"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>To Country</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="To"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>To Terminal</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="From"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Departure Time</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="From"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid Time</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Arrival Time</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="From"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid Time</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Stops</Form.Label>
                <Form.Control
                  required
                  as="select"
                  placeholder="From"
                >
                  <option value="DICTUM">0</option>
                  <option value="CONSTANCY">1</option>
                  <option value="COMPLEMENT">2</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Trip Type</Form.Label>
                <Form.Control
                  required
                  as="select"
                  placeholder="From"
                >
                  <option value="DICTUM">One Way</option>
                  <option value="CONSTANCY">Round Trip</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Search</Button>
          </Form>
        </Row>
        {/* Loop Row with all Flight Data */}
        <Row style={{ paddingTop: '5vh' }}>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Airline</Card.Title>
              <Card.Subtitle>FromTerminal --- ToTerminal && flightDuration</Card.Subtitle>
              <Card.Text>
                Other Flight Info like price, depArturertime, landingtime etc...
              </Card.Text>
              <Button variant="primary"> <Link
                href={{
                  pathname: "./checkout",
                  query: {
                    id: 1
                  }
                }}
                as={'flights/flightscheckout'}
              >Checkout</Link></Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Layout>
  )
}