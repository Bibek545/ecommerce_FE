// import { use, useEffect, useState } from "react";
// import { validator } from "../utils/validatePassword";

// const handleOnChange = ({ e , form , setForm }) => {
//   const { name, value } = e.target;
//   setForm({
//     ...form,
//     [name]: value,
//   });
// };

// const useForm = (initialState) => {
//   const [form, setForm] = useState(initialState);
//   const [passwordErrors, setPasswordErrors] = useState([])

//   //only when password am=nd confirm password
//   useEffect(()=>{
//     const errorArg = validator(form.password, form.confirmPassword);
//     setPasswordErrors(errorArg);
//   }, [form.password, form.confirmPassword])

//   return {
//     form,
//     setForm,
//     passwordErrors,
//     handleOnChange: (e)=> handleOnChange({e, form, setForm}),
//   }
// };

// export default useForm;