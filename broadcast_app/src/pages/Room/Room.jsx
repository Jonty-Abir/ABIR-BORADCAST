import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uid } from "uid";
import useWebRtc from "../../hooks/useWebRtc";

const Room = () => {

  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [clients, providerRef] = useWebRtc(roomId, user);
  return (
    <div>
      <h1>All Connected Client</h1>
      {clients.map((user) => {
        return (
          <div key={uid(25)}>
            <audio
              ref={(instance) => providerRef(instance, user._id)}
              autoPlay
              controls
            ></audio>
            <img src={user.avatar} width={50} height={50} alt="avatar"/>
            <h2>{user.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Room;
