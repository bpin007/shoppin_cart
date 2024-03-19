import React, { useEffect, useState } from "react";
import { CartState } from "../context/Eontext";
import { Button, Col, ListGroup, Form, Image, Row } from "react-bootstrap";
import Ratting from "./Ratting";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: { cart, dispatch },
  } = CartState();

  console.log(dispatch);

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + Number(cur.price) * cur.qty, 0));
  }, [cart]);

  const handleChangeQuantity = (e) => {
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id: cart.id,
        qty: e.target.value,
      },
    });
  };

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((pord) => (
            <ListGroup.Item key={pord.id}>
              <Row>
                <Col>
                  <Image src={pord.image} alt={pord.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{pord.name}</span>
                </Col>
                <Col md={2}>${pord.price}</Col>
                <Col md={2}>
                  <Ratting rating={pord.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={pord.qty}
                    onChange={(e) => handleChangeQuantity(e)}
                  >
                    {[...Array(pord.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: pord,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div>
        <span className="filters summary">
          <span className="title">subtotal ({cart.length})items</span>
          <span style={{ fontWeight: 700, fontSize: 20 }}>Total:${total}</span>
          <Button type="button" disabled={cart.length === 0}>
            Proceed to Checkout
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Cart;
