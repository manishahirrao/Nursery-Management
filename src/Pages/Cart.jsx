import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Stack,
  Chip,
  Alert,
  FormHelperText,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payment as UpiIcon,
  LocalShipping as ShippingIcon,
  ShoppingCart as CartIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 1299,
    image: "https://images.unsplash.com/photo-1600411833117-5c82f9d5c3b8?w=500",
    quantity: 1,
  },
  {
    id: 2,
    name: "Snake Plant",
    price: 899,
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
    quantity: 2,
  },
];

const steps = ["Cart Review", "Shipping Details", "Payment", "Confirmation"];

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [upiDetails, setUpiDetails] = useState({
    upiId: "",
  });
  const [orderNumber] = useState(
    () =>
      `ORD${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")}`
  );
  const [orderDate] = useState(() =>
    new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [shippingErrors, setShippingErrors] = useState({
    fullName: false,
    address: false,
    city: false,
    state: false,
    pincode: false,
    phone: false,
  });
  const [paymentErrors, setPaymentErrors] = useState({
    cardNumber: false,
    cardName: false,
    expiryDate: false,
    cvv: false,
    upiId: false,
  });

  const handleQuantityChange = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 100;
  const total = subtotal + shipping;

  const validateShippingDetails = () => {
    const errors = {
      fullName: !shippingDetails.fullName.trim(),
      address: !shippingDetails.address.trim(),
      city: !shippingDetails.city.trim(),
      state: !shippingDetails.state.trim(),
      pincode:
        !shippingDetails.pincode.trim() ||
        !/^\d{6}$/.test(shippingDetails.pincode),
      phone:
        !shippingDetails.phone.trim() ||
        !/^\d{10}$/.test(shippingDetails.phone),
    };
    setShippingErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === "card") {
      const errors = {
        cardNumber:
          !cardDetails.cardNumber.trim() ||
          !/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, "")),
        cardName: !cardDetails.cardName.trim(),
        expiryDate:
          !cardDetails.expiryDate.trim() ||
          !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate),
        cvv: !cardDetails.cvv.trim() || !/^\d{3,4}$/.test(cardDetails.cvv),
      };
      setPaymentErrors(errors);
      return !Object.values(errors).some(Boolean);
    } else if (paymentMethod === "upi") {
      const errors = {
        upiId:
          !upiDetails.upiId.trim() ||
          !/^[\w.-]+@[\w.-]+$/.test(upiDetails.upiId),
      };
      setPaymentErrors(errors);
      return !Object.values(errors).some(Boolean);
    }
    return true;
  };

  const handleNext = () => {
    if (activeStep === 1) {
      if (!validateShippingDetails()) {
        return;
      }
    } else if (activeStep === 2) {
      if (!validatePaymentDetails()) {
        return;
      }
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleShippingDetailsChange = (event) => {
    const { name, value } = event.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (shippingErrors[name]) {
      setShippingErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleCardDetailsChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    }
    // Format expiry date
    else if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})/, "$1/")
        .substr(0, 5);
    }

    setCardDetails((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
    // Clear error when user starts typing
    if (paymentErrors[name]) {
      setPaymentErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleUpiDetailsChange = (event) => {
    const { name, value } = event.target;
    setUpiDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (paymentErrors[name]) {
      setPaymentErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handlePaymentSubmit = () => {
    // Here you would typically handle the payment processing
    console.log("Processing payment...", {
      paymentMethod,
      cardDetails,
      upiDetails,
      shippingDetails,
      total,
    });
    setOpenPaymentDialog(false);
    handleNext(); // Move to confirmation step
  };

  const handleViewOrders = () => {
    navigate("/orders");
  };

  const renderCartItems = () => (
    <Box sx={{ mb: 4 }}>
      {cartItems.map((item) => (
        <Zoom in key={item.id} timeout={500}>
          <Paper
            elevation={1}
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 2,
              borderRadius: 2,
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[2],
              },
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3} md={2}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{
                    height: { xs: 120, sm: 140 },
                    borderRadius: 1,
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={9} md={10}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      component="h3"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                      }}
                    >
                      ₹{item.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "flex-start", sm: "center" },
                      }}
                    >
                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        variant="body1"
                        sx={{
                          mx: 2,
                          minWidth: "2rem",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "flex-start", sm: "flex-end" },
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        ₹{item.price * item.quantity}
                      </Typography>
                      <IconButton
                        color="error"
                        size={isMobile ? "small" : "medium"}
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Zoom>
      ))}
    </Box>
  );

  const renderOrderSummary = () => (
    <Zoom in timeout={500} style={{ transitionDelay: "200ms" }}>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          position: { md: "sticky" },
          top: { md: 24 },
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Order Summary
        </Typography>
        <Stack spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">₹{subtotal}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1">Shipping</Typography>
            <Typography variant="body1">₹{shipping}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              ₹{total}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? "medium" : "large"}
            fullWidth
            onClick={handleNext}
            disabled={cartItems.length === 0}
            sx={{
              mt: 2,
              py: { xs: 1, md: 1.5 },
            }}
          >
            Proceed to Checkout
          </Button>
        </Stack>
      </Paper>
    </Zoom>
  );

  const renderShippingForm = () => (
    <Zoom in timeout={500}>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Shipping Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={shippingDetails.fullName}
              onChange={handleShippingDetailsChange}
              required
              size={isMobile ? "small" : "medium"}
              error={shippingErrors.fullName}
              helperText={
                shippingErrors.fullName ? "Please enter your full name" : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={shippingDetails.address}
              onChange={handleShippingDetailsChange}
              required
              multiline
              rows={2}
              size={isMobile ? "small" : "medium"}
              error={shippingErrors.address}
              helperText={
                shippingErrors.address ? "Please enter your address" : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={shippingDetails.city}
              onChange={handleShippingDetailsChange}
              required
              size={isMobile ? "small" : "medium"}
              error={shippingErrors.city}
              helperText={shippingErrors.city ? "Please enter your city" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={shippingDetails.state}
              onChange={handleShippingDetailsChange}
              required
              size={isMobile ? "small" : "medium"}
              error={shippingErrors.state}
              helperText={shippingErrors.state ? "Please enter your state" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="PIN Code"
              name="pincode"
              value={shippingDetails.pincode}
              onChange={handleShippingDetailsChange}
              required
              size={isMobile ? "small" : "medium"}
              error={shippingErrors.pincode}
              helperText={
                shippingErrors.pincode
                  ? "Please enter a valid 6-digit PIN code"
                  : ""
              }
              inputProps={{ maxLength: 6 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleShippingDetailsChange}
              required
              size={isMobile ? "small" : "medium"}
              error={shippingErrors.phone}
              helperText={
                shippingErrors.phone
                  ? "Please enter a valid 10-digit phone number"
                  : ""
              }
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Zoom>
  );

  const renderPaymentForm = () => (
    <Zoom in timeout={500}>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Payment Method
        </Typography>
        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <RadioGroup
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            sx={{ gap: 2 }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor:
                  paymentMethod === "card" ? "primary.main" : "divider",
              }}
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CreditCardIcon />
                    <Typography>Credit/Debit Card</Typography>
                  </Box>
                }
                sx={{ width: "100%" }}
              />
            </Paper>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor:
                  paymentMethod === "upi" ? "primary.main" : "divider",
              }}
            >
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <UpiIcon />
                    <Typography>UPI</Typography>
                  </Box>
                }
                sx={{ width: "100%" }}
              />
              {paymentMethod === "upi" && (
                <Box sx={{ mt: 2, pl: 3 }}>
                  <TextField
                    fullWidth
                    label="UPI ID"
                    name="upiId"
                    value={upiDetails.upiId}
                    onChange={handleUpiDetailsChange}
                    placeholder="example@upi"
                    required
                    size={isMobile ? "small" : "medium"}
                    helperText="Enter your UPI ID (e.g., username@bank)"
                    sx={{ mb: 2 }}
                    error={paymentErrors.upiId}
                    helperText={
                      paymentErrors.upiId
                        ? "Please enter a valid UPI ID (e.g., username@bank)"
                        : ""
                    }
                  />
                  <Alert severity="info" sx={{ mb: 2 }}>
                    You will be redirected to your UPI app to complete the
                    payment
                  </Alert>
                </Box>
              )}
            </Paper>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor:
                  paymentMethod === "netbanking" ? "primary.main" : "divider",
              }}
            >
              <FormControlLabel
                value="netbanking"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <BankIcon />
                    <Typography>Net Banking</Typography>
                  </Box>
                }
                sx={{ width: "100%" }}
              />
            </Paper>
          </RadioGroup>
        </FormControl>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenPaymentDialog(true)}
            size={isMobile ? "medium" : "large"}
            disabled={paymentMethod === "upi" && !upiDetails.upiId}
          >
            {paymentMethod === "upi" ? "Pay with UPI" : "Continue to Payment"}
          </Button>
        </Box>
      </Paper>
    </Zoom>
  );

  const renderConfirmation = () => (
    <Fade in timeout={1000}>
      <Box>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 4 },
            mb: 4,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Zoom in timeout={1000}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "success.light",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 40, color: "white" }} />
              </Box>
            </Zoom>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", color: "success.main" }}
            >
              Order Placed Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Thank you for your purchase. Your order has been confirmed.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Order Details */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Order Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Order Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {orderNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Order Date
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {orderDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Order Items */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Order Items
            </Typography>
            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "background.default",
                    borderRadius: 1,
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3} sm={2}>
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.name}
                        sx={{
                          height: { xs: 60, sm: 80 },
                          borderRadius: 1,
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                    <Grid item xs={9} sm={10}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "medium" }}
                          >
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "medium",
                              textAlign: { xs: "left", sm: "right" },
                            }}
                          >
                            ₹{item.price * item.quantity}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Stack>
          </Box>

          {/* Shipping Details */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Shipping Details
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "background.default",
                borderRadius: 1,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {shippingDetails.fullName}
              </Typography>
              <Typography variant="body1">{shippingDetails.address}</Typography>
              <Typography variant="body1">
                {shippingDetails.city}, {shippingDetails.state} -{" "}
                {shippingDetails.pincode}
              </Typography>
              <Typography variant="body1">
                Phone: {shippingDetails.phone}
              </Typography>
            </Paper>
          </Box>

          {/* Payment Details */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Payment Details
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "background.default",
                borderRadius: 1,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Payment Method
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    {paymentMethod === "card"
                      ? "Credit/Debit Card"
                      : paymentMethod === "upi"
                      ? "UPI"
                      : "Net Banking"}
                  </Typography>
                </Grid>
                {paymentMethod === "upi" && (
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      UPI ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      {upiDetails.upiId}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Box>

          {/* Order Summary */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Order Summary
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "background.default",
                borderRadius: 1,
              }}
            >
              <Stack spacing={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">₹{subtotal}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">₹{shipping}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    ₹{total}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 4,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              size={isMobile ? "large" : "large"}
              onClick={() => navigate("/")}
              fullWidth={isMobile}
            >
              Continue Shopping
            </Button>
            <Button
              variant="contained"
              color="primary"
              size={isMobile ? "large" : "large"}
              onClick={handleViewOrders}
              fullWidth={isMobile}
            >
              View Orders
            </Button>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {cartItems.length === 0 ? (
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    textAlign: "center",
                    borderRadius: 2,
                  }}
                >
                  <CartIcon
                    sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Your cart is empty
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Looks like you haven't added any plants to your cart yet.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/shop"
                    size={isMobile ? "medium" : "large"}
                    sx={{
                      mt: 2,
                      px: { xs: 3, md: 4 },
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 2,
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    Browse Plants
                  </Button>
                </Paper>
              ) : (
                renderCartItems()
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {cartItems.length > 0 && renderOrderSummary()}
            </Grid>
          </Grid>
        );
      case 1:
        return renderShippingForm();
      case 2:
        return renderPaymentForm();
      case 3:
        return renderConfirmation();
      default:
        return null;
    }
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
              Shopping Cart
            </Typography>

            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                mb: { xs: 3, md: 4 },
                display: { xs: "none", sm: "flex" },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Mobile Stepper */}
            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
                mb: 3,
                justifyContent: "center",
              }}
            >
              <Chip
                icon={<CheckCircleIcon />}
                label={`Step ${activeStep + 1} of ${steps.length}: ${
                  steps[activeStep]
                }`}
                color="primary"
                variant="outlined"
              />
            </Box>

            {getStepContent(activeStep)}

            {activeStep > 0 && activeStep < steps.length - 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 4,
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  size={isMobile ? "medium" : "large"}
                  sx={{ flex: { xs: 1, sm: "none" } }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  size={isMobile ? "medium" : "large"}
                  sx={{ flex: { xs: 1, sm: "none" } }}
                >
                  {activeStep === steps.length - 2 ? "Place Order" : "Next"}
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Container>

      {/* Payment Dialog */}
      <Dialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {paymentMethod === "upi" ? "UPI Payment" : "Payment Details"}
        </DialogTitle>
        <DialogContent>
          {paymentMethod === "upi" ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Amount to Pay: ₹{total}
              </Typography>
              <TextField
                fullWidth
                label="UPI ID"
                name="upiId"
                value={upiDetails.upiId}
                onChange={handleUpiDetailsChange}
                required
                error={paymentErrors.upiId}
                helperText={
                  paymentErrors.upiId
                    ? "Please enter a valid UPI ID (e.g., username@bank)"
                    : ""
                }
                size={isMobile ? "small" : "medium"}
                sx={{ mt: 2 }}
              />
              <Alert severity="info" sx={{ mt: 2 }}>
                You will be redirected to your UPI app to complete the payment
              </Alert>
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  required
                  size={isMobile ? "small" : "medium"}
                  error={paymentErrors.cardNumber}
                  helperText={
                    paymentErrors.cardNumber
                      ? "Please enter a valid 16-digit card number"
                      : ""
                  }
                  inputProps={{ maxLength: 19 }} // 16 digits + 3 spaces
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name on Card"
                  name="cardName"
                  value={cardDetails.cardName}
                  onChange={handleCardDetailsChange}
                  required
                  size={isMobile ? "small" : "medium"}
                  error={paymentErrors.cardName}
                  helperText={
                    paymentErrors.cardName
                      ? "Please enter the name on card"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardDetailsChange}
                  required
                  placeholder="MM/YY"
                  size={isMobile ? "small" : "medium"}
                  error={paymentErrors.expiryDate}
                  helperText={
                    paymentErrors.expiryDate
                      ? "Please enter a valid expiry date (MM/YY)"
                      : ""
                  }
                  inputProps={{ maxLength: 5 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  required
                  type="password"
                  size={isMobile ? "small" : "medium"}
                  error={paymentErrors.cvv}
                  helperText={
                    paymentErrors.cvv ? "Please enter a valid CVV" : ""
                  }
                  inputProps={{ maxLength: 4 }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenPaymentDialog(false)}
            size={isMobile ? "medium" : "large"}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePaymentSubmit}
            size={isMobile ? "medium" : "large"}
          >
            {paymentMethod === "upi" ? "Pay with UPI" : `Pay ₹${total}`}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
