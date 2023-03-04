import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import GustRoute from "./Components/Routes/GustRoute";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import SemiProtected from "./Components/Routes/SemiProtected";
import NavBar from "./Components/shared/Navigation/Navigation";
import Active from "./pages/Active/Active";
import Authenticate from "./pages/Authenticate/Authenticate ";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <GustRoute>
          <Home />
        </GustRoute>
      ),
    },
    {
      path: "/authenticate",
      element: (
        <GustRoute>
          <Authenticate />
        </GustRoute>
      ),
    },
    {
      path: "/active",
      element: (
        <SemiProtected>
          <Active />
        </SemiProtected>
      ),
    },

    {
      path: "/rooms",
      element: (
        <ProtectedRoute>
          <Rooms />
        </ProtectedRoute>
      ),
    },
    { path: "*", element: <h2>Not found</h2> },
  ]);

  return (
    <main>
      <NavBar />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
