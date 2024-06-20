
export default function Logout() {
    
    const fetchUrl = import.meta.env.VITE_FETCH_URL;
    
    const handleLogout = async () => {
      try {
        const response = await fetch(`${fetchUrl}/api/logout`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          credentials: "include"
        });
    const data = await response.json();
    console.log(data);

      } catch (error) {
        console.error(error);
      }
    }

  return(
    <p style={{cursor: "pointer"}}
      onClick={() => handleLogout()}>Logout</p>
  )
}