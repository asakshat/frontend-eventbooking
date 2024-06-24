import { useState } from "react";
import GoogleMapInt from "./GoogleMapInt";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function EditEvent() {
    
    const location = useLocation();
    const event = location.state || {} 
    const locationParts = event.Location.split(', ');
    console.log(event);
    const navigate = useNavigate();
    const [address, setAddress] = useState({
    streetName: locationParts[0] || '',
    city: locationParts[1] || '',
    zipCode: locationParts[2] || '',
    country: locationParts[3] || ''
});
    const fullAddress = ` ${address.streetName}, ${address.city}, ${address.zipCode}, ${address.country}`;

    const [name, setName] = useState(event.Title);
    const [time, setTime] = useState(event.Time);
    const [date, setDate] = useState(event.Date && event.Date.split('T')[0]);
    const [price, setPrice] = useState(event.Price);
    const [description, setDescription] = useState(event.Description);
    const [venue, setVenue] = useState(event.Venue);
    const [file, setFile] = useState(event.ImageURL) || null;
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    // Get the coordinates of the address provided by the event creator
    const getCoordinates = async () => {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const encodedAddress = encodeURIComponent(fullAddress);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setCoordinates({ lat: location.lat, lng: location.lng });
                return { lat: location.lat, lng: location.lng };
            } else {
                console.error('No coordinates found for this address.');
                return { lat: null, lng: null };
            }
        } catch (error) {
            console.error('Error fetching geocode:', error);
            return { lat: null, lng: null };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchURL = import.meta.env.VITE_FETCH_URL;
        
        const formData = new FormData();
        formData.append('title', name);
        formData.append('date', formatDate(date));
        formData.append('time', time);
        formData.append('location', fullAddress);
        formData.append('venue', venue);
        formData.append('price', price);
        formData.append('description', description);
        if (file) {
            formData.append('image', file);
        }
        

        try {
            const response = await fetch(`${fetchURL}/api/event/update/${event.ID}`, {
                method: 'PUT',
                body: formData,
                credentials: 'include'
            });
            const data = await response.json();
            // console.log(data);
            if (response.ok) {
                navigate("/events")
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDelete = async (e) => {
        const fetchURL = import.meta.env.VITE_FETCH_URL;
         try {
            const response = await fetch(`${fetchURL}/api/event/delete/${event.ID}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await response.json();
            // console.log(data);
            if (response.ok) {
                navigate("/events")
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    getCoordinates();
    

    return (
        <div className="flex gap-5">
            <form method="post" className="event-creator" data-theme="cyberpunk" onSubmit={handleSubmit}>
                <h1 className="self-center">Create Event</h1>
                <div className="line1">
                    <label>Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={event.Title}/>
                    </label>
                    <label>Date:
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder={event.Date}/>
                    </label>
                    <label>Time:
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder={event.Time}/>
                    </label>
                </div>
                <div className="line2">
                    <label>Street:
                        <input type="text" name="streetName" value={address.streetName} onChange={handleChange} placeholder={locationParts[0] || ''}/>
                    </label>
                    <label>Zip Code:
                        <input type="text" className="w-11" name="zipCode" value={address.zipCode} onChange={handleChange}/>
                    </label>
                </div>
                <div className="line3">
                    <label>City:
                        <input type="text" name="city" value={address.city} onChange={handleChange} />
                    </label>
                    <label>Country:
                        <input type="text" name="country" value={address.country} onChange={handleChange} />
                    </label>
                </div>
                <label>Venue:
                    <input type="text" name="venue" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder={event.Venue} />
                </label>
                <label>Price:
                    <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={event.Price}/>
                </label>
                <label>Description:
                    <textarea className="w-96 h-24" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={event.Description}></textarea>
                </label>
                <label>Add an image:
                    <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <button className="btn btn-primary w-20" type="submit">Submit</button>
                <button className="btn btn-primary w-20" type="button" onClick={handleDelete}>Delete</button>
            </form>
            <GoogleMapInt lat={coordinates.lat} lng={coordinates.lng} address={address} />
        </div>
    );
}

export default EditEvent;