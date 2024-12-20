import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
// import Footer from "./Components/Footer";
import UserContext from "./context/UserContext";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const AccessToken = localStorage.getItem("accessToken");
        const RefreshToken = localStorage.getItem("refreshToken");

        if (RefreshToken) {
          document.cookie = `refreshToken=${RefreshToken}; path=/; secure; samesite=None`;
        }

        if (AccessToken) {
          document.cookie = `accessToken=${AccessToken}; path=/; secure; samesite=None`;
        }

        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/verify`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          const accessToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];
          const refreshToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("refreshToken="))
            ?.split("=")[1];

          if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
          }
        }
      } catch (e) {
        console.error("Error fetching user", e);
      }
    };
    checkUser();
  }, [setUser]);

  return (
    <div className="flex">
      {/* Navbar */}
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={10}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Main Content */}
      <div className="flex-1 md:ml-80 w-full h-full">
        <Outlet />

        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
