import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoaderComponent from "../components/LoaderComponent";
import { useMainContext } from "../context/MainContext";

const ProtectedLayout = () => {
    const { user } = useMainContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) {
        return <LoaderComponent />;
    }

    return <Outlet />;
};

export default ProtectedLayout;