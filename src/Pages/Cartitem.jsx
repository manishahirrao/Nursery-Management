import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Title from "./Title";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useNavigate } from "react-router-dom";

const steps = ["Cart Review", "Payment Details", "Order Confirmation"];

const CartItem = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    upiId: "",
    bankAccount: "",
    ifscCode: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentDetailsChange = (event) => {
    setPaymentDetails({
      ...paymentDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePlaceOrder = () => {
    // Validate payment details based on payment method
    if (paymentMethod === "credit-card") {
      if (
        !paymentDetails.cardNumber ||
        !paymentDetails.expiryDate ||
        !paymentDetails.cvv ||
        !paymentDetails.cardholderName
      ) {
        setShowAlert(true);
        setAlertMessage("Please fill in all credit card details");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!paymentDetails.upiId) {
        setShowAlert(true);
        setAlertMessage("Please enter your UPI ID");
        return;
      }
    } else if (paymentMethod === "bank-transfer") {
      if (!paymentDetails.bankAccount || !paymentDetails.ifscCode) {
        setShowAlert(true);
        setAlertMessage("Please fill in all bank transfer details");
        return;
      }
    }

    setIsLoading(true);

    // Generate a random order number
    const newOrderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
    setOrderNumber(newOrderNumber);

    // Create order details
    const order = {
      orderNumber: newOrderNumber,
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total: getTotalPrice(),
      paymentMethod: paymentMethod,
      paymentDetails: {
        ...paymentDetails,
        // Mask sensitive information
        cardNumber: paymentDetails.cardNumber
          ? `****-****-****-${paymentDetails.cardNumber.slice(-4)}`
          : "",
        cvv: paymentDetails.cvv ? "***" : "",
        bankAccount: paymentDetails.bankAccount
          ? `****${paymentDetails.bankAccount.slice(-4)}`
          : "",
      },
    };

    // Simulate order processing
    setTimeout(() => {
      setIsLoading(false);
      setShowAlert(true);
      setAlertMessage(
        `Order #${newOrderNumber} placed successfully! Thank you for your purchase.`
      );

      // Show order summary
      setOrderDetails(order);
      setShowOrderSummary(true);

      // Clear the cart
      clearCart();

      // Reset the form
      setPaymentDetails({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
        upiId: "",
        bankAccount: "",
        ifscCode: "",
      });

      // Reset payment method
      setPaymentMethod("credit-card");

      // Reset to first step
      setActiveStep(0);

      // Navigate to home page after 5 seconds
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }, 1500);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "credit-card":
        return (
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Card Number"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentDetailsChange}
              variant="outlined"
              required
              size="small"
            />
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Expiry Date"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handlePaymentDetailsChange}
                variant="outlined"
                placeholder="MM/YY"
                required
                size="small"
              />
              <TextField
                label="CVV"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handlePaymentDetailsChange}
                variant="outlined"
                type="password"
                required
                size="small"
              />
            </div>
            <TextField
              fullWidth
              label="Cardholder Name"
              name="cardholderName"
              value={paymentDetails.cardholderName}
              onChange={handlePaymentDetailsChange}
              variant="outlined"
              required
              size="small"
            />
          </div>
        );
      case "upi":
        return (
          <TextField
            fullWidth
            label="UPI ID"
            name="upiId"
            value={paymentDetails.upiId}
            onChange={handlePaymentDetailsChange}
            variant="outlined"
            placeholder="example@upi"
            required
            size="small"
          />
        );
      case "bank-transfer":
        return (
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Bank Account Number"
              name="bankAccount"
              value={paymentDetails.bankAccount}
              onChange={handlePaymentDetailsChange}
              variant="outlined"
              required
              size="small"
            />
            <TextField
              fullWidth
              label="IFSC Code"
              name="ifscCode"
              value={paymentDetails.ifscCode}
              onChange={handlePaymentDetailsChange}
              variant="outlined"
              required
              size="small"
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Title text1="Your Cart" />
        <Typography variant="h6" className="mt-8">
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          className="!bg-green-600 hover:!bg-green-700 mt-4"
          onClick={() => window.history.back()}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Title text1="Your Cart" />

      {showOrderSummary && orderDetails ? (
        <Card className="mb-8">
          <CardContent>
            <Typography variant="h5" className="mb-4 text-green-600">
              Order Confirmation
            </Typography>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Typography variant="subtitle1">Order Number:</Typography>
                <Typography variant="subtitle1" className="font-semibold">
                  {orderDetails.orderNumber}
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="subtitle1">Date:</Typography>
                <Typography variant="subtitle1">{orderDetails.date}</Typography>
              </div>
              <Divider />
              <Typography variant="h6" className="mb-2">
                Order Items:
              </Typography>
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <Typography>
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </div>
              ))}
              <Divider />
              <div className="flex justify-between">
                <Typography variant="h6">Total Amount:</Typography>
                <Typography variant="h6" className="text-green-600">
                  ${orderDetails.total.toFixed(2)}
                </Typography>
              </div>
              <Divider />
              <Typography variant="h6" className="mb-2">
                Payment Details:
              </Typography>
              <div className="space-y-2">
                <Typography>
                  Payment Method:{" "}
                  {orderDetails.paymentMethod === "credit-card"
                    ? "Credit Card"
                    : orderDetails.paymentMethod === "upi"
                    ? "UPI"
                    : "Bank Transfer"}
                </Typography>
                {orderDetails.paymentMethod === "credit-card" && (
                  <>
                    <Typography>
                      Card Number: {orderDetails.paymentDetails.cardNumber}
                    </Typography>
                    <Typography>
                      Cardholder: {orderDetails.paymentDetails.cardholderName}
                    </Typography>
                  </>
                )}
                {orderDetails.paymentMethod === "upi" && (
                  <Typography>
                    UPI ID: {orderDetails.paymentDetails.upiId}
                  </Typography>
                )}
                {orderDetails.paymentMethod === "bank-transfer" && (
                  <>
                    <Typography>
                      Account Number: {orderDetails.paymentDetails.bankAccount}
                    </Typography>
                    <Typography>
                      IFSC Code: {orderDetails.paymentDetails.ifscCode}
                    </Typography>
                  </>
                )}
              </div>
            </div>
            <div className="mt-6 text-center">
              <Typography variant="body2" color="text.secondary">
                You will be redirected to the home page in a few seconds...
              </Typography>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Stepper activeStep={activeStep} className="mb-8">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              {activeStep === 0 && (
                <>
                  {cartItems.map((item) => (
                    <Card key={item.id} className="mb-4">
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={3}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-32 object-cover rounded"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              ${item.price}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <div className="flex items-center">
                              <IconButton
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity,
                                    -1
                                  )
                                }
                              >
                                <RemoveIcon />
                              </IconButton>
                              <Typography className="mx-2">
                                {item.quantity}
                              </Typography>
                              <IconButton
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity,
                                    1
                                  )
                                }
                              >
                                <AddIcon />
                              </IconButton>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <Typography variant="h6">
                              ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                            <IconButton
                              color="error"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}

              {activeStep === 1 && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" className="mb-4">
                      Payment Method
                    </Typography>
                    <FormControl component="fieldset" className="w-full">
                      <RadioGroup
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        <FormControlLabel
                          value="credit-card"
                          control={<Radio />}
                          label={
                            <div className="flex items-center">
                              <CreditCardIcon className="mr-2" />
                              Credit/Debit Card
                            </div>
                          }
                        />
                        <FormControlLabel
                          value="upi"
                          control={<Radio />}
                          label={
                            <div className="flex items-center">
                              <PaymentsIcon className="mr-2" />
                              UPI
                            </div>
                          }
                        />
                        <FormControlLabel
                          value="bank-transfer"
                          control={<Radio />}
                          label={
                            <div className="flex items-center">
                              <AccountBalanceIcon className="mr-2" />
                              Bank Transfer
                            </div>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                    <div className="mt-4">{renderPaymentForm()}</div>
                  </CardContent>
                </Card>
              )}

              {activeStep === 2 && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" className="mb-4">
                      Order Summary
                    </Typography>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between mb-2">
                        <Typography>
                          {item.name} x {item.quantity}
                        </Typography>
                        <Typography>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </div>
                    ))}
                    <Divider className="my-4" />
                    <div className="flex justify-between">
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6">
                        ${getTotalPrice().toFixed(2)}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" className="mb-4">
                    Order Summary
                  </Typography>
                  <Divider className="mb-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Typography>Subtotal</Typography>
                      <Typography>${getTotalPrice().toFixed(2)}</Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography>Shipping</Typography>
                      <Typography>Free</Typography>
                    </div>
                    <Divider className="my-2" />
                    <div className="flex justify-between">
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6">
                        ${getTotalPrice().toFixed(2)}
                      </Typography>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button
                      variant="contained"
                      fullWidth
                      className="!bg-green-600 hover:!bg-green-700"
                      onClick={handleNext}
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Processing..."
                        : activeStep === steps.length - 1
                        ? "Place Order"
                        : "Next"}
                    </Button>
                    {activeStep > 0 && !isLoading && (
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleBack}
                        className="!border-green-600 !text-green-600 hover:!bg-green-50"
                      >
                        Back
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={alertMessage.includes("Please") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CartItem;
