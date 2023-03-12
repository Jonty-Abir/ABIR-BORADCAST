import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { uid } from "uid";
import Loader from "../../Components/shared/Loader/Loader";
import { getOneRoom } from "../../helper/helper";
import useWebRtc from "../../hooks/useWebRtc";
import styles from "./Room.module.css";

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [clients, providerRef, handleMute] = useWebRtc(roomId, user);
  const navigate = useNavigate();
  const [isMute, setMute] = useState(true);

  /***_______  Handle Mute   ________**/

  useEffect(() => {
    handleMute(isMute, user._id);
  }, [isMute]);

  /***_______ Toggle Mute    ________**/
  const toggleMuteUnMute = (clientId) => {
    if (clientId !== user._id) return;
    setMute((prev) => !prev);
  };
  const handManualLeave = () => {
    navigate("/rooms");
  };
  /***_______   React Query  ________**/
  const {
    data: room,
    isError,
    isLoading,
  } = useQuery("room", () => getOneRoom(roomId));

  if (isError) {
    return <h2>Error was Occure!</h2>;
  }
  if (isLoading) return <Loader message="Loading..." />;
  return (
    <div className="p-4 flex flex-col">
      <div className={`${styles.goBack} h-20 mt-6`}>
        <button
          onClick={handManualLeave}
          className="flex justify-start items-center gap-x-4"
        >
          <img src="/images/left-arrow.png" alt="icone" width={20} />
          <span className="text-gray-200 text-lg font-bold capitalize relative">
            all voice room
          </span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={`${styles.header}`}>
          {room && <h2 className={styles.topic}>{room.tropic}</h2>}
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img src="/images/announce.png" alt="palm-icon" />
            </button>
            <button onClick={handManualLeave} className={styles.actionBtn}>
              <img src="/images/sad.png" alt="win-icon" />
              <span>Leave quietly</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients.map((client) => {
            return (
              <div className={styles.client} key={uid(25)}>
                <div className={styles.userHead}>
                  <img
                    className={`${styles.userAvatar} border-4 border-green-500`}
                    src={client?.avatar}
                    alt=""
                  />
                  <audio
                    autoPlay
                    playsInline
                    ref={(instance) => {
                      providerRef(instance, client?._id);
                    }}
                  />
                  <button
                    onClick={() => toggleMuteUnMute(client._id)}
                    className={styles.micBtn}
                  >
                    {client.muted ? (
                      <img
                        className={styles.micImg}
                        src="/images/mic-mute.png"
                        alt="mic"
                      />
                    ) : (
                      <img
                        className={styles.micImg}
                        src="/images/mic.png"
                        alt="mic"
                      />
                    )}
                  </button>
                </div>
                <h4>{client?.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;
