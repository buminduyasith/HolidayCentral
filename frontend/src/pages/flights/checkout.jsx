import Layout from "@/components/layout/layout";
import React, { useState } from 'react';
import { Container, Form, InputGroup, Row, Col, Button, Card, Accordion } from "react-bootstrap";
import { useRouter } from 'next/router'


const Checkout = () => {
    const router = useRouter();
    const { id } = router.query

    return (
        <Layout>
            <Container>
                <Row style={{ paddingTop: '5vh' }}>
                    <Card style={{ width: '100%' }}>
                        <Card.Title>Ticket Details</Card.Title>
                        <Card.Subtitle>flightDuration</Card.Subtitle>
                        <Card.Text>
                            Other Flight Info like price, depArturertime, landingtime etc...
                        </Card.Text>
                    </Card>
                </Row>
                <Row style={{ paddingTop: '5vh' }}>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Traveller Details</Accordion.Header>
                            <Accordion.Body>
                                Get Necessary user details like meal type and seat(Basic Widow, Isle or middle seat selection)
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" disabled>
                            <Accordion.Header>Paymet Options</Accordion.Header>
                            <Accordion.Body>
                                Get Payment Details
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Checkout</Accordion.Header>
                            <Accordion.Body>
                                Complte payment
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </Container>
        </Layout>
    )
}

export default Checkout