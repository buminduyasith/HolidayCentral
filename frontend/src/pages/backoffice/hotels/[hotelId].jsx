import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "lib/axios";
import { useRouter } from "next/router";
import BONavBar from "@/components/navbar/BONavBar";

const validationSchema = Yup.object({
    name: Yup.string().required(),
    type: Yup.string().required(),
    city: Yup.string().required(),
    desc: Yup.string().required(),
    rating: Yup.number().required(),
    rooms: Yup.number().required(),
    Price: Yup.number().required(),
    checkInDate: Yup.string().required(),
    checkOutDate: Yup.string().required(),
    facilities: Yup.string().required(),
});

const initialValues = {
    name: "",
    type: "",
    city: "",
    address: "",
    title: "",
    desc: "",
    rating: "",
    rooms: "",
    Price: "",
    checkInDate: "",
    checkOutDate: "",
    facilities: "",
};


export default function FlightDetail() {
    const router = useRouter();
    const [hotelIdId, setHotelId] = useState(null);
    const [isloading, setLoading] = useState(true);

    const fieldsSet = [
        "name",
        "type",
        "city",
        "address",
        "title",
        "desc",
        "rating",
        "rooms",
        "Price",
        "checkInDate",
        "checkOutDate",
        "facilities"
    ];

    useEffect(() => {
        if (router.query?.hotelId) {
            setHotelId(router.query.hotelId);
        }
    }, [router.query]);

    useEffect(() => {
        if (hotelIdId) {
            axios
                .get(`api/v1/backoffice/product/hotels/${router.query.hotelId}`)
                .then((res) => {
                    console.log(res.data);
                    initialValues.name = res.data.name;
                    initialValues.type = res.data.type;
                    initialValues.city = res.data.city;
                    initialValues.address = res.data.address;
                    initialValues.title = res.data.title;

                    initialValues.desc = res.data.desc;
                    initialValues.rating = res.data.rating;
                    initialValues.rooms = res.data.rooms;
                    initialValues.Price = res.data.Price;
                    initialValues.checkOutDate = res.data.checkOutDate;
                    initialValues.checkInDate = res.data.checkInDate;
                    initialValues.facilities = res.data.facilities;
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [hotelIdId]);

    return (
        <>
        <BONavBar />
            {!isloading && (
                <div className="container">
                    <h1 className="text-center">hotel detail view </h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }}
                    >
                        <Form>
                            {fieldsSet.map((field) => (
                                <div className="form-group" key={field}>
                                    <label htmlFor="fromTerminal">{field}</label>
                                    <Field type="text" name={field} className="form-control" />
                                    <ErrorMessage name={field} component="label" className="form-label text-danger" />
                                </div>
                            ))}
                            <div className="row">
                                <button className="btn btn-lg btn-primary mt-2" type="submit">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            )}
        </>
    );
}
