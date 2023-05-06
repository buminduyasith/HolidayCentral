import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "lib/axios";
import { useRouter } from "next/router";
import BONavBar from "@/components/navbar/BONavBar";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";

const validationSchema = Yup.object({
    destination: Yup.string().required(),
    duration: Yup.string().required(),
    numberOfTravelers: Yup.string().required(),
    specialty: Yup.string().required(),
    packageName: Yup.string().required(),
    price: Yup.string().required(),
    tourLocation: Yup.string().required(),
    packageRating: Yup.string().required(),
    packageDescription: Yup.string().required(),
    contactEmail: Yup.string().required(),
});

const initialValues = {
    destination: "",
    duration: "",
    numberOfTravelers: "",
    specialty: "",
    packageName: "",
    price: "",
    tourLocation: "",
    packageRating: "",
    packageDescription: "",
    contactEmail: "",
};

export default function FlightDetail() {
    const router = useRouter();
    const { data: session, status } = useSession()
    const axiosAuth = useAxiosAuth();

    const [packageId, setPackageId] = useState(null);
    const [isloading, setLoading] = useState(true);

    const fieldsSet = [
        "destination",
        "duration",
        "numberOfTravelers",
        "specialty",
        "packageName",
        "price",
        "tourLocation",
        "packageRating",
        "packageDescription",
        "contactEmail",
    ];

    useEffect(() => {
        if (router.query?.packageId) {
            setPackageId(router.query.packageId);
        }
    }, [router.query]);

    useEffect(() => {
        if (packageId) {
            axiosAuth
                .get(`api/v1/backoffice/product/packages/${packageId}`)
                .then((res) => {
                    console.log(res.data);

                    initialValues.destination = res.data.destination;
                    initialValues.duration = res.data.duration;
                    initialValues.numberOfTravelers = res.data.numberOfTravelers;
                    initialValues.specialty = res.data.specialty;
                    initialValues.packageName = res.data.packageName;
                    initialValues.price = res.data.price;

                    initialValues.tourLocation = res.data.tourLocation;
                    initialValues.packageRating = res.data.packageRating;
                    initialValues.packageDescription = res.data.packageDescription;
                    initialValues.contactEmail = res.data.contactEmail;

                   
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [session]);

    return (
        <>
        <BONavBar />
            {!isloading && (
                <div className="container">
                    <h1 className="text-center">package detail view </h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log(JSON.stringify(values, null, 2));
                            axiosAuth
                            .put(`api/v1/backoffice/product/packages/${packageId}`, values)
                            .then((response) => {
                                console.log(response.data);
                                alert("updated");
                            })
                            .catch((error) => {
                                console.error(error);
                                alert("something went wrong");
                            });

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
