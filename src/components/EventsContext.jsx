// EventsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('your-api-url');
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events); 
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
