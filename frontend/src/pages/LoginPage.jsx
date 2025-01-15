import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Authform from "../components/AuthForm";

const LoginPage = () => {
  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <Image
                    src="/src/assets/avatar.jpg"
                    roundedCircle
                    alt="Войти"
                    fluid
                  />
                </Col>
                <Authform />
              </Card.Body>
              <Card.Footer className="text-center p-4">
                <span>Нет аккаунта? </span>
                <Card.Link href="/signup">Регистрация</Card.Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
