"use client";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function UpdatePassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const signup = async () => {
    router.push("/signup");
  };
  const login = async () => {
    router.push("/login");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateUseremail = async () => {
    try {
      await axios.post("/api/users/upPass", { token });
      setVerified(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      updateUseremail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div>
      <h1 className="fs-3"> Vefiy Email </h1>
      <h2> {token ? `Your token ${token}` : " Token not found"} </h2>
      {verified && (
        <div>
          <h2> Successfully Verified email </h2>
          <button className="btn btn-danger" onClick={login}>
            {" "}
            Go To Login Page{" "}
          </button>
        </div>
      )}
      {error && (
        <div>
          <h2> Something Went Wrong with Your Token </h2>
          <button className="btn btn-check p-2" onClick={signup}>
            {" "}
            Visit Sign up Page{" "}
          </button>
        </div>
      )}
    </div>
  );
}
