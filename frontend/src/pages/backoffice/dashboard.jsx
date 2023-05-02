import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import BONavBar from "@/components/navbar/BONavBar";

export default function dashboard() {
    const { data: session } = useSession();
    return (
        <>

            <BONavBar />
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Create Admin Account</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Create admin account for backoffice portal</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Create Travel agent account</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Create a travel agent account for public portal</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">User Account Control Section</h5>
                                <h6 className="card-subtitle mb-2 text-muted">User account update Section</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">View Flight Ticket Reservations </h5>
                                <h6 className="card-subtitle mb-2 text-muted">Can view & update all the Flight Ticket Reservations</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">View Hotel Reservations</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Can view & update all the Hotel Reservations</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">View Holiday Packages</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Can view & update all the Holiday Packages</h6>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mt-2">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add Flight Ticket Reservations </h5>
                                <h6 className="card-subtitle mb-2 text-muted">Add Flight Ticket Reservations details</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">Add Hotel Reservations</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Add Hotel Reservations details</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">Add Holiday Packages</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Add Holiday Packages details</h6>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}
