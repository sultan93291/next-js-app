"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import "@/app/sass/login.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, SetbuttonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      router.push("/profile");
    } catch (error) {
      console.log(`Log in Failed `);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      SetbuttonDisabled(false);
    } else {
      SetbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div className="sultan1">
      <div className="box1">
        <h1 className="  text-danger ">
          {" "}
          {loading ? "processing" : " Log In "}{" "}
        </h1>
        <hr />
        <label htmlFor="email" className=" p-2  m-2  fs-5 text-black  ">
          {" "}
          email :{" "}
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={e => {
            setUser({ ...user, email: e.target.value });
          }}
          placeholder="email"
          className="  form-control text-black fs-5  "
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
        <button className=" btn btn-success w-100 mt-3 p-2 " onClick={onLogIn}>
          {buttonDisabled ? "!Log In " : "Log In "}
        </button>
        <Link href={"/signup"} id="Link" className=" icon-link icon-link-hover">
          Visit Sign up page
        </Link>
      </div>
    </div>
  );
}
