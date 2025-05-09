import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* About Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl md:text-2xl font-bold">About</h3>
            <p className="text-sm md:text-base text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              impedit saepe numquam quae. Laboriosam, reiciendis.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl md:text-2xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li className="text-sm md:text-base text-gray-200 hover:text-white cursor-pointer transition-colors">
                About us
              </li>
              <li className="text-sm md:text-base text-gray-200 hover:text-white cursor-pointer transition-colors">
                Plant Care
              </li>
              <li className="text-sm md:text-base text-gray-200 hover:text-white cursor-pointer transition-colors">
                Contact
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl md:text-2xl font-bold">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-sm md:text-base text-gray-200">
                123 Plant Street, Garden City
              </p>
              <p className="text-sm md:text-base text-gray-200">
                Green Valley, GV 12345
              </p>
              <p className="text-sm md:text-base text-gray-200">
                +1 (555) 123-4567
              </p>
              <p className="text-sm md:text-base text-gray-200">
                contact@nursery.com
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-green-800 text-center">
          <p className="text-sm md:text-base text-gray-300">
            © {new Date().getFullYear()} Nursery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
