import React from "react";

const Footer = () => {
  return (
    <>
      <div className="px-20 bg-green-900 text-white flex items-center justify-between py-5">
        <div className="flex flex-col justify-center w-[300px]">
          <p className="text-2xl font-bold py-1">About</p>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            impedit saepe numquam quae. Laboriosam, reiciendis.
          </span>
        </div>
        <div>
          <p className="text-2xl font-bold py-1">Quick Links</p>
          <ul>
            <li>About us</li>
            <li>Plant Care</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-2xl font-bold py-1">Contact Us</p>
          <span>pune city</span>
          <span>+91-365952</span>
          <span>likoa23@gmail.com</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
