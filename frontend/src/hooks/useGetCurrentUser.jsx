import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";


function useGetCurrentUser() {
    useEffect(() => {
        const fetchUser= async()=>{
            try {
                const result=await axios.get(`${serverUrl}/api/user/current`, {withCredentials: true});
                console.log("Current User:", result.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    },[]);
}


export default useGetCurrentUser;