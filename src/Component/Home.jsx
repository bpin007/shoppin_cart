import React from "react";
import { CartState } from "../context/Eontext";
import SingleProduct from "./SingleProduct";
import "./styles.css";
import Fliter from "./Fliter";
const Home = () => {
  const {
    state: { products = {} },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();
  console.log(products);

  const transformProduct = () => {
    let sortedProduct = products;
    if (sort) {
      sortedProduct = sortedProduct.sort((a, b) =>
        sort == "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (!byStock) {
      sortedProduct = sortedProduct.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProduct = sortedProduct.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProduct = sortedProduct.filter((prod) => prod.ratings >= byRating);
    }

    if (searchQuery) {
      sortedProduct = sortedProduct.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProduct;
  };

  return (
    <div className="home">
      <Fliter />
      <div className="productContainer">
        {transformProduct().map((prod) => {
          return <SingleProduct prod={prod} />;
        })}
      </div>
    </div>
  );
};

export default Home;
