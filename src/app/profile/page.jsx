"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@/app/sass/profile.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const [data, setdata] = React.useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setdata(res.data.data._id);
    alert(`You're spying on ${res.data.data.username}`)
  };

  return (
    <div className="profile">
      <div className=" fs-1">
        Profile page
        <hr />
        <h2 className=" ps-3 p-1 w-auto bg-info rounded-2 ms-5 align-content-center justify-content-center " >
          {" "}
          {data === "nothing" ? (
            "nothing"
          ) : (
            <Link href={`/profile/${data}`}> {data} </Link>
          )}{" "}
        </h2>
        <button onClick={logout} className="btn btn-danger p-2 ms-5 ">
          {" "}
          Log Out{" "}
        </button>
        <button
          onClick={getUserDetails}
          className="btn btn-danger p-2 ms-5 "
        > getUserDetails </button>
      </div>

      


    </div>
  );
}
