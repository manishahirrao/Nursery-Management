import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Chip,
  CardMedia,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Zoom,
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

// Mock orders data (in a real app, this would come from an API)
const mockOrders = [
  {
    id: "ORD123456",
    date: "2024-03-15T10:30:00",
    status: "Delivered",
    items: [
      {
        id: 1,
        name: "Monstera Deliciosa",
        price: 1299,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1600411833117-5c82f9d5c3b8?w=500",
      },
      {
        id: 2,
        name: "Snake Plant",
        price: 899,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
      },
    ],
    shipping: {
      fullName: "John Doe",
      address: "123 Garden Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "9876543210",
    },
    payment: {
      method: "UPI",
      upiId: "john@upi",
    },
    total: 3097,
    subtotal: 2997,
    shippingCost: 100,
  },
  {
    id: "ORD123457",
    date: "2024-03-16T14:20:00",
    status: "Processing",
    items: [
      {
        id: 3,
        name: "Peace Lily",
        price: 799,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
      },
      {
        id: 4,
        name: "ZZ Plant",
        price: 1299,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1600411833117-5c82f9d5c3b8?w=500",
      },
    ],
    shipping: {
      fullName: "Sarah Smith",
      address: "456 Green Avenue",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      phone: "9876543211",
    },
    payment: {
      method: "Card",
      cardLast4: "4321",
    },
    total: 2098,
    subtotal: 1998,
    shippingCost: 100,
  },
  {
    id: "ORD123458",
    date: "2024-03-16T09:15:00",
    status: "Shipped",
    items: [
      {
        id: 5,
        name: "Fiddle Leaf Fig",
        price: 2499,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1600411833117-5c82f9d5c3b8?w=500",
      },
    ],
    shipping: {
      fullName: "Mike Johnson",
      address: "789 Plant Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      phone: "9876543212",
    },
    payment: {
      method: "UPI",
      upiId: "mike@upi",
    },
    total: 2599,
    subtotal: 2499,
    shippingCost: 100,
  },
  {
    id: "ORD123459",
    date: "2024-03-15T16:45:00",
    status: "Cancelled",
    items: [
      {
        id: 6,
        name: "Bird's Nest Fern",
        price: 699,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
      },
    ],
    shipping: {
      fullName: "Emma Wilson",
      address: "321 Garden Lane",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001",
      phone: "9876543213",
    },
    payment: {
      method: "Card",
      cardLast4: "5678",
    },
    total: 1498,
    subtotal: 1398,
    shippingCost: 100,
  },
  {
    id: "ORD123460",
    date: "2024-03-17T11:30:00",
    status: "Processing",
    items: [
      {
        id: 7,
        name: "Chinese Evergreen",
        price: 899,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1600411833117-5c82f9d5c3b8?w=500",
      },
      {
        id: 8,
        name: "Pothos",
        price: 599,
        quantity: 3,
        image:
          "https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=500",
      },
    ],
    shipping: {
      fullName: "David Brown",
      address: "654 Plant Street",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500001",
      phone: "9876543214",
    },
    payment: {
      method: "UPI",
      upiId: "david@upi",
    },
    total: 2796,
    subtotal: 2696,
    shippingCost: 100,
  },
];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "success";
    case "processing":
      return "info";
    case "shipped":
      return "primary";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const Orders = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderOrderCard = (order) => (
    <Zoom in timeout={500}>
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Order #{order.id}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Placed on {formatDate(order.date)}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                size="small"
              />
              <Chip
                icon={<PaymentIcon />}
                label={order.payment.method}
                variant="outlined"
                size="small"
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {order.items.length} items • Total: ₹{order.total}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "flex-end" },
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                startIcon={<ViewIcon />}
                onClick={() => handleViewOrder(order)}
              >
                View Details
              </Button>
              <Button
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                startIcon={<DownloadIcon />}
              >
                Invoice
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Zoom>
  );

  const renderOrderDetails = () => (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: { xs: 2, sm: 3 },
        },
      }}
    >
      {selectedOrder && (
        <>
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Order Details #{selectedOrder.id}
          </DialogTitle>
          <DialogContent>
            <Fade in timeout={500}>
              <Box>
                {/* Order Status */}
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={selectedOrder.status}
                      color={getStatusColor(selectedOrder.status)}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Placed on {formatDate(selectedOrder.date)}
                    </Typography>
                  </Stack>
                </Box>

                {/* Order Items */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    Order Items
                  </Typography>
                  <Stack spacing={2}>
                    {selectedOrder.items.map((item) => (
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
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
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
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
                      {selectedOrder.shipping.fullName}
                    </Typography>
                    <Typography variant="body1">
                      {selectedOrder.shipping.address}
                    </Typography>
                    <Typography variant="body1">
                      {selectedOrder.shipping.city},{" "}
                      {selectedOrder.shipping.state} -{" "}
                      {selectedOrder.shipping.pincode}
                    </Typography>
                    <Typography variant="body1">
                      Phone: {selectedOrder.shipping.phone}
                    </Typography>
                  </Paper>
                </Box>

                {/* Payment Details */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
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
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "medium" }}
                        >
                          {selectedOrder.payment.method}
                        </Typography>
                      </Grid>
                      {selectedOrder.payment.method === "UPI" && (
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            UPI ID
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "medium" }}
                          >
                            {selectedOrder.payment.upiId}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </Box>

                {/* Order Summary */}
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body1">Subtotal</Typography>
                        <Typography variant="body1">
                          ₹{selectedOrder.subtotal}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body1">Shipping</Typography>
                        <Typography variant="body1">
                          ₹{selectedOrder.shippingCost}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Total
                        </Typography>
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: "bold" }}
                        >
                          ₹{selectedOrder.total}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Box>
              </Box>
            </Fade>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={handleCloseDialog}
              size={isMobile ? "medium" : "large"}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              size={isMobile ? "medium" : "large"}
            >
              Download Invoice
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );

  const filteredOrders = () => {
    switch (selectedTab) {
      case 0: // All Orders
        return mockOrders;
      case 1: // Processing
        return mockOrders.filter((order) => order.status === "Processing");
      case 2: // Delivered
        return mockOrders.filter((order) => order.status === "Delivered");
      case 3: // Cancelled
        return mockOrders.filter((order) => order.status === "Cancelled");
      default:
        return mockOrders;
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
              My Orders
            </Typography>

            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ mb: 4 }}
            >
              <Tab label={`All Orders (${mockOrders.length})`} />
              <Tab
                label={`Processing (${
                  mockOrders.filter((o) => o.status === "Processing").length
                })`}
              />
              <Tab
                label={`Delivered (${
                  mockOrders.filter((o) => o.status === "Delivered").length
                })`}
              />
              <Tab
                label={`Cancelled (${
                  mockOrders.filter((o) => o.status === "Cancelled").length
                })`}
              />
            </Tabs>

            {filteredOrders().length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  bgcolor: "background.default",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No orders found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {selectedTab === 0
                    ? "You haven't placed any orders yet."
                    : `You don't have any ${
                        selectedTab === 1
                          ? "processing"
                          : selectedTab === 2
                          ? "delivered"
                          : "cancelled"
                      } orders.`}
                </Typography>
              </Paper>
            ) : (
              filteredOrders().map((order) => renderOrderCard(order))
            )}

            {renderOrderDetails()}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Orders;
