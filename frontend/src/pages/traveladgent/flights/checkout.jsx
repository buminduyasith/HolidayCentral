import Layout from "@/components/layout/layout";
import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Card, Accordion, Alert } from "react-bootstrap";
import { useRouter } from 'next/router'
import { FaUser, FaPlane, FaCreditCard } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs'
import axios from "axios";


const Checkout = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [mealType, setMealType] = useState('Veg');
    const [seating, setSeating] = useState('basic');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('galle');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('LK');
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const {
        id,
        airline,
        fromTerminal,
        toTerminal,
        flightDuration,
        price,
        departureTime,
        landingTime,
        stops,
        flightClass,
        allowedMaxBaggageWeight,
        isRefundable,
        departureDate,
        landingDate,
        fromCountry,
        toCountry,
        tripType
    } = router.query

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const mealTypeHandler = (event) => {
        setMealType(event.target.value);
    };
    const seatingHandler = (event) => {
        setSeating(event.target.value);
    };

    const emailhandler = (event) => {
        setEmail(event.target.value);
    };

    const nameHandler = (event) => {
        setName(event.target.value);
    };

    const addressHandler = (event) => {
        setAddress(event.target.value);
    };

    const cityHandler = (event) => {
        setCity(event.target.value);
    };

    const zipHandler = (event) => {
        setZip(event.target.value);
    };

    const countryHandler = (event) => {
        setCountry(event.target.value);
    };


    const handlePaymentDetailsSubmit = async (event) => {
        event.preventDefault();

        const emptyFields = [];

        if (!airline) {
            emptyFields.push('Airline');
        }

        if (!fromCountry) {
            emptyFields.push('From country');
        }

        if (!toCountry) {
            emptyFields.push('To country');
        }

        if (!price) {
            emptyFields.push('Price');
        }

        if (!departureDate) {
            emptyFields.push('Departure date');
        }

        if (!departureTime) {
            emptyFields.push('Departure time');
        }

        if (!landingDate) {
            emptyFields.push('Landing date');
        }

        if (!landingTime) {
            emptyFields.push('Landing time');
        }

        if (!isRefundable) {
            emptyFields.push('Refundable');
        }

        if (!tripType) {
            emptyFields.push('Trip type');
        }

        if (!flightClass) {
            emptyFields.push('Flight class');
        }

        if (!email) {
            emptyFields.push('Email');
        }

        if (!name) {
            emptyFields.push('Name');
        }

        if (!address) {
            emptyFields.push('Address');
        }

        if (!city) {
            emptyFields.push('City');
        }

        if (!zip) {
            emptyFields.push('Zip');
        }

        if (!country) {
            emptyFields.push('Country');
        }

        if (!mealType) {
            emptyFields.push('Meal type');
        }

        if (!seating) {
            emptyFields.push('Seating');
        }

        if (emptyFields.length > 0) {
            setErrorMessage(`Please fill in the following fields: ${emptyFields.join(', ')}`);
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/flights/checkout", {
                airline,
                fromCountry,
                toCountry,
                price,
                departureDate,
                departureTime,
                landingDate,
                landingTime,
                isRefundable,
                tripType,
                flightClass,
                email,
                name,
                address,
                city,
                zip,
                country,
                mealType,
                seating
            });
            console.log(res);
            setSuccessMessage("Your payment was successful!");
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <Layout>
            <Container className="py-5">
                <Card className="mb-5">
                    <Card.Body>
                        <Card.Title className="fw-bold mb-4">Flight Details</Card.Title>
                        <Card.Subtitle className="mb-3">
                            <FaPlane className="me-2" />
                            <span className="text-primary">Flight duration:</span> {flightDuration} hours
                        </Card.Subtitle>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <p className="fw-bold mb-1">Departure date:</p>
                                <p className="text-secondary">{departureDate}</p>
                            </div>
                            <div>
                                <p className="fw-bold mb-1">Departure time:</p>
                                <p className="text-secondary">{departureTime}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <p className="fw-bold mb-1">Landing date:</p>
                                <p className="text-secondary">{landingDate}</p>
                            </div>
                            <div>
                                <p className="fw-bold mb-1">Landing time:</p>
                                <p className="text-secondary">{landingTime}</p>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between">
                            <p className="fw-bold mb-0">Price:</p>
                            <p className="text-success fw-bold mb-0">{price} LKR</p>
                        </div>
                    </Card.Body>
                </Card>
                {errorMessage && <Alert variant="danger" dismissible>{errorMessage}</Alert>}
                {successMessage && <Alert variant="success" dismissible>{successMessage}</Alert>}
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
                                    <Form.Control as="select" name="mealType" value={mealType} onChange={mealTypeHandler}>
                                        <option value="Veg">Vegetarian</option>
                                        <option value="nonVeg">Non-vegetarian</option>
                                        <option value="halal">Halal</option>
                                        <option value="kosher">Kosher</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="seatType">
                                    <Form.Label>Seat Type</Form.Label>
                                    <Form.Control as="select" name="seating" value={seating} onChange={seatingHandler}>
                                        <option value="basic">Basic</option>
                                        <option value="window">Window</option>
                                        <option value="isle">Isle</option>
                                        <option value="middle">Middle</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" onClick={handleNextStep}>Next</Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    {step >= 2 && (
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                <BsCheckLg className="me-2" />
                                Checkout
                            </Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={emailhandler} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" value={name} onChange={nameHandler} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your address" value={address} onChange={addressHandler} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="seatType">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control as="select" name="seating" value={country} onChange={countryHandler}>
                                            <option value="LK">Sri Lanka</option>
                                            <option value="NL">NetherLands</option>
                                            <option value="DE">Germany</option>
                                            <option value="US">United States</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="seatType">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control as="select" name="seating" value={city} onChange={cityHandler}>
                                            <option value="galle">Galle</option>
                                            <option value="CMB">Colombo</option>
                                            <option value="california">California</option>
                                            <option value="Toronto">Toronto</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicZip">
                                        <Form.Label>Zip code</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your zip code" value={zip} onChange={zipHandler} />
                                    </Form.Group>

                                    <Button variant="primary" onClick={handleNextStep}>
                                        Submit and Proceed
                                    </Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}
                    {step >= 3 && (
                        <Accordion.Item eventKey="2">
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
                    )}
                </Accordion>
            </Container>
        </Layout>
    )
}

export default Checkout