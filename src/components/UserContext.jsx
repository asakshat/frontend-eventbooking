import { useContext } from "react";

function UserContext() {

    getUser();

    const getUser = async () => {
        const fetchUrl = import.meta.env.VITE_FETCH_URL;

        try {
            const response = await fetch(`${fetchUrl}/api/logged`, {
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }

}

export default UserContext;