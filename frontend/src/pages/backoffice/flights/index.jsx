import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import BoFlightCard from "@/components/bocomponts/boFlightCard";
import axios from "lib/axios";
import BONavBar from "@/components/navbar/BONavBar";
import useAxiosAuth from "lib/hooks/useAxiosAuth";

export default function dashboard() {
    const { data: session } = useSession();

    const [flights, setFlights] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const axiosAuth = useAxiosAuth();

    useEffect(() => {
        const myTimeout = setTimeout(() => {
            axiosAuth
                .get(`api/v1/backoffice/product/flights`)
                .then((res) => {
                    console.log(res.data);
                    setFlights(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
            setFlights(flights);
        }, 5000);
    }, []);

    return (
        <>
            <BONavBar />
            <div className="container">
                <h1 className="my-5">All Flights</h1>

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {flights.map((flight) => (
                            <BoFlightCard key={flight._id} flight={flight} />
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
