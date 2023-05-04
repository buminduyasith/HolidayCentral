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

    const removeItem = (id)=>{

        axiosAuth
        .delete(`api/v1/backoffice/product/flights/${id}`)
        .then((res) => {
            alert("item deleted")
            getFlights()
        })
        .catch((error) => {
            console.error("something went wrong");
        });
    }

    const getFlights = ()=>{
        setLoading(true);
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
    }

    useEffect(() => {
        const myTimeout = setTimeout(() => {
            getFlights()
        }, 2000);
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
                        {flights?.map((flight) => (
                            <BoFlightCard key={flight._id} flight={flight} removeItem={removeItem} />
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
