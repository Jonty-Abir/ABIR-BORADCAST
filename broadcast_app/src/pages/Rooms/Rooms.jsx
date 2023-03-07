import React, { useState } from 'react';
import AddRoomModal from '../../Components/AddRoomModal/AddRoomModal';
import RoomCard from '../../Components/RoomCard/RoomCard';
import styles from './Rooms.module.css';

const rooms = [
    {
        id: 1,
        topic: 'Which framework best for frontend ?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 3,
        topic: 'What’s new in machine learning?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 4,
        topic: 'Why people use stack overflow?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/avatar.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/avatar.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/avatar.png',
            },
            
        ],
        totalPeople: 40,
    },
];

const Rooms = () => {
    const [showModal, setShowModal] = useState(false);
    // const [rooms, setRooms] = useState([]);

    // useEffect(() => {
    //     const fetchRooms = async () => {
    //         const { data } = await getAllRooms();
    //         setRooms(data);
    //     };
    //     fetchRooms();
    // }, []);
    function openModal() {
        setShowModal(true);
    }
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
                            <input type="text" className={`${styles.searchInput} placeholder:text-green-400 font-semibold`} placeholder="Serach" />
                        </div>
                    </div>
                    {/* ST ROOM BTN */}
                    <div className={styles.right}>
                        <button
                            onClick={openModal}
                            className={styles.startRoomButton}
                        >
                            <img
                                src="/images/add-room-icon.png"
                                alt="add-room"
                            />
                            <span>Start a room</span>
                        </button>
                    </div>
                </div>

                <div className={styles.roomList}>
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
            {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default Rooms;