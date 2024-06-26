import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";


function DisplayAllEvents() {

  const [events, setEvents] = useState(null);
  const navigate = useNavigate();
  // const { user } = useContext(UserContext);
  // console.log(user);
  // console.log(user.user.ID);

  async function getEventList() {
    try {
      const fetchURL = import.meta.env.VITE_FETCH_URL;
      const response = await fetch(`${fetchURL}/api/event`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to retrieve data:", error);
    }
  }

  useEffect(() => {
    getEventList();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen p-10">
      <div className="flex flex-col">
        <h1 className="text-8xl font-bold">Events</h1>
        <p className="text-2xl font-bold py-10">
          Here you can find all our events. Search and book easily with just a
          few clicks!
        </p>
      </div>
      <div className="flex flex-wrap gap-9">
        {!events
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-64 h-96 flex flex-col justify-between border p-4"
              >
                <div className="skeleton h-32 w-full mb-4"></div>
                <div className="flex-grow">
                  <div className="skeleton h-4 w-28 mb-2"></div>
                  <div className="skeleton h-4 w-full mb-2"></div>
                  <div className="skeleton h-4 w-full mb-2"></div>

                  <div className="skeleton h-4 w-full mb-2"></div>
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="skeleton btn w-20"></div>
                  <div className="skeleton btn w-20"></div>
                </div>
              </div>
            ))
          : events.events.map((event) => (
              <div
                key={event.ID}
                className="w-64 bg-white rounded-lg shadow-lg p-6 h-96 flex flex-col justify-between border"
              >
                <div className="image h-32 mb-4">
                  <img
                    src={event.ImageURL}
                    alt={event.Title}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="info flex-grow">
                  <p className="font-bold truncate">
                    {event.Title} - {event.Organizer?.Username}
                  </p>
                  <p>
                    {formatDate(event.Date)} {event.Time}
                  </p>
                  <p className="truncate">{event.Location}</p>
                  <p>
                    {event.Venue} {event.Price}€
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link to={`/event/${event.ID}`} state={event}>
                    <button className="btn btn-primary w-20">See Event</button>
                  </Link>
                  {/* {user.user.ID === event.Organizer.ID && (
                    <Link to={`/edit-event/${event.ID}`} state={event}>
                    <button className="btn btn-secondary w-20">
                      Modify Event
                    </button>
                  </Link>)} */}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default DisplayAllEvents;
