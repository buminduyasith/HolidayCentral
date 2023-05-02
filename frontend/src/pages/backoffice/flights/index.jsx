import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import BoFlightCard from "@/components/bocomponts/boFlightCard";
import axios from "lib/axios";
import BONavBar from "@/components/navbar/BONavBar";

export default function dashboard() {
    const { data: session } = useSession();

    const [flights, setFlights] = useState([]);
    const [isloading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get(`api/v1/backoffice/product/flights`)
        .then((res) => {
            console.log(res.data)
            setFlights(res.data)
            setLoading(false)
        })
        .catch((error) => {
            console.error(error);
            setLoading(false)
        });
        setFlights(flights);
    }, []);

    return (
        <>
        <BONavBar />
            <div className="container">
                <h1 className="my-5">All Flights</h1>
                {flights?.map((flight) => (
                    <BoFlightCard key={flight._id} flight={flight} />
                ))}
            </div>
        </>
    );
}
