import React from "react";
import { Nav } from "react-bootstrap";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function BONavBar() {
    const { data: session } = useSession();
    return (
        <Nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <div className="container-xl">
        <Link legacyBehavior href="/">
          <a className="navbar-brand">Holiday Central</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarsExample07XL">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link legacyBehavior href="/backoffice/dashboard">
                <a className="nav-link">DashBoard</a>
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto bg-red">
            <li className="nav-item">
              <span className="nav-link">{session?.user?.email}</span>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light nav-link" onClick={()=>{signOut()}}>Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
    );
}
