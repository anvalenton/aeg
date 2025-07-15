import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import {
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  CardContent,
  InputLabel,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      // add qty property to each product with random value between 1 and 10
      const mockDataWithQty = await response
        .clone()
        .json()
        .then((data) =>
          data.map((item) => ({
            ...item,
            qty: Math.floor(Math.random() * 10) + 1,
          }))
        );
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(mockDataWithQty);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>
        <Grid container spacing={1} columns={{ xs: 2, sm: 4 }}>
          {filter.map((product) => {
            const outOfStock = product.qty === 0;
            return (
              <Grid item xs={2} sm={4} key={`${product.id} - ${product.title}`}>
                <Card
                  sx={{
                    width: 250,
                    height: 600,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 1,
                  }}
                >
                  <CardHeader
                    title={product.title}
                    component="h6"
                    sx={{ "& .MuiTypography-root": { fontSize: "18px" } }}
                  />
                  <CardMedia
                    component="img"
                    src={product.image}
                    sx={{
                      objectFit: "contain",
                      maxHeight: "200px",
                      width: "80%",
                    }}
                  ></CardMedia>
                  <CardContent
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <InputLabel>Options</InputLabel>
                      <Select
                        label="Options"
                        onChange={() => {}}
                        sx={{ width: "100px" }}
                      >
                        <MenuItem value={1}>Option 1</MenuItem>
                        <MenuItem value={2}>Option 2</MenuItem>
                        <MenuItem value={3}>Option 3</MenuItem>
                      </Select>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {`$${product.price}`}
                    </Typography>
                  </CardContent>
                  {!outOfStock ? (
                    <CardActions>
                      <Button
                        onClick={() => {
                          toast.success("Added to cart");
                          addProduct(product);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  ) : (
                    <Typography variant="body2" color="error">
                      Out of Stock
                    </Typography>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
