import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function dashboard() {
    const { data: session } = useSession();
    return (
        <section className="text-center">
            <div className="container">
                <h1>BO Dashoboard</h1>
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
                <div></div>
            </div>
        </section>
    );
}
