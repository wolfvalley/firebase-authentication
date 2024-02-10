import React, { useContext, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContext } from "./context/AuthContext"; // Import the context
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useContext(AuthContext); // Destructure the signup function from context
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value); // Call the signup function with email and password
      navigate("/");
    } catch (error) {
      setError("Failed to login: " + error.message);
    }

    setLoading(false); // Reset loading state after signup attempt
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="test-center mb-4">Log In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">
            Log In
          </Button>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Form>
      </Card.Body>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </Card>
  );
}
