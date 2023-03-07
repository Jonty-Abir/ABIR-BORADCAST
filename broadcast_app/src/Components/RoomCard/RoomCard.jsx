import React from "react";
import styles from "./RoomCard.module.css";

const RoomCard = ({ room }) => {
  return (
    <div
      onClick={() => {
        // history.push(`/room/${room.id}`);
      }}
      className={styles.card}
    >
      <h3 className={styles.topic}>{room.topic}</h3>
      <div
        className={`${styles.speakers} ${
          room.speakers.length === 1 ? styles.singleSpeaker : ""
        }`}
      >
        <div className={styles.avatars}>
          {room.speakers.map((speaker) => (
            <img key={speaker.id} src={speaker.avatar} alt="speaker-avatar" />
          ))}
        </div>
        <div className={`${styles.names} ml-[40%]`}>
          {room.speakers.map((speaker) => (
            <div key={speaker.id} className="flex ">
              <span className="text-lg font-semibold">{speaker.name}</span>
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
        <span>{room.totalPeople}</span>
        <img src="/images/user-icon.png" alt="user-icon" />
      </div>
    </div>
  );
};

export default RoomCard;
