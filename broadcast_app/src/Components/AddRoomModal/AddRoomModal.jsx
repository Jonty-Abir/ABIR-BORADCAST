import React, { useState } from "react";
import TextInput from "../shared/TextInput/TextInput";
import styles from "./AddRoomModal.module.css";

const AddRoomModal = ({ onClose }) => {
  // const history = useHistory();

  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");

  async function createRoom() {
    // try {
    //     if (!topic) return;
    //     const { data } = await create({ topic, roomType });
    //     history.push(`/room/${data.id}`);
    // } catch (err) {
    //     console.log(err.message);
    // }
  }

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src="/images/close.png" alt="close" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <div className="flex items-center gap-3 ">
            <TextInput
              fullwidth="true"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              id="id"
            />
            <label htmlFor="id">
              <img src="/images/search.png" alt="close" />
            </label>
          </div>
          <h2 className={styles.subHeading}>Room types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img src="/images/globe.png" alt="globe" width={50} />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img src="/images/social.png" alt="social" />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img src="/images/lock.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src="/images/team.png" alt="celebration" width={25} />
            <span>Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
