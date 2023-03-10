import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import GustRoute from "./Components/Routes/GustRoute";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import SemiProtected from "./Components/Routes/SemiProtected";
import Loader from "./Components/shared/Loader/Loader";
import NavBar from "./Components/shared/Navigation/Navigation";
import Active from "./pages/Active/Active";
import Authenticate from "./pages/Authenticate/Authenticate ";
import Home from "./pages/Home/Home";
import Room from "./pages/Room/Room";
import Rooms from "./pages/Rooms/Rooms";
import { setAuth } from "./store/authSlice";

function App() {
  // const { loading } = useAutoLogin();
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <GustRoute>
          <>
            <NavBar />
            <Home />
          </>
        </GustRoute>
      ),
    },
    {
      path: "/authenticate",
      element: (
        <GustRoute>
          <>
            <NavBar />
            <Authenticate />
          </>
        </GustRoute>
      ),
    },
    {
      path: "/active",
      element: (
        <SemiProtected>
          <>
            <NavBar />
            <Active />
          </>
        </SemiProtected>
      ),
    },

    {
      path: "/rooms",
      element: (
        <ProtectedRoute>
          <>
            <NavBar />
            <Rooms />
          </>
        </ProtectedRoute>
      ),
    },
    {
      path: "/room/:id",
      element: (
        <ProtectedRoute>
          <>
            <NavBar />
            <Room />
          </>
        </ProtectedRoute>
      ),
    },
    { path: "*", element: <h2>Not found</h2> },
  ]);
  if (loading) {
    return <Loader message="Loading..." />;
  }
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
