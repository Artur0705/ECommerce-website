import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  let userSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="Email Address"
            id="email"
            val={formik.values.email}
            onCh={formik.handleChange("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            id="pass"
            val={formik.values.password}
            onCh={formik.handleChange("password")}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-3 text-end">
            <Link to="/forgot-password" className=" text-secondary">
              Forgot Password
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
            style={{ background: "#ffd333" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
