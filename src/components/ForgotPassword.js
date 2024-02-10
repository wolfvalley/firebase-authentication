import React, { useContext, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContext } from "./context/AuthContext"; // Import the context
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useContext(AuthContext); // Destructure the signup function from context
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value); // Call the reset password function with email
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      setError("Failed to login: " + error.message);
    }

    setLoading(false); // Reset loading state after signup attempt
  }
  return (
    <Card>
      <Card.Body>
        <h2 className="test-center mb-4">Password Reset</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">
            Reset Password
          </Button>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Form>
      </Card.Body>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </Card>
  );
}
