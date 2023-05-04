import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FaRegClock, FaPlane ,FaHotel } from 'react-icons/fa';
import { BsBag, BsCreditCard } from 'react-icons/bs';
import Link from "next/link";

const PackageCard = ({ pack }) => {

    console.log("pack-->", pack)

    const {
      destination,
      duration,
    //   travelEndDate,
      numberOfTravelers,
      specialty,
      packageName,
      price,
      tourLocation,
      packageRating,
        //class: flightClass,
       // rooms,
        // price,
        packageDescription,
        contactEmail
        // facilities,
        // featured

    } = pack;

    return (
        <Row className="mt-4">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-4">{packageName}</Card.Title>
                        <Row>
                            <Col>
                                <p>
                                    <FaHotel /> {duration} dates
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    <BsCreditCard /> {price} LKR
                                </p>
                                <p>
                                    <BsBag /> {specialty}
                                </p>
                            </Col>
                        </Row>
                        <hr />
                        {<Row>
                            <Col>
                                <p>destination: {destination}</p>
                                <p>numberOfTravelers: {numberOfTravelers}</p>
                            </Col>
                            <Col>
                                <p>tourLocation: {tourLocation}</p>
                                <p>packageRating: {packageRating}</p>
                                <p>packageDescription: {packageDescription}</p>
                                <p>packageDescription: {contactEmail}</p>
                            </Col>
                        </Row>}
                        <Row>
                            <Col xs={8} />
                            <Col xs={8} />
                            <Col xs={8} >
                                <Button variant="primary">
                                    <Link
                                        style={{ textDecoration: 'none', color: '#000' }}
                                        href={{
                                            pathname: "./checkoutPackage",
                                            query: {
                                                destination,
                                                // travelStartDate,
                                                // travelEndDate,
                                                numberOfTravelers,
                                                specialty,
                                                packageName,
                                                price,
                                                tourLocation,
                                                packageRating,
                                                  //class: flightClass,
                                                 // rooms,
                                                  // price,
                                                  packageDescription,
                                                  contactEmail
                                                  // facilities,
                                                  // featured
                                            }
                                        }}
                                        as={'packages/checkoutPackage'}
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

const packageList = ({ packageD }) => {

    if (!packageD) {
        console.log("01-->",packageD)
        return <p>Loading packages...</p>;
    }

    return (
        <>
            {packageD.map((package1) => (
                <PackageCard pack={package1} />
            ))}
        </>
    );
};

export default packageList;
