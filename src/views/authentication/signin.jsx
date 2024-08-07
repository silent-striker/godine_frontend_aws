import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./common.css";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import UserPool from '../../UserPool'

function Signin() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const emailRef = useRef();

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  const { setAuthData, isSessionValid } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSessionValid()) {
      navigate("/", {
        replace: true,
      });
    }

    emailRef.current.focus();
  }, [isSessionValid]);

  function validateEmailAndSet(e) {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      setValidEmail(true);
      setEmail(email);
    } else {
      setValidEmail(false);
    }
  }

  function validatePasswordAndSet(e) {
    const pwd = e.target.value;
    const pwdRegex = /^.{8,}$/;
    if (pwdRegex.test(pwd)) {
      setValidPassword(true);
      setPassword(pwd);
    } else {
      setValidPassword(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (email !== '' && password !== '' && validEmail) {
      // create a new CognitoUser object
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool
      });

      // get the user's authentication details
      const authData = {
        Username: email,
        Password: password
      };

      // authenticate user credentials on cognito
      const userData = user.authenticateUser(new AuthenticationDetails(authData), {
        onSuccess: (session) => {
          console.log('Login successful: ', session);
          const userData = {
            accessToken: session.getAccessToken().getJwtToken(),
            userId: session.getAccessToken().payload.username,
            expiry: session.getAccessToken().payload.exp,
            idToken: session.getIdToken().getJwtToken(),
            name: session.getIdToken().payload.name,
            refreshToken: session.getRefreshToken().getToken()
          }

          setAuthData(userData);
          navigate('/', { replace: true });
        },
        onFailure: (err) => {
          alert(err.message);
          console.error(err.message);
        }
      });
    } else {
      alert('Please enter valid details');
      window.location.reload();
    }
  }

  return (
    <div className="signin-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <div className="card signin-card glass">
              <h1 style={{ color: "#333333" }}>Sign In</h1>
              <form>
                <div className="form-group m-1">
                  <label>Email</label>
                  <input
                    type="text"
                    ref={emailRef}
                    className="form-control"
                    placeholder="Enter email"
                    onInput={validateEmailAndSet}
                  />
                  {validEmail ? null : (
                    <small style={{ color: "red" }}>
                      Please enter a valid email
                    </small>
                  )}
                </div>
                <div className="form-group m-1">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onInput={validatePasswordAndSet}
                  />
                  {validPassword ? null : (
                    <small style={{ color: "red" }}>Min. 8 characters</small>
                  )}
                </div>

                <Link to="/forgot-password" style={{ display: "block", color: "lightblue" }}>
                  Forgot Password?
                </Link>
                <Link to="/signup" style={{ display: "block", color: "lightblue" }}>
                  Don't have an account? Create one now
                </Link>

                <button
                  type="submit"
                  className="btn btn-primary m-1"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
