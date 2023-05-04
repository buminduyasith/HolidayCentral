import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FaRegClock, FaPlane ,FaHotel } from 'react-icons/fa';
import { BsBag, BsCreditCard, BsHouseExclamationFill } from 'react-icons/bs';
import Link from "next/link";

const BoHotelCard = ({ hotel, removeItem }) => {

    return (
        <Row className="mt-4">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-4">{hotel.name}</Card.Title>
                        <Row>
                            <Col>
                                <p>
                                    <FaHotel /> {hotel.checkInDate} — {hotel.checkOutDate}
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    <BsCreditCard /> {hotel.Price} LKR
                                </p>
                                <p>
                                    <BsHouseExclamationFill /> {hotel.rooms} rooms
                                </p>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs={8} />
                            <Col xs={8} />
                            <Col xs={8} >
                            <Button variant="primary text-white">
                                    <Link
                                        style={{ textDecoration: "none", color: "#000" }}
                                        href={`/backoffice/hotels/${hotel._id}`}
                                    >
                                        View
                                    </Link>
                                </Button>
                                <Button variant="danger" className="mx-2 text-white" onClick={()=>{removeItem(hotel._id)}}>
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


export default BoHotelCard;
