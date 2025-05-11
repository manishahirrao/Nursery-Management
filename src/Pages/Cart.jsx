import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payment as UpiIcon,
  LocalShipping as ShippingIcon,
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

  const handleNext = () => {
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
  };

  const handleCardDetailsChange = (event) => {
    const { name, value } = event.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentSubmit = () => {
    // Here you would typically handle the payment processing
    console.log("Processing payment...", {
      paymentMethod,
      cardDetails,
      shippingDetails,
      total,
    });
    setOpenPaymentDialog(false);
    handleNext(); // Move to confirmation step
  };

  const renderShippingForm = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={shippingDetails.fullName}
            onChange={handleShippingDetailsChange}
            required
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
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderPaymentForm = () => (
    <Box sx={{ mt: 2 }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Payment Method</FormLabel>
        <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
          <FormControlLabel
            value="card"
            control={<Radio />}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CreditCardIcon sx={{ mr: 1 }} />
                Credit/Debit Card
              </Box>
            }
          />
          <FormControlLabel
            value="upi"
            control={<Radio />}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <UpiIcon sx={{ mr: 1 }} />
                UPI
              </Box>
            }
          />
          <FormControlLabel
            value="netbanking"
            control={<Radio />}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BankIcon sx={{ mr: 1 }} />
                Net Banking
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>

      {paymentMethod === "card" && (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                required
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
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                type="password"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
                required
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {paymentMethod === "upi" && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="UPI ID"
            placeholder="example@upi"
            required
          />
        </Box>
      )}

      {paymentMethod === "netbanking" && (
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <FormLabel>Select Bank</FormLabel>
            <RadioGroup>
              <FormControlLabel
                value="hdfc"
                control={<Radio />}
                label="HDFC Bank"
              />
              <FormControlLabel
                value="icici"
                control={<Radio />}
                label="ICICI Bank"
              />
              <FormControlLabel
                value="sbi"
                control={<Radio />}
                label="State Bank of India"
              />
              <FormControlLabel
                value="axis"
                control={<Radio />}
                label="Axis Bank"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      )}
    </Box>
  );

  const renderConfirmation = () => (
    <Box sx={{ mt: 2, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Order Confirmed!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for your purchase. Your order has been placed successfully.
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Order Summary:
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>Total Items: {cartItems.length}</Typography>
        <Typography>Total Amount: ₹{total}</Typography>
        <Typography>Shipping Address: {shippingDetails.address}</Typography>
        <Typography>Payment Method: {paymentMethod}</Typography>
      </Box>
      <Button variant="contained" component={Link} to="/" sx={{ mt: 3 }}>
        Continue Shopping
      </Button>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={4}>
            {/* Existing cart items grid */}
            {cartItems.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Paper sx={{ mb: 2, p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Card>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{ height: 140, objectFit: "cover" }}
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography
                        variant="h6"
                        component={Link}
                        to={`/product/${item.id}`}
                        sx={{ textDecoration: "none", color: "inherit" }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{item.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          size="small"
                          sx={{ width: 60, mx: 1 }}
                          inputProps={{ readOnly: true }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6">
                          ₹{item.price * item.quantity}
                        </Typography>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        );
      case 1:
        return renderShippingForm();
      case 2:
        return renderPaymentForm();
      case 3:
        return renderConfirmation();
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        renderConfirmation()
      ) : (
        <>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={
                activeStep === steps.length - 1
                  ? handlePaymentSubmit
                  : handleNext
              }
            >
              {activeStep === steps.length - 1 ? "Place Order" : "Next"}
            </Button>
          </Box>
        </>
      )}

      <Dialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
      >
        <DialogTitle>Payment Processing</DialogTitle>
        <DialogContent>
          <Typography>Please wait while we process your payment...</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
