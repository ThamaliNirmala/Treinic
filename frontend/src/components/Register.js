import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { color, style } from "@mui/system";
import "./Button.css";
import { Button, Stack } from "@mui/material";

const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password did not match");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8070/api/auth/register",
        { username, email, password },
        config
      );

      localStorage.setItem("authToken", data.token);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000); //5s
    }
  };

  return (
    <div className="bg">
      {" "}
      <br />
      <Stack direction="row" spacing={2}>
        &nbsp; &nbsp;
        <a href="/">
          <Button variant="contained" color="success">
            <i class="fa fa-home" aria-hidden="true"></i>&nbsp; Home
          </Button>
        </a>
      </Stack>
      <div className="signup-form" style={{ opacity: "0.8" }}>
        <form onSubmit={registerHandler}>
          <h2 style={{ color: "white" }}>Sign Up</h2>
          {error && (
            <span className="error-message" style={{ color: "red" }}>
              {error}
            </span>
          )}{" "}
          {/*ternary operator*/}
          <p>Please fill in this form to create an account!</p>
          <hr />
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fa fa-user"></span>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                required="required"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-paper-plane"></i>
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email Address"
                required="required"
                pattern="[0-9a-zA-Z%&$@.]+@[a-zA-Z]+\.+[a-zA-Z]{2,3}"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                required="required"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                placeholder="Confirm Password"
                required="required"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <Button type="submit" variant="contained" color="primary">
              <i class="fa fa-sign-in" aria-hidden="true"></i> &nbsp; sign up
            </Button>
          </div>
        </form>
        <Link to={"/login"} style={{ color: "black", fontWeight: "bold" }}>
          {"Already have an account? Sign in"}
        </Link>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Register;
