import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
//import { useDispatch } from "react-redux";
import { loginUser } from "../redux/api/apiRequest";
import { iLoginUser } from "../interface/user";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../interface/reduxhook";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUserState = useAppSelector((state) => state.currentUser.login);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    localStorage.clear();
  }, []);
  //-------------------------------------------------------------------
  //On Change
  const OnUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const OnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  //-----------------------------------------------------------------
  //On click
  //-----------------------------------------------------------------
  const OnLoginClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newUser: iLoginUser = {
      userName,
      password,
    };
    loginUser(newUser, dispatch, navigate);
  };
  //------------------------------------------------------------------
  //Return
  //------------------------------------------------------------------
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={4}>
          <h3 className="text-center fw-bold mb-4">Login</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter username"
                onChange={OnUserNameChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={OnPasswordChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              onClick={OnLoginClick}
            >
              Login
            </Button>
            <div className=" text-danger text-center">
              {currentUserState.strError}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
