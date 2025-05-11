import React, { useState, useCallback } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Divider,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [map, setMap] = useState(null);

  const mapContainerStyle = {
    width: "100%",
    height: isMobile ? "300px" : "400px",
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
        {map && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <LocationIcon
              sx={{
                color: "primary.main",
                fontSize: 40,
                filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))",
              }}
            />
          </Box>
        )}
      </GoogleMap>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Box>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h1"
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                mb: { xs: 3, md: 4 },
              }}
            >
              Contact Us
            </Typography>

            <Grid container spacing={4}>
              {/* Contact Information */}
              <Grid item xs={12} md={6}>
                <Zoom in timeout={500} style={{ transitionDelay: "100ms" }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: "100%",
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      component="h2"
                      gutterBottom
                      sx={{ fontWeight: "bold", mb: 3 }}
                    >
                      Get in Touch
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 4 }}
                    >
                      Have questions about our plants or services? We're here to
                      help! Reach out to us using the contact information below
                      or fill out the form.
                    </Typography>

                    <Stack spacing={3}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <LocationIcon
                          sx={{ color: "primary.main", mt: 0.5 }}
                          fontSize={isMobile ? "medium" : "large"}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Our Location
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            123 Plant Street, Garden City
                            <br />
                            Green Valley, GV 12345
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <PhoneIcon
                          sx={{ color: "primary.main", mt: 0.5 }}
                          fontSize={isMobile ? "medium" : "large"}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Phone Number
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            +1 (555) 123-4567
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <EmailIcon
                          sx={{ color: "primary.main", mt: 0.5 }}
                          fontSize={isMobile ? "medium" : "large"}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Email Address
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            contact@nursery.com
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <TimeIcon
                          sx={{ color: "primary.main", mt: 0.5 }}
                          fontSize={isMobile ? "medium" : "large"}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Business Hours
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Monday - Friday: 9:00 AM - 6:00 PM
                            <br />
                            Saturday: 10:00 AM - 4:00 PM
                            <br />
                            Sunday: Closed
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Paper>
                </Zoom>
              </Grid>

              {/* Contact Form */}
              <Grid item xs={12} md={6}>
                <Zoom in timeout={500} style={{ transitionDelay: "200ms" }}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: "100%",
                      bgcolor: "background.paper",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      component="h2"
                      gutterBottom
                      sx={{ fontWeight: "bold", mb: 3 }}
                    >
                      Send us a Message
                    </Typography>
                    <form>
                      <Stack spacing={3}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="First Name"
                              variant="outlined"
                              required
                              size={isMobile ? "small" : "medium"}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Last Name"
                              variant="outlined"
                              required
                              size={isMobile ? "small" : "medium"}
                            />
                          </Grid>
                        </Grid>

                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          type="email"
                          required
                          size={isMobile ? "small" : "medium"}
                        />

                        <TextField
                          fullWidth
                          label="Phone Number"
                          variant="outlined"
                          type="tel"
                          size={isMobile ? "small" : "medium"}
                        />

                        <TextField
                          fullWidth
                          label="Message"
                          variant="outlined"
                          multiline
                          rows={4}
                          required
                          size={isMobile ? "small" : "medium"}
                        />

                        <Button
                          variant="contained"
                          color="primary"
                          size={isMobile ? "medium" : "large"}
                          type="submit"
                          sx={{
                            mt: 2,
                            py: { xs: 1, md: 1.5 },
                            px: { xs: 3, md: 4 },
                          }}
                        >
                          Send Message
                        </Button>
                      </Stack>
                    </form>
                  </Paper>
                </Zoom>
              </Grid>
            </Grid>

            {/* Map Section */}
            <Box sx={{ mt: { xs: 4, md: 6 } }}>
              <Zoom in timeout={500} style={{ transitionDelay: "300ms" }}>
                <Paper
                  elevation={2}
                  sx={{
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                >
                  {isLoaded ? (
                    renderMap()
                  ) : (
                    <Box
                      sx={{
                        height: mapContainerStyle.height,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "grey.100",
                      }}
                    >
                      <Typography color="text.secondary">
                        Loading map...
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Zoom>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Contact;
