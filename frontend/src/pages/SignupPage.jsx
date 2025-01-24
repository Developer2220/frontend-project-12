import React from 'react';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import NavBar from '../components/NavBar';
import SignupForm from '../components/SignupForm';
import avatarSignup from '../assets/avatarSignup.jpg';

const SignupPage = () => {
  const { t } = useTranslation();
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
                    src={avatarSignup}
                    roundedCircle
                    alt={t('signupPage.title')}
                    fluid
                  />
                </Col>
                <SignupForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;
