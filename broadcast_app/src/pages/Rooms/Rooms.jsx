import React, { useState } from "react";
import { useQuery } from "react-query";
import { uid } from "uid";
import AddRoomModal from "../../Components/AddRoomModal/AddRoomModal";
import RoomCard from "../../Components/RoomCard/RoomCard";
import Loader from "../../Components/shared/Loader/Loader";
import { getAllRooms } from "../../helper/helper";
import styles from "./Rooms.module.css";

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);

  const { data, isError, isLoading } = useQuery("rooms", getAllRooms);

  function openModal() {
    setShowModal(true);
  }
  if (isError) {
    return <h2>Error was Occure!</h2>;
  }
  if (isLoading)
    return <Loader message="Loading..." />;
  const rooms = data.rooms ;
  return (
    <>
      <div className="">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <div className="flex justify-start items-start">
              <span className={styles.heading}>All voice rooms</span>
            </div>
            <div className={styles.searchBox}>
              <img src="/images/search.png" alt="search" width={25} />
              <input
                type="text"
                className={`${styles.searchInput} placeholder:text-green-400 font-semibold`}
                placeholder="Serach"
              />
            </div>
          </div>
          {/* ST ROOM BTN */}
          <div className={styles.right}>
            <button onClick={openModal} className={styles.startRoomButton}>
              <img src="/images/add-room-icon.png" alt="add-room" />
              <span>Start a room</span>
            </button>
          </div>
        </div>

        <div className={styles.roomList}>
          {rooms.map((room) => {
            return (
              <div key={uid()}>
                <RoomCard room={room} />
              </div>
            );
          })}
        </div>
      </div>
      {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Rooms;
