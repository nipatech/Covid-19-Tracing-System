import React, { useEffect } from "react";

export default () => {

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token){
      window.location = "/profile"
    } else {
      window.location = "/"
    }
  }, [])

  return null;
}