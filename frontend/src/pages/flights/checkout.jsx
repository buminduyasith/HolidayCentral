import Layout from "@/components/layout/layout";
import React, { useState } from 'react';
import { Container, Form, InputGroup, Row, Col, Button, Card } from "react-bootstrap";
import { useRouter } from 'next/router'


const Checkout = () => {
    const router = useRouter();
    const { id } = router.query

    return (
        <Layout>
            <Container>
                <span>Hi {id}</span>
            </Container>
        </Layout>
    )
}

export default Checkout