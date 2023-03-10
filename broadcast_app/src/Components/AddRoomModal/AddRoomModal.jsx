import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom as create } from "../../helper/helper";
import styles from "./AddRoomModal.module.css";

const AddRoomModal = ({ onClose }) => {
  const navigation = useNavigate();

  const [roomType, setRoomType] = useState("open");
  const [tropic, setTropic] = useState("");

  async function createRoom() {
    try {
      if (!tropic) return;
      const { room } = await create(tropic, roomType);
      navigation(`/room/${room._id}`);
    } catch (err) {
      console.log(err.message);
    }
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
            <input
              className="bg-[#323232] px-3 py-3 rounded-md focus:outline-none w-full placeholder:text-gray-600 font-semibold"
              placeholder="Enter disscation tropic to create"
              value={tropic}
              onChange={(e) => setTropic(e.target.value)}
              id="id"
            />
            <label htmlFor="id">
              <img src="/images/qa.png" alt="close" width={40} />
            </label>
          </div>
          <h2 className={styles.subHeading}>Room types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`justify-evenly ${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img src="/images/globe.png" alt="globe" width={50} />
              <span className="font-semibold text-gray-300">Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`justify-evenly ${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img src="/images/social.png" alt="social" />
              <span className="font-semibold text-gray-300">Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={` flex justify-evenly ${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img src="/images/lock.png" alt="lock" />
              <span className="font-semibold text-gray-300">Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <p className="text-lg font-semibold text-gray-300">Start a room, open to everyone</p>
          <br />
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
