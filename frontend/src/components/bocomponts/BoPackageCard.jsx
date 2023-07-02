import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FaRegClock, FaPlane ,FaHotel } from 'react-icons/fa';
import { BsBag, BsCreditCard } from 'react-icons/bs';
import Link from "next/link";

const BoPackageCard = ({ holidayPackage, removeItem }) => {

    return (
        <Row className="mt-4">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-4">{holidayPackage?.packageName}</Card.Title>
                        <Row>
                            <Col>
                                <p>
                                    <FaHotel /> {holidayPackage?.duration} dates
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    <BsCreditCard /> {holidayPackage?.price} LKR
                                </p>
                                <p>
                                    <BsBag /> {holidayPackage?.specialty}
                                </p>
                            </Col>
                        </Row>
                        <hr />
                        {<Row>
                            <Col>
                                <p>Destination: {holidayPackage.destination}</p>
                                <p>Number Of Travelers: {holidayPackage.numberOfTravelers}</p>
                            </Col>
                            <Col>
                                <p>TourLocation: {holidayPackage.tourLocation}</p>
                                <p>Package Description: {holidayPackage.packageDescription}</p>
                                <p>Contact email: {holidayPackage.contactEmail}</p>
                            </Col>
                        </Row>}
                        <Row>
                            <Col xs={8} />
                            <Col xs={8} />
                            <Col xs={8} >
                            <Button variant="primary text-white">
                                    <Link
                                        style={{ textDecoration: "none", color: "#000" }}
                                        href={`/backoffice/holidaypackages/${holidayPackage._id}`}
                                    >
                                        View
                                    </Link>
                                </Button>
                                <Button variant="danger" className="mx-2 text-white" onClick={()=>{removeItem(holidayPackage._id)}}>
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



export default BoPackageCard;
