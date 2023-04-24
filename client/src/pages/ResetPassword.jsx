import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import Meta from "../components/Meta";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { resetPassword } from "../features/user/userSlice";

const passwordSchema = yup.object({
  newPassword: yup.string().required("New Password is Required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm New Password is Required"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getToken = location.pathname.split("/")[2];

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },

    validationSchema: passwordSchema,

    onSubmit: (values) => {
      dispatch(
        resetPassword({ token: getToken, password: values.confirmNewPassword })
      );
      navigate("/login");
    },
  });

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />

      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <CustomInput
                  type="password"
                  name="newPassword"
                  className="form-control"
                  id="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange("newPassword")}
                  onBlur={formik.handleBlur("newPassword")}
                />
                <div className="error">
                  {formik.touched.newPassword && formik.errors.newPassword}
                </div>
                <label htmlFor="confirmNewPassword" className="form-label">
                  Confirm New Password
                </label>
                <CustomInput
                  type="password"
                  name="confirmNewPassword"
                  className="form-control"
                  id="confirmNewPassword"
                  value={formik.values.confirmNewPassword}
                  onChange={formik.handleChange("confirmNewPassword")}
                  onBlur={formik.handleBlur("confirmNewPassword")}
                />
                <div className="error">
                  {formik.touched.confirmNewPassword &&
                    formik.errors.confirmNewPassword}
                </div>

                <div>
                  <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
