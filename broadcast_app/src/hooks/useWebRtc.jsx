/***_______   aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  ________**/

import freeice from "freeice";
import { useCallback, useEffect, useRef } from "react";
import { ACTION } from "../action";
import socketInit from "../Socket";
import useStateWithCallBack from "./useStateWithCallBack";

function useWebRtc(roomId, user) {
  const [clients, setClientState] = useStateWithCallBack([]);
  const audioElement = useRef({});
  const connections = useRef({});
  const localMediaStrem = useRef(null);
  const socket = useRef(null);

  /***_______  addNewClient / checker   ________**/

  const addNewClient = useCallback(
    (newUser, cb) => {
      const userAlreayHave = clients.find((client) => {
        return client._id === newUser._id;
      });
      if (userAlreayHave === undefined) {
        setClientState((existingClient) => [...existingClient, newUser], cb);
      }
    },
    [clients, setClientState]
  );

  /***_______  Let's Connect to socket   ________**/

  useEffect(() => {
    socket.current = socketInit();
  }, []);

  /***_______  Handle new peer   ________**/
  
  useEffect(() => {
    const handelNewPeer = async ({
      peerId,
      createOffer,
      user: remoteUser,
    }) => {
      // check if user already connected
      if (peerId in connections.current) {
        return console.warn(
          `You are already connected with: ${peerId}-//-${user.name}`
        );
      }
      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });
      // Handdle new Ice connection
      connections.current[peerId].onicecandidate = (event) => {
        /***_______  Email Relay Ice   ________**/

        socket.current.emit(ACTION.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };
      // handel on track on this connection
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElement.current[remoteUser._id]) {
            audioElement.current[remoteUser._id].srcObject = remoteStream;
          } else {
            let settled = false;
            const interval = setInterval(() => {
              if (audioElement.current[remoteUser._id]) {
                audioElement.current[remoteUser._id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };
      // add local track  to remote connection
      localMediaStrem.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStrem.current);
      });
      //  create offer
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();
        await connections.current[peerId].setLocalDescription(offer);
        // send offer to another client
        /***_______   Emit Relay SDP  ________**/

        socket.current.emit(ACTION.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };
    // socket.current.on
    socket.current.on(ACTION.ADD_PEER, handelNewPeer);

    return () => {
      socket.current.off(ACTION.ADD_PEER);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /***_______  Cpature Media/ mic   ________**/

  useEffect(() => {
    const startCapture = async () => {
      localMediaStrem.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };
    startCapture().then(() => {
      addNewClient(user, () => {
        const localElement = audioElement.current[user._id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStrem.current;
        }
        /***_______  Socket emit join   ________**/
        // send to server
        socket.current.emit(ACTION.JOIN, { roomId, user });
      });
    });
    return () => {
      // leave the room
      if (localMediaStrem.current) {
        localMediaStrem?.current.getTracks().forEach((track) => track.stop());
        socket.current.emit(ACTION.LEAVE, { roomId });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /***_______  HANDLE ICE CANDIDATE   ________**/

  useEffect(() => {
    socket.current.on(ACTION.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });
    return () => {
      socket.current.off(ACTION.ICE_CANDIDATE);
    };
  }, []);

  /***_______  HANDLE SDP   ________**/

  useEffect(() => {
    const handleRemoteSdp = async ({
      peerId,
      sessionDescription: remoteSessionDescription,
    }) => {
      connections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDescription)
      );
      // if session description type of offer then create an answer
      if (remoteSessionDescription.type === "offer") {
        // eslint-disable-next-line no-use-before-define
        const connection = connections.current[peerId];
        const answer = await connection.createAnswer();

        connection.setLocalDescription(answer);

        socket.current.emit(ACTION.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };
    socket.current.on(ACTION.SESSION_DESCRIPTION, handleRemoteSdp);
    return () => {
      socket.current.off(ACTION.SESSION_DESCRIPTION);
    };
  }, []);

  /***_______   Handle Remove peer  ________**/

  useEffect(() => {
    const handleRemovePeer = async ({ peerId, userId }) => {
      if (connections.current[peerId]) {
        // close the webRTC connection
        connections.current[peerId].close();
      }

      delete connections.current[peerId];
      delete audioElement.current[peerId];
      setClientState((list) => list.filter((client) => client._id !== userId));
    };
    socket.current.on(ACTION.REMOVE_PEER, handleRemovePeer);
    return () => {
      socket.current.off(ACTION.REMOVE_PEER);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /***_______   Create reference provider  ________**/

  const providerRef = (instance, userId) => {
    audioElement.current[userId] = instance;
  };

  return [clients, providerRef];
}

export default useWebRtc;
