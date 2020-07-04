import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from '@fortawesome/free-solid-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {

  const socket = props.socket;
  const chatState = props.chatState;
  // const rooms = props.rooms;

  const [navState, setNavState] = useState(false);
  const [rooms, setRooms] = useState(['General', 'Work', 'Random']);


  const joinRoom = (obj) => {
    socket.emit('switchRoom', obj);
    setNavState(false);
  }

  const disconnect = () => {
    socket.emit('disconnect');
    window.location.reload(false);
  }

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
          onClick={() => setNavState(true)}
        >
          <FontAwesomeIcon icon={faBars} /> Rooms
        </button>
        :
        <button className="text-xl md:text-2xl"></button>
      :
      <React.Fragment>
        <button className="text-xl md:text-2xl"
          onClick={() => setNavState(false)}
        >
        X Rooms
        </button>
        <div className="flex flex-col items-center p-2 top-0 left-0 mt-16 h-auto fixed pt-1 z-10 border-4 border-custom-biege bg-custom-biege text-xl rounded-br-lg">
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