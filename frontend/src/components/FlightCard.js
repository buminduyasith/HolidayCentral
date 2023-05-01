import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FaRegClock, FaPlane } from 'react-icons/fa';
import { BsBag, BsCreditCard } from 'react-icons/bs';
import Link from "next/link";

const FlightCard = ({ flight }) => {
    const {
        _id,
        airline,
        fromTerminal,
        toTerminal,
        flightDuration,
        price,
        departureTime,
        landingTime,
        stops,
        class: flightClass,
        allowedMaxBaggageWeight,
        isRefundable,
        departureDate,
        landingDate,
        fromCountry,
        toCountry,
        tripType
    } = flight;

    return (
        <Row className="mt-4">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-4">{airline}</Card.Title>
                        <Row>
                            <Col>
                                <p>
                                    <FaPlane /> {fromTerminal} — {toTerminal}
                                </p>
                                <p>
                                    <FaRegClock /> {flightDuration} hrs
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    <BsCreditCard /> {price.toLocaleString()} LKR
                                </p>
                                <p>
                                    <BsBag /> {allowedMaxBaggageWeight} kg
                                </p>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <p>Departure Time: {departureTime}</p>
                                <p>Landing Time: {landingTime}</p>
                            </Col>
                            <Col>
                                <p>Stops: {stops}</p>
                                <p>Class: {flightClass}</p>
                                <p>Refundable: {isRefundable ? 'Yes' : 'No'}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} />
                            <Col xs={8} />
                            <Col xs={8} >
                                <Button variant="primary">
                                    <Link
                                        style={{ textDecoration: 'none', color: '#000' }}
                                        href={{
                                            pathname: "./checkout",
                                            query: {
                                                id: _id,
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
                                            }
                                        }}
                                        as={'flights/flightscheckout'}
                                    >Checkout</Link>
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

const FlightList = ({ flights }) => {

    if (!flights) {
        return <p>Loading flights...</p>;
    }

    return (
        <>
            {flights.map((flight) => (
                <FlightCard key={flight._id} flight={flight} />
            ))}
        </>
    );
};

export default FlightList;
