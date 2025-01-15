import { useState } from "react";
import Button from 'react-bootstrap/Button';
import NavBar from "../components/NavBar";
import SignupForm from "../components/SignupForm";
import useCreateNewUser from "../hooks/useCreateNewUser";


// const formData = { username: 'newuser1', password: '123456' }


const SignupPage = () => {

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src="/src/assets/avatar_signup.jpg"
                    
                    className="rounded-circle"
                    alt="Регистрация"
                  ></img>
                </div>
                <SignupForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
};

export default SignupPage;


