import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "@/components/layout/layout";
import { Container } from "react-bootstrap";
export default function dashboard() {
    const { data: session } = useSession();
    return (
        <Layout>
            <Container></Container>
        </Layout>
    );
}
