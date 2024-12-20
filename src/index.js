import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout";
import "./index.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Friends from "./Components/Friends";
import NotFound from "./Components/NotFound";
import AboutUs from "./Components/AboutUs";
import Home from "./Components/Home";
import FeaturesSection from "./Components/FeaturesSection";
import UserContextProvider from "./context/UserContextProvider";
import Search from "./Components/Search";
import User from "./Components/User";
import IncomingRequests from "./Components/IncomingRequests";
import Transactions from "./Components/Transactions";
import DashboardContextProvider from "./context/DashboardContextProvider";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard";

import { App } from "@capacitor/app";
App.addListener("backButton", ({ canGoBack }) => {
  if (canGoBack) {
    if (window.location.pathname === "/dashboard") {
      App.exitApp();
    }
    window.history.back();
  } else {
    App.exitApp();
  }
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="features" element={<FeaturesSection />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="friends" element={<Friends />} />
      <Route path="search" element={<Search />} />
      <Route path="*" element={<NotFound />} />
      <Route path="incoming-requests" element={<IncomingRequests />} />
      <Route path="users/:id" element={<User />} />
      <Route path="transactions/:chatId" element={<Transactions />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <UserContextProvider>
      <DashboardContextProvider>
        <RouterProvider router={router} />
      </DashboardContextProvider>
    </UserContextProvider>
  </>
);
