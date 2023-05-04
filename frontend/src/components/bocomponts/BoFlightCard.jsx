"use client";
import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { FaRegClock, FaPlane } from "react-icons/fa";
import { BsBag, BsCreditCard } from "react-icons/bs";
import Link from "next/link";

const BoFlightCard = ({ flight, removeItem }) => {
    return (
        <Row className="mt-4">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-4">{flight.airline}</Card.Title>
                        <Row>
                            <Col>
                                <p>
                                    <FaPlane /> {flight.fromTerminal} — {flight.toTerminal}
                                </p>
                                <p>
                                    <FaRegClock /> {flight.flightDuration} hrs
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    <BsCreditCard /> {flight.price.toLocaleString()} LKR
                                </p>
                                <p>
                                    <BsBag /> {flight.allowedMaxBaggageWeight} kg
                                </p>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <p>Departure date: {flight.departureDate}</p>
                                <p>Landing date: {flight.landingDate}</p>
                            </Col>
                            <Col>
                                <p>Stops: {flight.stops}</p>
                                <p>Class: {flight.flightClass}</p>
                                <p>Refundable: {flight.isRefundable ? "Yes" : "No"}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8} />
                            <Col xs={8} />
                            <Col xs={8}>
                                <Button variant="primary text-white">
                                    <Link
                                        style={{ textDecoration: "none", color: "#000" }}
                                        href={`/backoffice/flights/${flight._id}`}
                                    >
                                        View
                                    </Link>
                                </Button>
                                <Button variant="danger" className="mx-2 text-white" onClick={()=>{removeItem(flight._id)}}>
                                        Remove
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default BoFlightCard;
