const { useSession } = require("next-auth/react");
const { useEffect } = require("react");
const { axiosAuth } = require("lib/axios");

const useAxiosAuth = ()=>{
    const {data: session} = useSession();

    useEffect(()=>{
        console.log("request ......")
        console.log(session?.user)
        const requestInterceptor = axiosAuth.interceptors.request.use((config)=>{
            if(!config.headers['Authorization']){
                config.headers['Authorization'] = `bearer ${session?.user?.token}`
            }

            return config
        })

        return () =>{
            axiosAuth.interceptors.request.eject(requestInterceptor)
        }
    },[session])

    return axiosAuth;
}

export default useAxiosAuth