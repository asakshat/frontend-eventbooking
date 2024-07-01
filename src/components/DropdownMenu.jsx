import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

function DropdownMenu({ isOpen, toggle }) {
  const toggleContainer = useRef(null);

  return (
    isOpen && (
      <div ref={toggleContainer}>
        <div
          style={{
            backgroundColor: "black",
            border: "1px solid #ddd",
            padding: "10px",
            color: "white",
          }}
        >
          <ul>
            <Link to="create-event">
              <li>Create event</li>
            </Link>
            <Link to="/events-by-organizer">
              <li>See your events</li>
            </Link>
            <Logout />
          </ul>
        </div>
      </div>
    )
  );
}

export default DropdownMenu;
