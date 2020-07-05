import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from '@fortawesome/free-solid-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import useOnclickOutside from "react-cool-onclickoutside";

const Navbar = (props) => {

  // setting up props from Home.js
  const socket = props.socket;
  const chatState = props.chatState;

  // state for room menus, to open and close
  const [navState, setNavState] = useState(false);
  const [rooms, setRooms] = useState(['General', 'Work', 'Random']);

  // Sets user to selected room room
  const joinRoom = (obj) => {
    socket.emit('switchRoom', obj);
    setNavState(false);
  }

  // Handles the user disconnecting
  const disconnect = () => {
    socket.emit('disconnect');
    window.location.reload(false);
  }

  // Cloase nav menu when user clicks outside of it
  const ref = useOnclickOutside(() => {
    setNavState(false);
  });

  // Handles user swithcing rooms and recieves server messages as well as broadcasts room change to relavant users
  useEffect(() => {
    socket.on('updateRoom', data => {
      setRooms(data);
    });
  }, [])

  return (
    <nav className="px-4 flex items-center flex-grow-0 flex-shrink-0 justify-between h-16 w-full bg-custom-blue text-custom-gold text-3xl md:text-4xl shadow">
    {navState === false ?
      chatState === true ?
        <button className="text-xl md:text-2xl"
          onClick={() => setNavState(!navState)}
        >
          <FontAwesomeIcon icon={faBars} /> Rooms
        </button>
        :
        <button className="text-xl md:text-2xl"></button>
      :
      <React.Fragment>
        <button className="text-xl md:text-2xl"
          onClick={() => setNavState(!navState)}
        >
        X Rooms
        </button>
        <div className="flex flex-col items-center p-2 top-0 left-0 mt-16 h-auto fixed pt-1 z-10 border-4 border-custom-biege bg-custom-biege text-xl rounded-br-lg"
          ref={ref}
        >
          {
            rooms.map((room, i) => (
              <button className="w-full py-2 hover:bg-custom-aqua hover:shadow"
                key={i}
                onClick={() => joinRoom(room)}
              >
                {room}
              </button>
            ))
          }
          <div>
            
          </div>
        </div>
      </React.Fragment>
    }
      <p className="text-center">Chatticus</p>
      <button className="text-xl md:text-2xl"
        onClick={disconnect}
      >
        Exit <FontAwesomeIcon icon={faDoorOpen} />
      </button>
    </nav>
  );
};

export default Navbar;