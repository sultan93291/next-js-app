"use client";
import "@/app/sass/forgotpass.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [user, setuser] = useState({
    email: "",
    password: "",
    newpass: "",
    conpass: "",
  });

  const submit = async () => {
    try {
     const response= await axios.post("/api/users/frogpass",user);
      router.push("/login");
      console.log
    } catch (e) {
      console.log(e.message);
      console.log(`failed while trying to Update password `);
    }
  };
  return (
    <div className="box-3">
      <div className="form">
        <h1> Enter Your Credentials </h1>
        <hr />

        <label
          htmlFor="email"
          className="  form-label p-2  m-2 text-blackfs-5   "
        >
          Enter Your Email :
        </label>

        <input
          id="email"
          type="email"
          onChange={e => {
            setuser({ ...user, email: e.target.value });
          }}
          placeholder="Enter Your Email Address"
          className=" form-control fs-5 "
        />

        <label
          htmlFor="password"
          className="  form-label p-2  m-2 text-blackfs-5   "
        >
          {" "}
          Current Password :
        </label>

        <input
          type="passwrod"
          id="password"
          onChange={e => {
            setuser({ ...user, password: e.target.value });
          }}
          placeholder="Enter Your old Password"
          className=" form-control fs-5 "
        />

        <label
          htmlFor="newpass"
          className="  form-label p-2  m-2 text-blackfs-5   "
        >
          {" "}
          New Password :
        </label>

        <input
          id="newpass"
          type="password"
          onChange={e => {
            setuser({ ...user, newpass: e.target.value });
          }}
          placeholder=" Submit Your new password"
          className=" form-control fs-5 "
        />

        <label
          htmlFor="conpass"
          className="  form-label p-2  m-2 text-blackfs-5   "
        >
          {" "}
          Re Enter Your password :
        </label>

        <input
          id="conpass"
          type="passsword"
          onChange={e => {
            setuser({ ...user, conpass: e.target.value });
          }}
          placeholder="Confirm password"
          className=" form-control fs-5 "
        />

        <button
          onClick={submit}
          className="btn btn-info w-75  mt-4 text-black fs-4 "
        >
          {" "}
          Submit{" "}
        </button>
      </div>
    </div>
  );
}
