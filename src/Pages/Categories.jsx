import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Zoom,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import indoor from "../assets/indoor.jpeg";
import outdoor from "../assets/outdoor.jpeg";
import flowering from "../assets/flowering.jpeg";
import succulent from "../assets/succulent.jpeg";
import herbs from "../assets/herbs.jpeg";
import bonsai from "../assets/bonsai.jpeg";

const Categories = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const categories = [
    {
      id: 1,
      title: "Indoor Plants",
      image: indoor,
      description: "Perfect for home and office spaces",
      category: "Indoor",
    },
    {
      id: 2,
      title: "Outdoor Plants",
      image: outdoor,
      description: "Enhance your garden and landscape",
      category: "Outdoor",
    },
    {
      id: 3,
      title: "Flowering Plants",
      image: flowering,
      description: "Add color and beauty to your space",
      category: "Flowering",
    },
    {
      id: 4,
      title: "Succulents",
      image: succulent,
      description: "Low maintenance, high style",
      category: "Succulent",
    },
    {
      id: 5,
      title: "Herbs",
      image: herbs,
      description: "Fresh herbs for cooking and wellness",
      category: "Herbs",
    },
    {
      id: 6,
      title: "Bonsai",
      image: bonsai,
      description: "Miniature trees with artistic appeal",
      category: "Bonsai",
    },
  ];

  const handleExplore = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}
      >
        {/* Header */}
        <Typography
          variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: { xs: 3, sm: 4, md: 6 },
            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
            color: "text.primary",
          }}
        >
          Plant Categories
        </Typography>

        {/* Categories Grid */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {categories.map((category, index) => (
            <Grid item key={category.id} xs={12} sm={6} md={4}>
              <Zoom
                in
                timeout={500}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.2s ease-in-out",
                    borderRadius: 2,
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? 200 : isTablet ? 250 : 300}
                    image={category.image}
                    alt={category.title}
                    sx={{
                      objectFit: "cover",
                      bgcolor: "grey.100",
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: { xs: 2, sm: 3 },
                      bgcolor: "background.paper",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant={isMobile ? "h6" : "h5"}
                      component="h2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                        mb: { xs: 1, sm: 2 },
                      }}
                    >
                      {category.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: { xs: 2, sm: 3 },
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        flexGrow: 1,
                      }}
                    >
                      {category.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size={isMobile ? "medium" : "large"}
                      onClick={() => handleExplore(category.category)}
                      sx={{
                        alignSelf: "flex-start",
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1, sm: 1.5 },
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: theme.shadows[2],
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Categories;
