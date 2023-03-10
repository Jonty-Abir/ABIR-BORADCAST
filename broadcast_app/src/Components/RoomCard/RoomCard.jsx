import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RoomCard.module.css";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/room/${room._id}`);
      }}
      className={styles.card}
    >
      <h3 className={`font-bold`}>{room.tropic}</h3>
      <div
        className={`${styles.speakers} ${
          room.speaker.length === 1 ? styles.singleSpeaker : ""
        }`}
      >
        <div className={styles.avatars}>
          {room.speaker.map((speaker) => (
            <img key={speaker.id} src={speaker.avatar} alt="speaker-avatar" />
          ))}
        </div>
        <div className={`${styles.names} ml-[40%]`}>
          {room.speaker.map((speaker) => (
            <div key={speaker.id} className="flex ">
              <span className="text-sm font-semibold">{speaker.name}</span>
              <img
                src="/images/commments.png"
                alt="chat-bubble"
                width={25}
                height={25}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{1}</span>
        <img src="/images/user-icon.png" alt="user-icon" />
      </div>
    </div>
  );
};

export default RoomCard;
