import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window) {
      const token = localStorage.getItem("access_token");

      token ? navigate("/todo") : navigate("/signin");
    }
  }, []);

  return <div>index</div>;
};

export default Main;
