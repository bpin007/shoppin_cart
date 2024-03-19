import React from "react";
import { Button, Card } from "react-bootstrap";
import Ratting from "./Ratting";
import { CartState } from "../context/Eontext";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const handleAdd = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: prod,
    });
  };
  const handleRemove = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: prod,
    });
  };

  console.log(cart);

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod.image} alt={prod.name} />
        <Card.Body>
          <Card.Subtitle style={{ padding: 10 }}>
            <span>${prod.price.split(".")[0]}</span>
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days Delivery</div>
            )}
            <Ratting rating={prod.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <Button variant="danger" onClick={() => handleRemove()}>
              Remove from cart
            </Button>
          ) : (
            <Button onClick={() => handleAdd()} disabled={!prod.inStock}>
              {!prod.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
