import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "lib/axios";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("password is required"),
    confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
});

const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
};

const fieldsSet = [
    {
        userFriendlyName: "Email",
        id: "email",
        type: "email",
    },
    {
        userFriendlyName: "Password",
        id: "password",
        type: "password",
    },
    {
        userFriendlyName: "Confirm Password",
        id: "confirmPassword",
        type: "password",
    },
];

const resetcallback = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState(null);

    useEffect(() => {
        if (router.query.token) {
            setCode(router.query.token);
        }
    }, [router.query]);

    useEffect(() => {
        if (code) {
            console.log("code", code);
            setLoading(false);
        }
    }, [code]);

    return (
        <>
            {!loading && (
                <div className="container">
                    <h1 className="text-center">Reset password</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log(JSON.stringify(values, null, 2));

                            const user = {
                                email:values.email,
                                password:values.password
                            }

                            console.log(user)

                            const url = `auth/password_reset/${code}`

                            axios
                                .post(url, user)
                                .then((response) => {
                                    console.log(response.data);
                                    alert("user created");
                                })
                                .catch((error) => {
                                    console.log(error);
                                    alert("something went wrong");
                                });
                            setSubmitting(false);
                        }}
                    >
                        <Form>
                            {fieldsSet.map((field) => (
                                <div className="form-group mt-2" key={field.id}>
                                    <label htmlFor="fromTerminal">{field.userFriendlyName}</label>
                                    <Field type={field.type} name={field.id} className="form-control" />
                                    <ErrorMessage
                                        name={field.id}
                                        component="label"
                                        className="form-label text-danger"
                                    />
                                </div>
                            ))}
                            <div className="row">
                                <button className="btn btn-lg btn-primary mt-2" type="submit">
                                    Confirm
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            )}
        </>
    );
};

export default resetcallback;
