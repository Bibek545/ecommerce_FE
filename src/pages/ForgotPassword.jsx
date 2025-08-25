import React, { useRef, useState, useEffect } from "react";
import { Button, Card, Form, Alert, Spinner, Container, Row, Col } from "react-bootstrap";
import { requestPassResetOTPApi, resetPassApi } from "../helpers/axiosHelpers.js";
import { useNavigate, Link } from "react-router-dom";

const timToRequestOtpAgain = 30;

const ForgotPassword = () => {
  const emailRef = useRef();
  const otpRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const [showPassResetForm, setShowPassResetForm] = useState(false);
  const [isOtpPending, setOtpPending] = useState(false);
  const [isOtpBtnDisabled, setOtpBtnDisabled] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isResetPending, setResetPending] = useState(false);

  useEffect(() => {
    if (counter > 0) {
      const t = setInterval(() => setCounter((p) => p - 1), 1000);
      return () => clearInterval(t);
    } else {
      setOtpBtnDisabled(false);
    }
  }, [counter]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim().toLowerCase();
    if (!email) return;

    setOtpPending(true);
    setOtpBtnDisabled(true);

    try {
      const res = await requestPassResetOTPApi({ email });
      if (res?.status === "success") {
        setOtpPending(false);
        setShowPassResetForm(true);
        setCounter(timToRequestOtpAgain);
      } else {
        setOtpPending(false);
        setOtpBtnDisabled(false);
      }
    } catch (err) {
      setOtpPending(false);
      setOtpBtnDisabled(false);
      console.error(err);
    }
  };

  const handleOnPasswordResetSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim().toLowerCase();
    const otp = String(otpRef.current.value).trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setResetPending(true);
    try {
      const res = await resetPassApi({ email, otp, password });
      if (res?.status === "success") {
        setTimeout(() => navigate("/login"), 1200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setResetPending(false);
    }
  };

  return (
    <section className="bg-light">
      <Container className="min-vh-75 d-flex align-items-center py-5">
        <Row className="justify-content-center w-100">
          <Col xs={12} sm={10} md={8} lg={5}>
            <Card className="shadow-sm rounded-4">
              <Card.Body className="p-4">
                <Card.Title className="h4 mb-2 text-center">Forgot your password</Card.Title>
                <p className="text-secondary text-center mb-4">
                  Enter your email to receive a one‑time code (OTP) to reset your password.
                </p>

                {/* Step 1: Request OTP */}
                <Form onSubmit={handleOnSubmit} className="mb-3">
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="you@email.com"
                      ref={emailRef}
                      autoComplete="email"
                      required
                    />
                    <Form.Text className="text-muted">We’ll send the OTP to this address.</Form.Text>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 mt-3"
                    variant="primary"
                    disabled={isOtpBtnDisabled}
                  >
                    {isOtpPending ? (
                      <Spinner animation="border" size="sm" />
                    ) : counter > 0 ? (
                      `Resend in ${counter}s`
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </Form>

                {/* Step 2: Reset with OTP */}
                {showPassResetForm && (
                  <>
                    <Alert variant="success" className="mb-3">
                      OTP sent. Check your inbox or spam folder.
                    </Alert>

                    <Form onSubmit={handleOnPasswordResetSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>OTP</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="000000"
                          ref={otpRef}
                          autoComplete="one-time-code"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>New password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="********"
                          ref={passwordRef}
                          autoComplete="new-password"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Confirm new password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="********"
                          ref={confirmPasswordRef}
                          autoComplete="new-password"
                          required
                        />
                      </Form.Group>

                      <Button type="submit" className="w-100" disabled={isResetPending}>
                        {isResetPending ? <Spinner animation="border" size="sm" /> : "Reset password"}
                      </Button>
                    </Form>
                  </>
                )}

                <div className="text-center mt-4">
                  Ready to login? <Link to="/login">Login now</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ForgotPassword;
