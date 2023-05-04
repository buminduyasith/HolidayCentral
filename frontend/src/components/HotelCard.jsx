import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FaRegClock, FaPlane ,FaHotel } from 'react-icons/fa';
import { BsBag, BsCreditCard } from 'react-icons/bs';
import Link from "next/link";

const HotelCard = ({ hotel }) => {
    const {
        _id,
        name,
        type,
        city,
        address,
        title,
        photos,
        desc,
        rating,
        rooms,
        price,
        checkInDate,
        checkOutDate,
        facilities,
        featured
    } = hotel;

    return (
        <Row className="mt-4">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-4">{name}</Card.Title>
                        <Row>
                            <Col>
                                <p>
                                    <FaHotel /> {checkInDate} — {checkOutDate}
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    <BsCreditCard /> {price} LKR
                                </p>
                                <p>
                                    <BsBag /> {rooms}
                                </p>
                            </Col>
                        </Row>
                        <hr />
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
                                                name,
                                                type,
                                                city,
                                                address,
                                                title,
                                                photos,
                                                desc,
                                                rating,
                                                rooms,
                                                price,
                                                checkInDate,
                                                checkOutDate,
                                                facilities,
                                                featured
                                            }
                                        }}
                                        as={'hotels/hotelscheckout'}
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

const HoteltList = ({ hotels }) => {

    if (!hotels) {
        console.log(hotels)
        return <p>Loading hotels...</p>;
    }

    return (
        <>
            {hotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
            ))}
        </>
    );
};

export default HoteltList;
