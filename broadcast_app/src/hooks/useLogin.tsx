import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

function useAutoLogin() {
  const disPatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/refresh-token`,
          {
            withCredentials: true,
          }
        );
        disPatch(setAuth(data));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    })();
  }, []);
  return { loading };
}

export { useAutoLogin };
