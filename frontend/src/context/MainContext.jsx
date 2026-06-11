/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoaderComponent from "../components/LoaderComponent";
import { axiosClient } from "../utils/axiosClient";

export const mainContext = createContext();

export const useMainContext = () => useContext(mainContext);

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const[tasks,setTask] = useState([])

      const fetchAllTask=async()=>{
        try {
          
          const response = await axiosClient.get("/all-task",{
            headers:{
            user:localStorage.getItem("user") || ''
          }
        })
        const data = response.data
        setTask(data)

        }catch(error){
          toast.error(error.response?.data?.error || error.message)
        }
      }
          
  const logoutHandler = ()=>{
    localStorage.removeItem("user")
    toast.success("Logout Success")
    navigate("/login")
    setUser(null)
  }
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("user") || ''
      if (!token) return

      const response = await axiosClient.get("/profile", {
        headers: {
          user: token,
        },
      });

      const data = response.data;
      setUser(data);
      await fetchAllTask()
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderComponent />
      </div>
    );
  }

  return (
    <mainContext.Provider
      value={{
        user,
        tasks,
        logoutHandler,
        setUser,
        fetchProfile,
        fetchAllTask,
        loading,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};