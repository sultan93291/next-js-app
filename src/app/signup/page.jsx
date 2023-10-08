/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@/app/sass/signup.css";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setbuttonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const signup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("sign up success ", response.data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div className="sultan">
      <div className="box">
        <h1 className=" text-danger ">
          {" "}
          {loading ? "processing " : "signup"}{" "}
        </h1>
        <hr />
        <label htmlFor="username" className=" p-2  m-2  fs-5 text-black  ">
          {" "}
          Username :{" "}
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={e => {
            setUser({ ...user, username: e.target.value });
          }}
          placeholder="username"
          className="  form-control text-black fs-5  "
        />{" "}
        <label htmlFor="email" className=" p-2  m-2 text-black   ">
          {" "}
          Email :{" "}
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={e => {
            setUser({ ...user, email: e.target.value });
          }}
          placeholder="Enter Your Email Adress "
          className=" form-control text-black fs-5  "
        />{" "}
        <label
          htmlFor="password"
          className="  form-label p-2  m-2 text-blackfs-5   "
        >
          {" "}
          Password :{" "}
        </label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={e => {
            setUser({ ...user, password: e.target.value });
          }}
          placeholder="password"
          className=" form-control text-black  fs-5 "
        />{" "}
        <button className=" btn btn-success w-100 mt-3 p-1" onClick={signup}>
          {buttonDisabled ? " !Sign up  " : " Sign up "}
        </button>
        <Link href={"/login"} id="Link1" className=" icon-link icon-link-hover">
          {" "}
          Visit Login Page
        </Link>
      </div>
    </div>
  );
}
