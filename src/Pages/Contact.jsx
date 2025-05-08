import React, { useState, useCallback } from "react";
import Title from "./Title";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";

const Contact = () => {
  const [map, setMap] = useState(null);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 40.7128,
    lng: -74.006,
  };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* The AdvancedMarkerElement will be added here once the map is loaded */}
        {map && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <LocationOnIcon
              style={{
                color: "#22c55e",
                fontSize: "40px",
                filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))",
              }}
            />
          </div>
        )}
      </GoogleMap>
    );
  };

  return (
    <div className="container mx-auto px-20 py-8">
      <Title text1="Contact Us" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions about our plants or services? We're here to help!
              Reach out to us using the contact information below or fill out
              the form.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <LocationOnIcon className="text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold">Our Location</h3>
                <p className="text-gray-600">
                  123 Plant Street, Garden City
                  <br />
                  Green Valley, GV 12345
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <PhoneIcon className="text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold">Phone Number</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <EmailIcon className="text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold">Email Address</h3>
                <p className="text-gray-600">contact@nursery.com</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form className="space-y-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                required
              />
            </div>

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              required
            />

            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              type="tel"
            />

            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              required
            />

            <Stack className="mt-8" spacing={2} direction="row">
              <Button
                variant="contained"
                className="!bg-green-600 hover:!bg-green-700 text-white"
                type="submit"
              >
                Send Message
              </Button>
            </Stack>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12">
        <div className="rounded-lg overflow-hidden shadow-lg">
          {isLoaded ? (
            renderMap()
          ) : (
            <div className="h-[400px] flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Loading map...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
