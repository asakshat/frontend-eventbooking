import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Logout() {
  
  const fetchUrl = import.meta.env.VITE_FETCH_URL;
  const { setUser } = useContext(UserContext);

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
      console.log(setUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <p style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
      Logout
    </p>
  );
}
