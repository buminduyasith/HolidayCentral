import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "lib/axios";
import { useRouter } from "next/router";
import BONavBar from "@/components/navbar/BONavBar";
import useAxiosAuth from "lib/hooks/useAxiosAuth";

const validationSchema = Yup.object({
    airline: Yup.string().required("Airline is required"),
    fromTerminal: Yup.string().required("From terminal is required"),
    toTerminal: Yup.string().required("To terminal is required"),
    fromCountry: Yup.string().required("From country is required"),
});

const initialValues = {
    airline: "",
    fromTerminal: "",
    toTerminal: "",
    fromCountry: "",
    toCountry: "",
    roundBackfromTerminal: "",
    roundBackToTerminal: "",
    price: "",
    departureDate: "",
    departureTime: "",
    landingDate: "",
    landingTime: "",
    flightDuration: "",
    stops: "",
    allowedMaxBaggageWeight: "",
    isRefundable: false,
    tripType: "",
    class: "",
};

export default function FlightDetail() {
    const router = useRouter();
    
    const axiosAuth = useAxiosAuth();

    const [flightId, setFlightId] = useState(null);
    const [isloading, setLoading] = useState(true);

    const fieldsSet = [
        "airline",
        "fromTerminal",
        "toTerminal",
        "fromCountry",
        "toCountry",
        "roundBackfromTerminal",
        "roundBackToTerminal",
        "price",
        "departureDate",
        "departureTime",
        "landingDate",
        "landingTime",
        "flightDuration",
        "stops",
        "allowedMaxBaggageWeight",
        "tripType",
    ];

    useEffect(() => {
        if (router.query?.flightId) {
            setFlightId(router.query.flightId);
        }
    }, [router.query]);

    useEffect(() => {
        if (flightId) {
            axiosAuth
                .get(`api/v1/backoffice/product/flights/${router.query.flightId}`)
                .then((res) => {
                    console.log(res.data);
                    initialValues.airline = res.data.airline;
                    initialValues.fromTerminal = res.data.fromTerminal;
                    initialValues.toTerminal = res.data.toTerminal;
                    initialValues.fromCountry = res.data.fromCountry;
                    initialValues.toCountry = res.data.toCountry;

                    initialValues.roundBackfromTerminal = res.data.roundBackfromTerminal;
                    initialValues.roundBackToTerminal = res.data.roundBackToTerminal;
                    initialValues.price = res.data.price;
                    initialValues.departureDate = res.data.departureDate;
                    initialValues.departureTime = res.data.departureTime;
                    initialValues.landingDate = res.data.landingDate;
                    initialValues.landingTime = res.data.landingTime;
                    initialValues.roundBackToTerminal = res.data.roundBackToTerminal;
                    initialValues.flightDuration = res.data.flightDuration;
                    initialValues.stops = res.data.stops;
                    initialValues.allowedMaxBaggageWeight = res.data.allowedMaxBaggageWeight;
                    initialValues.tripType = res.data.tripType;
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [flightId]);

    return (
        <>
        <BONavBar />
            {!isloading && (
                <div className="container">
                    <h1 className="text-center">flight detail view </h1>
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
