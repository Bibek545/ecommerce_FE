import { toast } from "react-toastify";
import { setUser, logout,setLoading, setAuthReady } from "./userSlice.js";
import { postNewUser, loginUser, fetchProfile } from "./userAxios.js";
import { renewAccessJWT } from "../../helpers/axiosHelpers.js";


// SIGNUP ACTION
export const userSignupAction = (userObj) => async () => {
  const p = postNewUser(userObj);
  toast.promise(p, { pending: "Signing up…" });
  return p;
};

// LOGIN ACTION
// export const userSignInAction = (cred) => async (dispatch) => {
//   try {
//     const { status, message, tokens, user } = await loginUser(cred);

//     toast[status](message);

//     if (status === "success") {
//       // Save JWTs
//       sessionStorage.setItem("accessJWT", tokens.accessJWT);
//       localStorage.setItem("refreshJWT", tokens.refreshJWT);

//       // Update Redux store with user info
//       dispatch(setUser(user));

//       return { status: "success" };
//     } else {
//       return { status: "error" };
//     }
//   } catch (e) {
//     toast.error("Login failed. Please try again.");
//     return { status: "error" };
//   }
// };

// // LOGOUT ACTION
// export const userLogoutAction = () => (dispatch) => {
//   sessionStorage.clear();
//   localStorage.clear();
//   dispatch(logout());
// };

// //fetch user Action

// // FETCH USER (MAKE THIS A THUNK)
// export const fetchUserAction = () => async (dispatch) => {
//   const { status, payload } = await fetchProfile();
//   if (status === "success" && payload?._id) {
//     dispatch(setUser(payload));
//   }
// };

// // AUTO LOGIN (DISPATCH THE THUNK ABOVE, NOT THE API FUNCTION)
// export const autoLoginUser = () => async (dispatch) => {
//   const accessJWT = sessionStorage.getItem("accessJWT");
//   if (accessJWT) {
//     await dispatch(fetchUserAction());
//     return;
//   }

//   const refreshJWT = localStorage.getItem("refreshJWT");
//   if (refreshJWT) {
//     const { payload } = await renewAccessJWT(); // expect new access token string
//     if (payload) {
//       sessionStorage.setItem("accessJWT", payload);
//       await dispatch(fetchUserAction());
//     }
//   }
// };

export const userSignInAction = (cred) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { status, message, tokens, user } = await loginUser(cred);
    toast[status](message);

    if (status === "success") {
      sessionStorage.setItem("accessJWT", tokens.accessJWT);
      localStorage.setItem("refreshJWT", tokens.refreshJWT);
      dispatch(setUser(user));
      dispatch(setLoading(false));
      return { status: "success" };
    }

    dispatch(setLoading(false));
    return { status: "error" };
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(setError(err?.message || "Login failed"));
    toast.error("Login failed. Please try again.");
    return { status: "error" };
  }
};

// FETCH PROFILE
export const fetchUserAction = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { status, payload } = await fetchProfile();
    if (status === "success" && payload?._id) {
      dispatch(setUser(payload));
    }
    dispatch(setLoading(false));
  } catch (err) {
    // If access token expired, let autoLogin handle renewal.
    dispatch(setLoading(false));
  }
};

// AUTO‑LOGIN ON APP START
export const autoLoginUser = () => async (dispatch) => {
  try {
    const access = sessionStorage.getItem("accessJWT");
    if (access) {
      const { status, payload } = await fetchProfile();
      if (status === "success") dispatch(setUser(payload));
      return;
    }
    const refresh = localStorage.getItem("refreshJWT");
    if (refresh) {
      const { payload } = await renewAccessJWT();
      if (payload) {
        sessionStorage.setItem("accessJWT", payload);
        const prof = await fetchProfile();
        if (prof.status === "success") dispatch(setUser(prof.payload));
      }
    }
  } finally {
    // VERY IMPORTANT: signal that bootstrap is finished
    dispatch(setAuthReady(true));
  }
};

// LOGOUT
export const userLogoutAction = () => (dispatch) => {
  sessionStorage.clear();
  localStorage.clear();
  dispatch(logout());
};