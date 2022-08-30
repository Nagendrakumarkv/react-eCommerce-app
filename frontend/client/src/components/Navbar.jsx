import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { logOut } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  /* height: 60px;
  ${mobile({ height: "50px" })}
  position: sticky;
  background-color: black;
  top: 0;
  z-index: 2; */
  ${mobile({ height: "50px" })}
  width: 100%;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  height: 20px;
  width: 100px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  height: 5px;
  margin-top: 20px;
  margin-left: -5px;
  margin-bottom: 20px;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  &:hover {
    font-weight: bold;
  }
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Button = styled.button`
  border: none;
  background-color: white;
  color: black;
  font-weight: bold;
  cursor: pointer;
`;
const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let quantity = useSelector((state) => state.cart.quantity);

  const user = useSelector((state) => state.user.currentUser);

  //CKECK IF USER IS LOGGED OR NOT,IF LOGGED IN THEN SHOW THE CART ,ELSE IF NO LOGGED IN THEN SHOW THE LOGIN PAGE
  if (!user) {
    quantity = 0;
  }

  const handleSignOut = () => {
    if (window.confirm("Are you sure to sign out?")) {
      logOut(dispatch);
      navigate("/");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Naga.</Logo>
        </Center>
        <Right>
          {user ? (
            <MenuItem>
              <Button onClick={handleSignOut}>SIGN OUT</Button>
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  REGISTER
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  SIGN IN
                </Link>
              </MenuItem>
            </>
          )}

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
