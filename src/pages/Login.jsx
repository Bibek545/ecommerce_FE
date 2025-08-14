// import { useEffect, useRef, useState } from "react";
// import { Container, Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import {
//   autoLoginUser,
//   userSignInAction,
// } from "../features/users/userAction.js";
// // import useForm from "../hooks/useForm.js";

// // const initialState = {};

// const Login = () => {
//   const emailRef = useRef();
//   const passRef = useRef();
//   const [pending, setPending] = useState(false);

//   const dispatch = useDispatch();
//   const nav = useNavigate();
//   const loc = useLocation();

//   // const { user } = useSelector((state) => state.userInfo);
//   const user = useSelector((state) => state.userInfo?.user);
//   // If logged in, send away; otherwise try auto-login
//   useEffect(() => {
//     if (user?._id) {
//       nav("/users"); // or "/"
//     } else {
//       dispatch(autoLoginUser());
//     }
//   }, [user?._id, nav, dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (pending) return;

//     const cred = {
//       email: emailRef.current.value.trim(),
//       password: passRef.current.value,
//     };

//     setPending(true);
//     const { status } = await dispatch(userSignInAction(cred));
    
//     setPending(false);

//     if (status === "success") {
//       const redirectTo = loc.state?.from?.pathname || "/";
//       nav(redirectTo);
//     }
//   };

//   // Optional: avoid flashing the form if we’re already logged in
//   if (user?._id) return null;
//   return (
//     <>
//       <div className="login d-flex justify-content-center align-items-center">
//         <Container
//           style={{ maxWidth: 380 }}
//           className="card login-card p-5 mt-5 shadow-lg mb-5"
//         >
//           <h2 className="mb-4 text-center">Log In</h2>
//           <Form onSubmit={handleSubmit}>
//             <Form.Control
//               className="mb-3"
//               type="email"
//               placeholder="Email"
//               ref={emailRef}
//               required
//             />
//             <Form.Control
//               className="mb-3"
//               type="password"
//               placeholder="Password"
//               ref={passRef}
//               required
//             />
//             <Button type="submit" variant="primary" className="w-100">
//               Log In
//             </Button>
//           </Form>
//           <br />

//           <p className="text-center">
//             Forgot Password? <Link to="/forgot-password">Reset Now</Link>
//           </p>
//           <p className="small mt-3 text-center">
//             Need an account? <Link to="/signup">Sign up</Link>
//           </p>
//         </Container>
//       </div>
//     </>
//   );
// };
// export default Login;

// src/pages/Login.jsx
import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { userSignInAction } from "../features/users/userAction.js";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loc = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cred = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    const { status } = await dispatch(userSignInAction(cred));
    if (status === "success") nav(loc.state?.from || "/");
  };

  return (
    <div className="login d-flex justify-content-center align-items-center">
      <Container style={{ maxWidth: 380 }} className="card login-card p-5 mt-5 shadow-lg mb-5">
        <h2 className="mb-4 text-center">Log In</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Control className="mb-3" type="email" placeholder="Email" ref={emailRef} required />
          <Form.Control className="mb-3" type="password" placeholder="Password" ref={passRef} required />
          <Button type="submit" variant="primary" className="w-100">Log In</Button>
        </Form>
        <br />
        <p className="text-center">Forgot Password? <a href="/forgot-password">Reset Now</a></p>
        <p className="small mt-3 text-center">Need an account? <Link to="/signup">Sign up</Link></p>
      </Container>
    </div>
  );
};

export default Login;
