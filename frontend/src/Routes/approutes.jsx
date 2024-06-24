import React from "react";
import {
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom";
import Home from "../Pages/home";
import Signin from "../Pages/signin";
import Signup from "../Pages/signup";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/vidly/home" element={<Home />} />
        <Route path="/vidly/sign-up" element={<Signup />} />
        <Route path="/vidly/sign-in" element={<Signin />} />
      </Routes>
    </Router>
  );
}
