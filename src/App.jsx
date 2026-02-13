import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AuthGuard from "./auth/AuthGuard.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./pages/CreatePost.jsx";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthGuard required={false}>
          <DefaultRoute />
        </AuthGuard>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthGuard required={false}>
          <Login />
        </AuthGuard>
      ),
    },
    {
      path: "/register",
      element: (
        <AuthGuard required={false}>
          <Register />
        </AuthGuard>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <AuthGuard required={true}>
          <Dashboard />
        </AuthGuard>
      ),
    },
    
    {
      path: "/create-post",
      element: (
        <AuthGuard required={true}>
        <CreatePost/>
        </AuthGuard>
      ),
    },
    {
      path: "*",
      element: (
        <div
          style={{
            textAlign: "center",
            padding: "100px",
            color: "white",
          }}
        >
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={route} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

const DefaultRoute = () => {
  return <Navigate to="/dashboard" replace />;
};

export default App;