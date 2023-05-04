import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "lib/axios";
import BONavBar from "@/components/navbar/BONavBar";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import BoHotelCard from "@/components/bocomponts/BoHotelCard";

export default function dashboard() {
    const { data: session } = useSession();

    const [hotels, setHotels] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const axiosAuth = useAxiosAuth();

    const removeItem = (id)=>{

        axiosAuth
        .delete(`api/v1/backoffice/product/hotels/${id}`)
        .then((res) => {
            alert("item deleted")
            getFlights()
        })
        .catch((error) => {
            console.error("something went wrong");
        });
    }

    const getHotels = ()=>{
        setLoading(true);
        axiosAuth
        .get(`api/v1/backoffice/product/hotels`)
        .then((res) => {
            console.log(res.data);
            setHotels(res.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setLoading(false);
        });
    }

    useEffect(() => {
        const myTimeout = setTimeout(() => {
            getHotels()
        }, 2000);
    }, []);

    return (
        <>
            <BONavBar />
            <div className="container">
                <h1 className="my-5">All Hotels</h1>

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {hotels?.map((hotel) => (
                            <BoHotelCard key={hotel._id} hotel={hotel} removeItem={removeItem} />
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
