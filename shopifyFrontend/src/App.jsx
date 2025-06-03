import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";

import { setUser, clearUser } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("http://localhost:7777/api/auth/check-auth", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUser(res.data.email));
      })
      .catch(() => {
        dispatch(clearUser());
      });
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {!user ? (
        <Routes>
          <Route
            path="*"
            element={<Login onLogin={(email) => dispatch(setUser(email))} />}
          />
        </Routes>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
