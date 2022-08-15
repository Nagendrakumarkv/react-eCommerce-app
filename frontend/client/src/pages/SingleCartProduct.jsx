import { Add, Remove } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { removeCartProduct } from "../redux/apiCalls";
import { incOrDecQuantity } from "../redux/cartRedux";
import { mobile } from "../responsive";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductQuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductQuantity = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const ProductRemove = styled.span`
  color: red;
  font-size: 20px;
  text-decoration: underline;
  cursor: pointer;
`;

const SingleCartProduct = ({ product }) => {
  console.log(product.quantity);
  const [quantity, setQuantity] = useState(product.quantity);

  const dispatch = useDispatch();

  const handleProductRemove = (cartProductId) => {
    if (window.confirm("Are you sure to delete cart?")) {
      removeCartProduct(dispatch, cartProductId);
    }
  };

  const handleQuantity = (type, amount, id) => {
    if (type === "dec") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        dispatch(incOrDecQuantity({ amount: amount, type: "dec", id: id }));
      }
    } else {
      setQuantity(quantity + 1);
      dispatch(incOrDecQuantity({ amount: amount, type: "inc", id: id }));
    }
  };

  return (
    <Product key={product._id && product.cartProductId}>
      <ProductDetail>
        <Image src={product.img} />
        <Details>
          <ProductName>
            <b>Product:</b> {product.title}
          </ProductName>
          <ProductId>
            <b>ID:</b> {product._id}
          </ProductId>
          <ProductColor color={product.color} />
          <ProductSize>
            <b>Size:</b> {product.size}
          </ProductSize>
          <ProductRemove
            onClick={() => handleProductRemove(product.cartProductId)}
          >
            remove
          </ProductRemove>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductQuantityContainer>
          <Add
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleQuantity("inc", product.price, product.cartProductId)
            }
          />
          <ProductQuantity>{quantity}</ProductQuantity>
          <Remove
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleQuantity("dec", product.price, product.cartProductId)
            }
          />
        </ProductQuantityContainer>
        <ProductPrice>$ {product.price * quantity}</ProductPrice>
      </PriceDetail>
    </Product>
  );
};

export default SingleCartProduct;
