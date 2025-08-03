import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import { AuthProvider} from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";

// Importing pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import MainLayout from "./layouts/MainLayout";
import Owners from "./pages/Owners";  
import Renters from "./pages/Renters";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";


// Main App component

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/owners' element={<Owners />} />
        <Route path='/renters' element={<Renters />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
