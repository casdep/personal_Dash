import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const privateRoute = () => {
  const auth = document.cookie.indexOf("token=") !== -1;

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
