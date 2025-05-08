import React, { useState } from "react";
import Title from "./Title";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";

const Cartitem = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Sample cart items - replace with your actual cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 49.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=500",
    },
    {
      id: 2,
      name: "Snake Plant",
      price: 39.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
    },
    {
      id: 3,
      name: "Peace Lily",
      price: 29.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleProceedToCheckout = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    alert("Payment processed successfully!");
    setCartItems([]);
    setShowPaymentForm(false);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const PaymentForm = () => (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        {paymentMethod === "credit-card" && (
          <>
            <TextField
              fullWidth
              label="Card Number"
              variant="outlined"
              required
              size="small"
            />
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Expiry Date"
                variant="outlined"
                placeholder="MM/YY"
                required
                size="small"
              />
              <TextField
                label="CVV"
                variant="outlined"
                type="password"
                required
                size="small"
              />
            </div>
            <TextField
              fullWidth
              label="Cardholder Name"
              variant="outlined"
              required
              size="small"
            />
          </>
        )}
        {paymentMethod === "bank-transfer" && (
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm">Bank Account Details:</p>
            <p className="text-sm mt-2">Bank: Example Bank</p>
            <p className="text-sm">Account Number: XXXX-XXXX-XXXX</p>
            <p className="text-sm">IFSC: EXBK0000123</p>
          </div>
        )}
        {paymentMethod === "upi" && (
          <div className="space-y-4">
            <TextField
              fullWidth
              label="UPI ID"
              variant="outlined"
              placeholder="example@upi"
              required
              size="small"
            />
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="!bg-green-600 hover:!bg-green-700 text-white"
        >
          Pay ${total.toFixed(2)}
        </Button>
      </form>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-8">
      <Title text1="Shopping Cart" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <Button
                variant="contained"
                className="!bg-green-600 hover:!bg-green-700 text-white mt-4"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <IconButton
                    color="error"
                    onClick={() => removeItem(item.id)}
                    className="ml-4"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary and Payment */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Divider />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {!showPaymentForm ? (
                <>
                  <Button
                    variant="contained"
                    fullWidth
                    className="!bg-green-600 hover:!bg-green-700 text-white mt-4"
                    disabled={cartItems.length === 0}
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    className="mt-2"
                    onClick={() => navigate("/shop")}
                  >
                    Continue Shopping
                  </Button>
                </>
              ) : (
                <>
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
                        value="bank-transfer"
                        control={<Radio />}
                        label={
                          <div className="flex items-center">
                            <AccountBalanceIcon className="mr-2" />
                            Bank Transfer
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
                    </RadioGroup>
                  </FormControl>
                  <PaymentForm />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;
