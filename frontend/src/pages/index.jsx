import Layout from "@/components/layout/layout";
import React, {useState} from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from 'axios';

export default function Home() {
    const { data: session } = useSession();
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const res = await axios.post('http://localhost:5000/api/v1/backoffice/product/flights', formData);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
    return (
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
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="file" name="file" onChange={handleFileChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
