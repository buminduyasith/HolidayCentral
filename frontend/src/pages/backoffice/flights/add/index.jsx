import Layout from "@/components/layout/layout";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import BONavBar from "@/components/navbar/BONavBar";

export default function index() {
    const { data: session } = useSession();
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:5000/api/v1/backoffice/product/flights", formData);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    return (
        <>
            <BONavBar />
            <div className="container">
                <h2 className="mt-3">Upload Flight Ticket Reservations</h2>
                <form onSubmit={handleSubmit} className="mt-3">
                    <label htmlFor="formFileLg" className="form-label mb-3">
                    Please choose the CSV file that you would like to upload to the database
                    </label>
                    <input className="form-control form-control-lg" id="formFileLg" name="file" type="file" onChange={handleFileChange} />
                    <button className="btn btn-primary mt-3" type="submit">Upload</button>
                </form>
            </div>
        </>
    );
}