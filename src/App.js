import "./App.css";
import React from "react";
import Profile from "./views/profile/profile";
import Home from "./views/home/home";
import Navbar from "./components/navbar/navbar";
import Signin from "./views/authentication/signin";
import Signup from "./views/authentication/signup";
import ForgotPassword from "./views/authentication/forgotPassword";
import Reserve from "./views/reservation/reserve";
import P404 from "./views/p404/p404";
import Faq from "./views/faq/faq";
import Footer from "./components/footer/footer";
import History from "./views/history/history";
import Search from "./views/result/results";
import RequireAuth from "./utils/RequireAuth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="r">
      <Router>
        <Navbar />
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* protect routes */}
          {/* user routes */}
          <Route element={<RequireAuth />}>
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reserve/:id" element={<Reserve />} />
          </Route>

          {/* common routes */}
          <Route path="/faq" element={<Faq />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<P404 />} />
        </Routes>
      </Router>
      <Footer className="b" />
    </div>
  );
}

export default App;
