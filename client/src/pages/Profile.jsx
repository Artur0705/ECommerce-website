import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, updateProfile } from "../features/user/userSlice";
import { CiEdit } from "react-icons/ci";

const profileSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .email("Email Should Be Valid")
    .required("Email Address is Required"),
  mobile: yup.number().required("Mobile Number is Required"),
});

const passwordSchema = yup.object({
  currentPassword: yup.string().required("Current Password is Required"),
  newPassword: yup.string().required("New Password is Required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm New Password is Required"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth?.user);
  const [edit, setEdit] = useState(true);
  const [editPassowrd, setEditPassword] = useState(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userState?.firstName || "",
      lastName: userState?.lastName || "",
      email: userState?.email || "",
      mobile: userState?.mobile || "",
    },

    validationSchema: profileSchema,

    onSubmit: (values) => {
      dispatch(updateProfile(values));
      setEdit(true);
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(updatePassword(values));
      setEditPassword(true);
    },
  });

  return (
    <>
      <BreadCrumb title="My Profile" />

      <Container className1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Update Profile</h3>
              <CiEdit className="fs-3" onClick={() => setEdit(false)} />
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="example1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  disabled={edit}
                  id="example1"
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                />
                <div className="error">
                  {formik.touched.firstName && formik.errors.firstName}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example2" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  disabled={edit}
                  id="example2"
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                />
                <div className="error">
                  {formik.touched.lastName && formik.errors.lastName}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  disabled={edit}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>

                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="exampleInputMobile" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="mobile"
                  className="form-control"
                  disabled={edit}
                  id="exampleInputMobile"
                  aria-describedby="emailHelp"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>

              {edit === false && (
                <button type="submit" className="btn btn-primary mb-5">
                  Save
                </button>
              )}
            </form>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Update Password</h3>
              <CiEdit className="fs-3" onClick={() => setEditPassword(false)} />
            </div>
            <form onSubmit={formikPassword.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  className="form-control"
                  disabled={editPassowrd}
                  id="currentPassword"
                  value={formikPassword.values.currentPassword}
                  onChange={formikPassword.handleChange("currentPassword")}
                  onBlur={formikPassword.handleBlur("currentPassword")}
                />
                <div className="error">
                  {formikPassword.touched.currentPassword &&
                    formikPassword.errors.currentPassword}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  disabled={editPassowrd}
                  id="newPassword"
                  value={formikPassword.values.newPassword}
                  onChange={formikPassword.handleChange("newPassword")}
                  onBlur={formikPassword.handleBlur("newPassword")}
                />
                <div className="error">
                  {formikPassword.touched.newPassword &&
                    formikPassword.errors.newPassword}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="confirmNewPassword" className="form-label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  className="form-control"
                  disabled={editPassowrd}
                  id="confirmNewPassword"
                  value={formikPassword.values.confirmNewPassword}
                  onChange={formikPassword.handleChange("confirmNewPassword")}
                  onBlur={formikPassword.handleBlur("confirmNewPassword")}
                />
                <div className="error">
                  {formikPassword.touched.confirmNewPassword &&
                    formikPassword.errors.confirmNewPassword}
                </div>
              </div>

              {editPassowrd === false && (
                <button type="submit" className="btn btn-primary mb-5">
                  Update Password
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
