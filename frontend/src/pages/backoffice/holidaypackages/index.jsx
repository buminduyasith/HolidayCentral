import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import BONavBar from "@/components/navbar/BONavBar";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import BoPackageCard from "@/components/bocomponts/BoPackageCard";

export default function dashboard() {
    const { data: session } = useSession();

    const [packages, setPackages] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const axiosAuth = useAxiosAuth();

    const removeItem = (id)=>{
        axiosAuth
        .delete(`api/v1/backoffice/product/packages/${id}`)
        .then((res) => {
            alert("item deleted")
            getPackages()
        })
        .catch((error) => {
            console.error("something went wrong");
        });
    }

    const getPackages = ()=>{
        setLoading(true);
        axiosAuth
        .get(`api/v1/backoffice/product/packages`)
        .then((res) => {
            console.log(res.data);
            setPackages(res.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setLoading(false);
        });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            getPackages()
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <BONavBar />
            <div className="container">
                <h1 className="my-5">All Packages</h1>

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {packages?.map((holidaypackage) => (
                            <BoPackageCard key={holidaypackage._id} holidayPackage={holidaypackage} removeItem={removeItem} />
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
