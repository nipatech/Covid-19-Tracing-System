import React, { useEffect } from "react";

export default () => {

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token){
      window.location = "/contacts"
    } else {
      window.location = "/"
    }
  }, [])

  return null;
}