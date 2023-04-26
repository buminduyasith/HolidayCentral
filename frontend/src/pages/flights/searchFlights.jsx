import Layout from "@/components/layout/layout";
import React, { useState } from 'react';
import { Container, Form, InputGroup, Row, Col, Button } from "react-bootstrap";


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
                  type="text"
                  placeholder="From"
                />
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
            {/* <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="State" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom05">
                <Form.Label>Zip</Form.Label>
                <Form.Control type="text" placeholder="Zip" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
            </Row> */}
            {/* <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group> */}
            <Button type="submit">Search</Button>
          </Form>
        </Row>
        <Row>Searcfh Results | All Flights</Row>
      </Container>
    </Layout>
  )
}