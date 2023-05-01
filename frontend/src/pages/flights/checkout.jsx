import Layout from "@/components/layout/layout";
import React, { useState } from 'react';
import { Container, Form, InputGroup, Row, Col, Button, Card, Accordion } from "react-bootstrap";
import { useRouter } from 'next/router'
import { FaUser, FaPlane, FaCreditCard } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs'


const Checkout = () => {
    const router = useRouter();
    const [paymentDetails, setPaymentDetails] = useState({});

    const { id } = router.query

    const handlePaymentDetailsSubmit = (event) => {
        event.preventDefault();
        // handle payment details submission
    }

    return (
        <Layout>
            <Container className="py-5">
                <Card className="mb-5">
                    <Card.Body>
                        <Card.Title className="fw-bold mb-4">Flight Details</Card.Title>
                        <Card.Subtitle className="mb-3">
                            <FaPlane className="me-2" />
                            <span className="text-primary">Flight duration:</span> 15 hours
                        </Card.Subtitle>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <p className="fw-bold mb-1">Departure date:</p>
                                <p className="text-secondary">25 May 2023</p>
                            </div>
                            <div>
                                <p className="fw-bold mb-1">Departure time:</p>
                                <p className="text-secondary">15:33</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <p className="fw-bold mb-1">Landing date:</p>
                                <p className="text-secondary">26 May 2023</p>
                            </div>
                            <div>
                                <p className="fw-bold mb-1">Landing time:</p>
                                <p className="text-secondary">15:33</p>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between">
                            <p className="fw-bold mb-0">Price:</p>
                            <p className="text-success fw-bold mb-0">5000000 LKR</p>
                        </div>
                    </Card.Body>
                </Card>
                <Accordion defaultActiveKey="0" className="mb-5">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <FaUser className="me-2" />
                            Traveller Details
                        </Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="mealType">
                                    <Form.Label>Meal Type</Form.Label>
                                    <Form.Select>
                                        <option>Vegetarian</option>
                                        <option>Non-vegetarian</option>
                                        <option>Halal</option>
                                        <option>Kosher</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="seatType">
                                    <Form.Label>Seat Type</Form.Label>
                                    <Form.Select>
                                        <option>Basic</option>
                                        <option>Widow</option>
                                        <option>Isle</option>
                                        <option>Middle</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <FaCreditCard className="me-2" />
                            Payment Options
                        </Accordion.Header>
                        <Accordion.Body>
                            <Form onSubmit={handlePaymentDetailsSubmit}>
                                <Form.Group className="mb-3" controlId="nameOnCard">
                                    <Form.Label>Name on Card</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name on card" required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="cardNumber">
                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter card number" required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="expirationDate">
                                    <Form.Label>Expiration Date</Form.Label>
                                    <Form.Control type="text" placeholder="MM/YY" required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="cvv">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control type="text" placeholder="Enter CVV" required />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            <BsCheckLg className="me-2" />
                            Checkout
                        </Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your address" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your city" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicZip">
                                    <Form.Label>Zip code</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your zip code" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your country" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </Layout>
    )
}

export default Checkout