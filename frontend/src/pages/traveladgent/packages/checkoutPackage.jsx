import Layout from "@/components/layout/layout";
import React, { useState } from 'react';
import { Container, Form, InputGroup, Row, Col, Button, Card, Accordion } from "react-bootstrap";
import { useRouter } from 'next/router'
import { FaUser, FaPlane, FaCreditCard } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs'
import axios from "axios";


const Checkout = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [Gender, setGender] = useState('');
    const [ageBetween, setageBetween] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');

    const {
        id,
        airline,
        fromTerminal,
        toTerminal,
        packageName,
        price,
        destination,
        specialty,
        stops,
        class: flightClass,
        allowedMaxBaggageWeight,
        isRefundable,
        packageDescription,
        contactEmail,
        fromCountry,
        toCountry,
        tripType
    } = router.query

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const GenderHandler = (event) => {
        setGender(event.target.value);
    };
    const ageBetweenHandler = (event) => {
        setageBetween(event.target.value);
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
        const finalData = { Gender, ageBetween, email, name, address, city, zip, country };

        try {
            const res = await axios.post("http://localhost:5000/packages/packageCheckouts", {
                airline,
                fromCountry,
                toCountry,
                price,
                packageDescription,
                destination,
                contactEmail,
                specialty,
                isRefundable,
                tripType,
                flightClass,
                email,
                name,
                address,
                city,
                zip,
                country,
                Gender,
                ageBetween
            });
            console.log(res);
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <Layout>
            <Container className="py-5">
                <Card className="mb-5">
                    <Card.Body>
                        <Card.Title className="fw-bold mb-4">Package Details</Card.Title>
                        <Card.Subtitle className="mb-3">
                            <FaPlane className="me-2" />
                            <span className="text-primary">Package Name:</span> {packageName} 
                        </Card.Subtitle>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <p className="fw-bold mb-1">package Description:</p>
                                <p className="text-secondary">{packageDescription}</p>
                            </div>
                            <div>
                                <p className="fw-bold mb-1">destination:</p>
                                <p className="text-secondary">{destination}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <p className="fw-bold mb-1">contact Email:</p>
                                <p className="text-secondary">{contactEmail}</p>
                            </div>
                            <div>
                                <p className="fw-bold mb-1">specialty:</p>
                                <p className="text-secondary">{specialty}</p>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between">
                            <p className="fw-bold mb-0">Price:</p>
                            <p className="text-success fw-bold mb-0">{price} LKR</p>
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
                                <Form.Group className="mb-3" controlId="Gender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control as="select" name="Gender" value={Gender} onChange={GenderHandler}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                       
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="seatType">
                                    <Form.Label>ageBetween</Form.Label>
                                    <Form.Control as="select" name="ageBetween" value={ageBetween} onChange={ageBetweenHandler}>
                                        <option value="1-10">1-10</option>
                                        <option value="10-20">10-20</option>
                                        <option value="20-30">20-30</option>
                                        <option value="30-50">30-50</option>
                                        <option value="50-100">50-100</option>
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
                                            <option value="galle">Gale</option>
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