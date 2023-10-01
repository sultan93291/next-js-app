import React from 'react'
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.css";

function page() {
  return (
    <div>
      <Link href={"/login"} id="Link1" className=" icon-link icon-link-hover">
        {" "}
        Visit Login Page
      </Link>
      <br/>
      <Link href={"/signup"} id="Link1" className=" icon-link icon-link-hover">
        {" "}
        Visit sign up  Page
      </Link>
    </div>
  );
}

export default page