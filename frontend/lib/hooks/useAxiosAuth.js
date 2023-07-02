const { useSession, signOut } = require("next-auth/react");
const { useEffect } = require("react");
const { axiosAuth } = require("lib/axios");
import { useRouter } from 'next/router';
const useAxiosAuth = ()=>{
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(()=>{
        console.log("request ......")
       // console.log(session?.user)
        const requestInterceptor = axiosAuth.interceptors.request.use((config)=>{
            if(!config.headers['Authorization']){
                config.headers['Authorization'] = `bearer ${session?.user?.token}`
            }

            return config
        })

        const responseInterceptor = axiosAuth.interceptors.response.use(
            (response) => response,
            (error) => {
              if (error.response.status === 401) {
                // router.push('/auth/signout');
                signOut();
              }
      
              return Promise.reject(error);
            }
        );

        return () =>{
            axiosAuth.interceptors.request.eject(requestInterceptor)
            axiosAuth.interceptors.response.eject(responseInterceptor);
        }
    },[session])

    return axiosAuth;
}

export default useAxiosAuth