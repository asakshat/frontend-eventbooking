import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  
  const fetchUrl = import.meta.env.VITE_FETCH_URL;
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${fetchUrl}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      localStorage.removeItem("user");
      setUser(null);
      const data = await response.json();
      console.log(data);
      navigate("/");
      toast.success(data.message);
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <p style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
      Logout
    </p>
  );
}
