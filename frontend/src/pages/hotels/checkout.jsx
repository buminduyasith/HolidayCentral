import Layout from "@/components/layout/layout";
import React, { useState } from 'react';
import { Container, Form, InputGroup, Row, Col, Button, Card, Accordion } from "react-bootstrap";
import { useRouter } from 'next/router'
import { FaUser, FaPlane,FaHotel, FaCreditCard } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs'
import axios from "axios";


const Checkout = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [roomType, setRoomType] = useState('');
    const [boardType, setBoardType] = useState('');
    const [email, setEmail] = useState('');
    const [aName, setaName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');

    const {
        id,
        name,
        price,
        rooms,
        featured,
        checkInDate,
        checkOutDate
    } = router.query

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const roomTypeHandler = (event) => {
        setRoomType(event.target.value);
    };
    const boardTypeHandler = (event) => {
        setBoardType(event.target.value);
    };

    const emailhandler = (event) => {
        setEmail(event.target.value);
    };

    const aNameHandler = (event) => {
        setaName(event.target.value);
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
        const finalData = { name, roomType, boardType, email, aName, address, city, zip, country };

        try {
            const res = await axios.post("http://localhost:5000/hotels/checkout", {
                name,
                aName,
                rooms,
                price,
                checkInDate,
                checkOutDate,
                featured,
                email,
                address,
                city,
                zip,
                country,
                roomType,
                boardType
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
                        <Card.Title className="fw-bold mb-4">Hotel Details</Card.Title>
                        <Card.Subtitle className="mb-3">
                            <FaHotel className="me-2" />
                            <span className="text-primary">Name:</span> {name} 
                        </Card.Subtitle>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <p className="fw-bold mb-1">Check in date:</p>
                                <p className="text-secondary">{checkInDate}</p>
                            </div>
                            <div>
                                <p className="fw-bold mb-1">Check out date:</p>
                                <p className="text-secondary">{checkOutDate}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <p className="fw-bold mb-1">City :</p>
                                <p className="text-secondary">{city}</p>
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
                            Agent Details
                        </Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="mealType">
                                    <Form.Label>Room Type:</Form.Label>
                                    <Form.Control as="select" name="roomType" value={email} onChange={roomTypeHandler}>
                                        <option value="Deluxe">Deluxe</option>
                                        <option value="Super Deluxe">Super Deluxe</option>
                                        <option value="Suite">Suite</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="seatType">
                                    <Form.Label>Board Type</Form.Label>
                                    <Form.Control as="select" name="boardType" value={boardType} onChange={boardTypeHandler}>
                                        <option value="Full board">Full board</option>
                                        <option value="Half board">Half board</option>
                                        <option value="Bread & Breakfast">Bread & Breakfast</option>
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
                                        <Form.Control type="text" placeholder="Enter your name" value={aName} onChange={aNameHandler} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your address" value={address} onChange={addressHandler} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="seatType">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control as="select" name="Country" value={country} onChange={countryHandler}>
                                            <option value="Sri Lanka">Sri Lanka</option>
                                            <option value="NetherLands">NetherLands</option>
                                            <option value="Germany">Germany</option>
                                            <option value="United States">United States</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="seatType">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control as="select" name="city" value={city} onChange={cityHandler}>
                                            <option value="Colombo">Colombo</option>
                                            <option value="Matara">Matara</option>
                                            <option value="Galle">Galle</option>
                                            <option value="Hambanthota">Hambanthota</option>
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