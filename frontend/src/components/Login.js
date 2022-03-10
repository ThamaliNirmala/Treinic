import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import "./Register.css";
import "./Button.css";
import { Button, Stack } from "@mui/material";

const LoginScreen = ({ history }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      //push a user if he already logged in
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:8070/api/auth/login",
        { email, password },
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

  const showPassword = () => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <div className=" bg0">
      <br />

      <Stack direction="row" spacing={2}>
        &nbsp; &nbsp;
        <a href="/">
          <Button variant="contained" color="success">
            <i class="fa fa-home" aria-hidden="true"></i>&nbsp; Home
          </Button>
        </a>
      </Stack>
      <div className="signup-form  bg-dark " style={{ opacity: "0.8" }}>
        <form onSubmit={loginHandler}>
          <h2 className="text-center" style={{ color: "white" }}>
            <i class="fa fa-sign-in" aria-hidden="true"></i> Log in{" "}
          </h2>{" "}
          <br />
          {error && <span className="badge bg-warning">{error}</span>}
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required="required"
              pattern="[0-9a-zA-Z%&$@.]+@[a-zA-Z]+\.+[a-zA-Z]{2,3}"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required="required"
              id="myInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label className="float-left form-check-label">
              <input type="checkbox" onClick={showPassword} /> Show Password
            </label>
          </div>
          <br />
          <div className="form-group">
            <Button variant="contained" color="primary">
              <i class="fa fa-sign-in" aria-hidden="true"></i> &nbsp; Log in
            </Button>
          </div>
          <br />
          <div className="clearfix">
            <label className="float-left form-check-label">
              <input type="checkbox" /> Remember me{" "}
              <i class="fa fa-rss" aria-hidden="true"></i>
            </label>
            <br />
          </div>
        </form>
        <Link to={"/register"} style={{ textAlign: "center" }}>
          {"Don't have an account? Sign Up"}
        </Link>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default LoginScreen;
