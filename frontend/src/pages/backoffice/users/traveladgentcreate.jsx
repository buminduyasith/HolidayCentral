import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "lib/axios";
import { useRouter } from "next/router";
import BONavBar from "@/components/navbar/BONavBar";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().min(10).max(10).required("Phone number is required"),
});

const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
};

export default function bousercreate() {
    const [isloading, setLoading] = useState(true);

    const fieldsSet = [
        {
            userFriendlyName: "Email",
            id: "email",
            type: "email",
        },
        {
            userFriendlyName: "First Name",
            id: "firstName",
            type: "text",
        },
        {
            userFriendlyName: "Last Name",
            id: "lastName",
            type: "text",
        },
        {
            userFriendlyName: "Phone number",
            id: "phoneNumber",
            type: "text",
        },
    ];

    return (
        <>
            <BONavBar />
            <div className="container">
                <h1 className="text-center">Travel agent user </h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(JSON.stringify(values, null, 2));
                        axios
                            .post("auth/travelagent/signup", values)
                            .then((response) => {
                                console.log(response.data);
                                alert("user created")
                            })
                            .catch((error) => {
                                console.log(error);
                                alert("something went wrong")
                            });
                        setSubmitting(false);
                    }}
                >
                    <Form>
                        {fieldsSet.map((field) => (
                            <div className="form-group mt-2" key={field.id}>
                                <label htmlFor="fromTerminal">{field.userFriendlyName}</label>
                                <Field type={field.type} name={field.id} className="form-control" />
                                <ErrorMessage name={field.id} component="label" className="form-label text-danger" />
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
        </>
    );
}
