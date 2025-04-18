// frontend/src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {API} from "../../services/axios.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./login.css";
import Input from "../../components/Input/index.jsx";
import Button from "../../components/Button/index.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await API.post("/auth/register", { username: name, email, password });
      setLoginForm(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="wrapper">
      <>
        {loginForm ? (
          <div className="signup-wrapper">
            <h2 className="title">
              Login on{" "}
              <span style={{ color: "var(--theme)" }}>Polynomial Pools.</span>
            </h2>
            <form>
              <Input
                type="email"
                label="Email"
                placeholder="JohnDoe@gmail.com"
                state={email}
                setState={setEmail}
              />
              <Input
                type="password"
                label="Password"
                placeholder="Example@123"
                state={password}
                setState={setPassword}
              />
              <Button
                onClick={handleLogin}
                disabled={loading}
                text={loading ? "Loading..." : "Login Using Email and Password"}
              />
              <p className="p-login" onClick={() => setLoginForm(false)}>
                or Don't Have An Account ? Click Here
              </p>
            </form>
          </div>
        ) : (
          <div className="signup-wrapper">
            <h2 className="title">
              Sign Up on{" "}
              <span style={{ color: "var(--theme)" }}>Polynomial Pools.</span>
            </h2>
            <form>
              <Input
                label="Full Name"
                placeholder="John Doe"
                state={name}
                setState={setName}
              />
              <Input
                type="email"
                label="Email"
                placeholder="JohnDoe@gmail.com"
                state={email}
                setState={setEmail}
              />
              <Input
                type="password"
                label="Password"
                placeholder="Example@123"
                state={password}
                setState={setPassword}
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Example@123"
                state={confirmPassword}
                setState={setConfirmPassword}
              />
              <Button
                onClick={handleRegister}
                disabled={loading}
                text={
                  loading ? "Loading..." : "Signup Using Email and Password"
                }
              />
              <p className="p-login" onClick={() => setLoginForm(true)}>
                or Have An Account Already ? Click Here
              </p>
            </form>
          </div>
        )}
      </>
    </div>
  );
};

export default Login;
