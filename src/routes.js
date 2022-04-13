import React from "react";
import { Navigate } from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import Registration from './components/Registration/Registration';
import Authorization from "./components/Authorization/Authorization";

const routes = () => [
  {
    path: "/main",
    element: localStorage.getItem("token") ? (
    <MainPage />
    ) : (
    <Authorization />
    )
  },
  {
    path: "/",
    element:  <Authorization />
  },
  {
    path: "/registration",
    element:  <Registration />
  },
  {
    path: "*",
    element: <Navigate to="/" />
  },
]

export default routes;