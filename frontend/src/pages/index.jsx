import Layout from "@/components/layout/layout";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { userRoles } from "@/enums/userRoles";

export default function Home() {
    const [file, setFile] = useState(null);
    const [hide, setHide] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.user?.role == userRoles.BACKOFFICEUSER) {
            router.push("/backoffice/dashboard");
        } else if (session?.user?.role == userRoles.TRAVELAGENT) {
            router.push("/traveladgent/dashboard");
        } else {
            router.push("/auth/signin");
        }
    }, [status]);

   
    return (
        <div>
            {hide && (
                <section className="text-center">
                    <div className="container">
                        <h1>Login</h1>
                        {session?.user ? (
                            <>
                                Signed in as {session.user.email} <br />
                                <button onClick={() => signOut()}>Sign out</button>
                            </>
                        ) : (
                            <>
                                Not signed in <br />
                                <button onClick={() => signIn()}>Sign in</button>
                            </>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}
