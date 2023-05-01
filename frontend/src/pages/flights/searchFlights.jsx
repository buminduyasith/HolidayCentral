import Layout from "@/components/layout/layout";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import axios from 'axios';
import FlightList from "@/components/FlightCard";


export default function SearchFlights() {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/flights/allflights")
      .then((res) => {
        // console.log(res);
        setData(res.data)
      })
      .catch((error) => {
        console.error(`Error fetching data from API: ${error.message}`);
      })
  }, [])

  useEffect(() => { }, [data])

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
              <div class="mb-4">
                <h6 class=" text-uppercase">Search Flights</h6>
                <hr style={{ borderTop: '2px dashed #999' }} />
              </div>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Departure</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="From"
                >
                  <option value="LK">Sri Lanka</option>
                  <option value="US">United States</option>
                  <option value="DE">Germany</option>
                  <option value="CA">Canada</option>
                  <option value="NL">NetherLands</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Arrival</Form.Label>
                <Form.Control
                  required
                  as="select"
                  placeholder="To"
                >
                  <option value="LK">Sri Lanka</option>
                  <option value="US">United States</option>
                  <option value="DE">Germany</option>
                  <option value="CA">Canada</option>
                  <option value="NL">NetherLands</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Departure Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dDate"
                  placeholder="Select Date"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid Date</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Arrival date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="aDate"
                  placeholder="Select Date"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid Location</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Cabin Class</Form.Label>
                <Form.Control
                  required
                  as="select"
                  placeholder="From"
                >
                  <option value="FC">First Class</option>
                  <option value="BC">Business Class</option>
                  <option value="E">Economy</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div class="mb-4">
                <h6 class=" text-uppercase">Filter Flights</h6>
                <hr style={{ borderTop: '2px dashed #999' }} />
              </div>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  as="select"
                  placeholder="From"
                >
                  <option value="0">0 - 100000</option>
                  <option value="1">100000 - 500000</option>
                  <option value="2">500000 - 1000000</option>
                  <option value="3"> greater than 1000000</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Airline</Form.Label>
                <Form.Control
                  required
                  as="select"
                  placeholder="From"
                >
                  <option value="Sri Lankan Airlines">Sri Lankan Airlines</option>
                  <option value="Signapoor Airlines">Signapoor Airlines</option>
                  <option value="Malaysian Airlines">Malaysian Airlines</option>
                  <option value="Emirates Airlines">Emirates Airlines</option>
                  <option value="American Airlines">American Airlines</option>
                  <option value="Air Asia Airlines">Air Asia Airlines</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please provide a valid Input</Form.Control.Feedback>
              </Form.Group>
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

        <FlightList flights={data} />
        {/* <Row className="mt-4">
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
        </Row> */}

      </Container>
    </Layout>
  )
}