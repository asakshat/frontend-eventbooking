import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
    [{ size: [] }],

    ["code-block"],
  ],
};

function CreateEvent() {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    streetName: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const fullAddress = `${address.streetName}, ${address.city}, ${address.zipCode}, ${address.country}`;
=======
    
    const [responseMessage, setResponseMessage] = useState(''); 
    const navigate = useNavigate();
    const [address, setAddress] = useState({
        streetName: '',
        city: '',
        zipCode: '',
        country: ''
    });
    const fullAddress = `${address.streetName}, ${address.city}, ${address.zipCode}, ${address.country}`;
>>>>>>> f4e6677 (azee)

  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [file, setFile] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

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
        console.error("No coordinates found for this address.");
        return { lat: null, lng: null };
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
      return { lat: null, lng: null };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coords = await getCoordinates();
    const fetchURL = import.meta.env.VITE_FETCH_URL;
    const formData = new FormData();
    formData.append("title", name);
    formData.append("date", formatDate(date));
    formData.append("time", time);
    formData.append("location", fullAddress);
    formData.append("venue", venue);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("latitude", coords.lat);
    formData.append("longitude", coords.lng);

<<<<<<< HEAD
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await fetch(`${fetchURL}/api/event/create`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        navigate("/events");
        toast.success(`${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-10 min-h-screen">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-white text-black shadow-lg rounded-lg w-full max-w-5l"
        onSubmit={handleSubmit}
      >
        <h1 className="col-span-1 md:col-span-2 text-3xl font-bold mb-4 text-lefy">
          Create Event
        </h1>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block mt-1 p-2 border rounded w-full"
          />
        </label>

        <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block mb-2">
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block mt-1 p-2 border rounded w-full"
            />
          </label>

          <label className="block mb-2">
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="block mt-1 p-2 border rounded w-full"
            />
          </label>
=======
        try {
            const response = await fetch(`${fetchURL}/api/event/create`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data);
            setResponseMessage('Event created successfully!');
            if (response.ok) {
                navigate("/events")
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setResponseMessage('Error creating event. Please try again.');
        }
    };

    return (
        <div className="flex gap-5">
            <form method="post" className="event-creator" data-theme="cyberpunk" onSubmit={handleSubmit}>
                <h1 className="self-center">Create Event</h1>
                <div className="line1">
                    <label>Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>Date:
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </label>
                    <label>Time:
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                    </label>
                </div>
                <div className="line2">
                    <label>Street:
                        <input type="text" name="streetName" value={address.streetName} onChange={handleChange} />
                    </label>
                    <label>Zip Code:
                        <input type="text" className="w-11" name="zipCode" value={address.zipCode} onChange={handleChange} />
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
                    <input type="text" name="venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
                </label>
                <label>Price:
                    <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <label>Description:
                    <textarea className="w-96 h-24" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </label>
                <label>Add an image:
                    <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <button className="btn btn-primary w-20" type="submit">Submit</button>
            </form>
            <p>{responseMessage}</p>
            <GoogleMapInt lat={coordinates.lat} lng={coordinates.lng} address={address} />
>>>>>>> f4e6677 (azee)
        </div>
        <label className="block mb-2 md:col-span-1">
          Street:
          <input
            type="text"
            name="streetName"
            value={address.streetNasubmitme}
            onChange={handleChange}
            className="block mt-1 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2 md:col-span-1">
          Zip Code:
          <input
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            className="block mt-1 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2 md:col-span-1">
          City:
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            className="block mt-1 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2 md:col-span-1">
          Country:
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            className="block mt-1 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2 md:col-span-1">
          Venue:
          <input
            type="text"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="block mt-1 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2 md:col-span-1">
          Price:
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block mt-1 p-2 border rounded w-full"
          />
        </label>
        <label className="block mb-2 md:col-span-2">
          Description:
          <div className="editor">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
            />
          </div>
        </label>
        <label className="block mb-2 md:col-span-2">
          Add an image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>
        <button
          className="btn btn-primary col-span-1 md:col-span-2 mt-4 w-full"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
