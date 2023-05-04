import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "lib/axios";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required")
});

const initialValues = {
    email: ""
};

const fieldsSet = [
    {
        userFriendlyName: "Email",
        id: "email",
        type: "email",
    }
];

const resetpassword = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    return (
        <>
            {!loading && (
                <div className="container">
                   <div className="row">
                    <div className="col-6">
                         <h4 className="text-center">Reset Account Password</h4>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log(JSON.stringify(values, null, 2));

                            axios
                                .post("auth/password_reset", values)
                                .then((response) => {
                                    console.log(response.data);
                                    alert("Check email for reset link");
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
                                <button className="btn btn-primary mt-2" type="submit">
                                    Reset
                                </button>
                        </Form>
                    </Formik>
                    </div>
                   </div>
                </div>
            )}
        </>
    );
};

export default resetpassword;
