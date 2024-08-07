import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./common.css";
import useAuth from "../../hooks/useAuth";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../../UserPool";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [toggleResetPassword, setToggleResetPassword] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState(true);
  const [passwordMatched, setPasswordMatched] = useState(true);

  const { getAuthData, isSessionValid } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSessionValid()) {
      navigate("/", {
        replace: true,
      });
    }
  }, []);

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
    e.preventDefault();
    const pwd = e.target.value;
    const pwdRegex = /^.{8,}$/;

    if (pwdRegex.test(pwd)) {
      setValidNewPassword(true);
    } else {
      setValidNewPassword(false);
    }
    setNewPassword(pwd);
  }

  function validateConfirmPassword(e) {
    e.preventDefault();
    const currPwd = e.target.value;
    const pwd = newPassword;
    if (currPwd.match(pwd)) {
      setPasswordMatched(true);
    } else {
      setPasswordMatched(false);
    }
  }

  // handle pending request
  async function handleEmailSubmit(e) {
    e.preventDefault();

    if (email !== "" && validEmail) {
      const userData = {
        Username: email,
        Pool: UserPool,
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          alert("Code sent to your email");
          setToggleResetPassword(true);
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          window.location.reload();
        }
      });
    } else {
      alert("Please enter valid email");
      window.location.reload();
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    if (resetCode !== "" && newPassword !== ""
      && validNewPassword && passwordMatched) {
      const userData = {
        Username: email,
        Pool: UserPool
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmPassword(resetCode, newPassword, {
        onSuccess: (data) => {
          alert("Password reset successfully");
          navigate("/signin");
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          window.location.reload();
        }
      });
    } else {
      alert("Please enter valid values");
    }
  }

  return (
    <div className="forgot-password-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <div className="card forgot-password-card glass">
              {
                toggleResetPassword ?
                  <>
                    <h1 style={{ color: "#333333" }}>Reset Password</h1>
                    <form>
                      <div className="form-group m-1">
                        <label>Reset code</label>
                        <input
                          type="text"
                          value={resetCode}
                          className="form-control"
                          placeholder="Enter code"
                          onInput={(e) => setResetCode(e.target.value)}
                        />
                        {resetCode !== "" ? null : (
                          <small style={{ color: "red" }}>
                            Code cannot by empty
                          </small>
                        )}
                      </div>
                      <div className="form-group m-1">
                        <label>New password</label>
                        <input
                          type="password"
                          value={newPassword}
                          className="form-control"
                          placeholder="Enter password"
                          onInput={validatePasswordAndSet}
                        />
                        {validNewPassword ? null : (
                          <small style={{ color: "red" }}>
                            Password must be at least 8 characters long
                          </small>
                        )}
                      </div>
                      <div className="form-group m-1">
                        <label>Confirm password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm password"
                          onInput={validateConfirmPassword}
                        />
                        {passwordMatched ? null : (
                          <small style={{ color: "red" }}>
                            Passwords do not match
                          </small>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary m-1"
                        onClick={handleResetPassword}
                      >
                        Submit
                      </button>
                    </form>
                  </>
                  :
                  <>
                    <h1 style={{ color: "#333333" }}>Forgot Password</h1>
                    <form>
                      <div className="form-group m-1">
                        <label>Enter email</label>
                        <input
                          type="text"
                          className="form-control"
                          onInput={validateEmailAndSet}
                        />
                        {validEmail ? null : (
                          <small style={{ color: "red" }}>
                            Please enter valid email
                          </small>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary m-1"
                        onClick={handleEmailSubmit}
                      >
                        Submit
                      </button>
                    </form>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
