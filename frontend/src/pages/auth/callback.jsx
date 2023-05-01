import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {userRoles} from "@/enums/userRoles";

const Signin = () => {
  const router = useRouter();
  const { data: session, status } = useSession()

  useEffect(()=>{

    if(session?.user?.role == userRoles.BACKOFFICEUSER){
        router.push('/backoffice/dashboard');
    }
    else if(session?.user?.role == userRoles.TRAVELAGENT){
      router.push('/traveladgent/dashboard');
    }


  },[status])

  return (
    <>
      <div className="container my-5">
        <h5 className="mb-4">Processing</h5>
      </div>
    </>
  );
};

export default Signin;